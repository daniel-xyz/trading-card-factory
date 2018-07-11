var Cards = artifacts.require('./Cards.sol') // eslint-disable-line no-undef

module.exports = function(deployer) {
  deployer.deploy(Cards)
}
