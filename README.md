# Lagos After Hours

An original responsive browser life simulation set in Lagos. Six neighbourhoods, paid shifts, skill training, rent, housing upgrades, energy, happiness, reputation, daily progression, and a persistent local save. Live multiplayer presence and chat include PNG/JPEG/WebP images under 1 MB. Players can initiate, accept, mute and end WebRTC voice/video calls.

## Develop

Requires Node.js 24 and npm. From this directory:

```sh
npm ci --cache /workspace/.npm-cache
npm start
```

The HTTP server uses port 3000 by default; set `PORT` to change it. `GET /health` reports readiness. Open two browser sessions to try live chat and calls. Edit your player name with **Edit name**. Progress is saved per browser in localStorage. Rent is charged every four actions, including sleeping. Training improves income and unlocks jobs through reputation.

## Validate

```sh
npm test
npm run test:browser
```

Browser tests use `/usr/bin/chromium` (override with `CHROMIUM_PATH`) and fake camera/microphone devices. They exercise earning and persistent saves, mobile layout, two-player chat, image delivery, and WebRTC video connections. These simulated local media checks do not prove cross-network call reliability or physical-device media quality.

## Deployment and limits

This is a playable first version, not a photorealistic 3D open world. It uses illustrated city scenery and decision-based gameplay. Serve it over HTTPS for real camera and microphone access. Keep WebSocket connections enabled at the reverse proxy. A single Node process maintains online presence; chat and shared images are ephemeral, and progress is local rather than account-based. Do not use this version as a public production social platform without authentication, moderation, durable storage, stronger abuse controls, and operational monitoring.

For calls across restrictive networks configure an existing TURN service using `TURN_URL`, `TURN_USERNAME` and `TURN_CREDENTIAL` securely in runtime settings. No TURN credentials are bundled. The RTC configuration endpoint delivers configured credentials to browser clients; use scoped short-lived credentials in production. Public STUN uses `stun.l.google.com:19302`, which must be accessible to the clients. Calls require permission from both players. Signaling relays offers and ICE candidates; actual audio/video flows between browsers (or through TURN).

The reference https://lagoslife.app/ returned HTTP 403 during development and could not be inspected. This implementation uses original branding, artwork and mechanics.

## Current cloud validation

Dependency installation and server integration tests passed. Browser gameplay, save persistence, mobile sizing, chat and image delivery passed. The full browser suite still has one failed media-connection test: managed Chromium has `WebRtcIPHandling=disable_non_proxied_udp`, no local ICE candidates are generated, and no TURN configuration is present. Call offers and answers are exchanged, but media connection is not verified. Supply a compatible TURN service before relying on calls from this cloud browser.
