# trading-card-factory

Create &amp; collect trading cards. It's just a prototype - you can create as many trading cards as you like and you'll get rewarded the full card price (which is calculated automatically) when someone purchases it in the shop. Card artworks are stored on IPFS.

In a real application, not everyone would be allowed to create cards (or there would be a more complicated governance/voting process behind it) and cards would probably be sold in Booster Packs and not directly.

### Requirements

Schema: _package_ (_tested with version_)

- node.js (10.7.0)
- npm (6.2.0)
- truffle (4.1.13)
- ganache-cli (6.1.8)
- solidity (0.4.24)
- metamask (4.9.3)

### Setup

1. Install packages: `npm i`
2. Start your private Blockchain: `ganache-cli`
3. Copy one of the private keys that ganache gives you and import the account in Metamask (make sure you are on the right local network, too!)
4. Compile contracts: `truffle compile --reset` (maybe it works without _--reset_, but it's the safer option)
5. Migrate contracts: `truffle migrate --reset`
6. Start development server: `npm run dev`
7. Visit: `http.//localhost:3000`
8. Let tests run with: `truffle test`

### Troubleshooting

1. Don't use the Beta version of Metamask. This project has been developed with Metamask 4.9.3 in mind.
2. Reset your account in Metamask. Sometime not doing this can cause problems (_Settings_ -> _Reset Account_)
3. If a transaction fails, try to re-send it with a higher Gas Limit (eg. 60'000)

If nothing helps please contact me via danielbischoff@hotmail.com. I'll answer you asap.

Enjoy! ❤️
