const CrowpadLocker = artifacts.require("CrowpadLocker")

module.exports = async function (deployer, networks, accounts) {
  // deploy CrowpadLocker
  await deployer.deploy(CrowpadLocker)
}
