# Closer

Responsive dating and livestreaming design prototype for Nigerian adults (18+). Created for Adam Isholah.

## Open
Open `dist/index.html` directly in a browser or serve the `dist` directory with any static web server. No build or dependencies required. The GitHub copy places the same files in `closer/`; open `closer/index.html` there.

## Screens
Discover, profile detail, city preferences, sent likes, sample chat, three-question Vibe Check, Live room discovery and setup, account setup, profile editor, verification explanation, privacy settings, membership, coin wallet, gift selection and confirmation, and admin overview, members, report reviews, rooms, catalogue, and payout readiness.

Admin design preview: `#admin`. Wallet: `#wallet`. These are prototype routes, not authorization boundaries.

## Visual identity
Midnight #10121C, coral #FF896E, violet #AA92FF, aqua #7BD8CA, amber #EFCC83, off-white #FAF8FF. Open double-arc C symbol; glass controls and frosted mobile navigation. Logo in `dist/logo.svg`. Keep at least 8px clear space at 48px symbol size; recommended symbol minimum 24px. Name availability and trademarks have not been cleared.

## Proposed coin economics
Every pack uses a purchase rate of ₦4 per coin: 50 coins ₦200; 125 ₦500; 250 ₦1,000; 500 ₦2,000; 1,250 ₦5,000. Gifts: Rose 5 coins, Spark 10, Heart 25, Bouquet 50, Crown 100, Aurora 250. These are purchase equivalents, not creator payout values. Payment processing may affect the viability of the ₦200 pack. Creator revenue share, settlement delays, refunds and withdrawal rules remain undecided.

## Prototype boundaries
This is not a production dating service. All member profiles and chat content are illustrative. Representative stock photos load from Unsplash and fonts from Google Fonts. No real signup, payment, call, broadcast, notification, verification, moderation action, gift delivery or payout occurs. Coins are session-only demonstration values. Profile, likes, messages and settings may be saved in browser localStorage; clear through Settings. Do not enter sensitive information.

## Required before public launch
Server-backed authentication and roles; age assurance; durable database and uploads; consent-based matching and messaging; verification provider; realtime video and livestreaming infrastructure; moderation operations and appeals; secure payment-provider integration; signed webhook validation; idempotent purchase handling; atomic wallet ledger and gifting; fraud checks, refunds, payouts, creator terms, and privacy/account deletion workflows. Never trust frontend balances or admin routes for authorization.

## Validation
JavaScript syntax and mocked-DOM functional checks cover route rendering, city selection, likes, local chat, wallet debit checks and sample report handling. Responsive CSS targets mobile/tablet/desktop, supports reduced motion, semantic form labels, keyboard focus and modal focus trapping. Browser visual QA was unavailable in the build environment; validate images, layout and browser interactions before launch.
