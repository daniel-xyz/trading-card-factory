var ERC721 = artifacts.require('./ERC721.sol') // eslint-disable-line no-undef
var News = artifacts.require('./News.sol') // eslint-disable-line no-undef

module.exports = function(deployer) {
  deployer.deploy(ERC721)
  deployer.deploy(News)
}
