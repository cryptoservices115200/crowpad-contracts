const CronosToken = artifacts.require("CronosToken")
const CrowpadAirdropper = artifacts.require("CrowpadAirdropper")
const totalAmount = "1000000000000000000000000"

module.exports = async function (deployer, networks, accounts) {
  // deploy Airdropper
  await deployer.deploy(CrowpadAirdropper)
  const crowpadAirdropper = await CrowpadAirdropper.deployed()

  // get cronosToken
  const cronosToken = await CronosToken.at("0x119016470E88eC7228060B8b9F6049223c55D3eE")

  // approve Airdropper as spender in token contract
  cronosToken.approve(crowpadAirdropper.address, totalAmount)
}
