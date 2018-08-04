// Allows us to use ES6 in our migrations and tests.
require('babel-register')

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 7545, // 8545 - For truffle develop
      network_id: '*', // Match any network id
    },
  },
}
