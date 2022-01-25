const CrowpadSimpleTokenFactory = artifacts.require("CrowpadSimpleTokenFactory")
const CrowpadTokenFactory = artifacts.require("CrowpadTokenFactory")

module.exports = async function (deployer, networks, accounts) {
  // deploy CrowpadSimpleTokenFactory
  await deployer.deploy(CrowpadSimpleTokenFactory, "0x43ad0f0585659a68faA72FE276e48B9d2a23B117")

  // deploy CrowpadTokenFactory
  await deployer.deploy(CrowpadTokenFactory, "0x43ad0f0585659a68faA72FE276e48B9d2a23B117")
}
