const express = require('express');
const {createServer} = require('node:http');
const {Server} = require('socket.io');
const app = express(), server = createServer(app);
const io = new Server(server, {maxHttpBufferSize: 1500000});
app.use(express.static('public'));
app.get('/vendor/three.module.js',(_,res)=>res.sendFile(require('node:path').join(__dirname,'node_modules/three/build/three.module.js')));
app.get('/health', (_,res)=>res.json({status:'ok',players:io.engine.clientsCount}));
app.get('/rtc-config', (_,res)=>res.json({iceServers:[{urls:'stun:stun.l.google.com:19302'}, ...(process.env.TURN_URL && process.env.TURN_USERNAME && process.env.TURN_CREDENTIAL ? [{urls:process.env.TURN_URL,username:process.env.TURN_USERNAME,credential:process.env.TURN_CREDENTIAL}] : [])]}));
const players = new Map();
const broadcast = ()=>io.emit('players', [...players].map(([id,name])=>({id,name})));
io.on('connection', socket=>{
 let joined=false, last=0, lastMove=0;
 socket.on("move",position=>{if(!joined||Date.now()-lastMove<80||!position||![position.x,position.z,position.angle].every(Number.isFinite)||Math.abs(position.x)>48||Math.abs(position.z)>48)return;lastMove=Date.now();socket.broadcast.emit("move",{id:socket.id,...{x:position.x,z:position.z,angle:position.angle}})});
 socket.on('join', name=>{if(typeof name!=='string')return; players.set(socket.id,name.trim().slice(0,24)||'Lagosian');joined=true;broadcast();});
 socket.on('chat', data=>{
  if(!joined||Date.now()-last<500||!data||typeof data!=='object')return;
  const text=typeof data.text==='string'?data.text.slice(0,1000):'';
  const image=typeof data.image==='string'&&/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(data.image)&&data.image.length<1400000?data.image:null;
  if(!text&&!image)return;last=Date.now();
  io.emit('chat',{name:players.get(socket.id),text,image,time:Date.now()});
 });
 socket.on('signal', data=>{if(joined&&data&&players.has(data.to)&&data.to!==socket.id)io.to(data.to).emit('signal',{from:socket.id,name:players.get(socket.id),payload:data.payload});});
 socket.on('disconnect',()=>{players.delete(socket.id);broadcast();});
});
server.listen(process.env.PORT||3000,'0.0.0.0',()=>console.log('Lagos After Hours listening on port '+(process.env.PORT||3000)));
