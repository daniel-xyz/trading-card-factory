var SafeMath = artifacts.require('openzeppelin-solidity/contracts/math/SafeMath.sol') // eslint-disable-line no-undef
var Cards = artifacts.require('./Cards.sol') // eslint-disable-line no-undef

module.exports = function(deployer) {
  deployer.deploy(SafeMath)
  deployer.link(SafeMath, Cards)
  deployer.deploy(Cards)
}
