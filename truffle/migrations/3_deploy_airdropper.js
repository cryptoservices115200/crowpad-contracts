const CronosToken = artifacts.require("CronosToken")
const CrowpadAirdropper = artifacts.require("CrowpadAirdropper")
const totalAmount = "1000000000000000000000000"

module.exports = async function (deployer, networks, accounts) {
  // deploy Airdropper
  await deployer.deploy(CrowpadAirdropper)
  const crowpadAirdropper = await CrowpadAirdropper.deployed()

  // get cronosToken
  const cronosToken = await CronosToken.at("0x18b260e4D2048338241F103e6940a64C3d33A098")

  // approve Airdropper as spender in token contract
  cronosToken.approve(crowpadAirdropper.address, totalAmount)
}
