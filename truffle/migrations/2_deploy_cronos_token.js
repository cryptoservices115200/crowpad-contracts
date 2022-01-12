const CronosToken = artifacts.require("CronosToken")
const SimpleAirdropper = artifacts.require("SimpleAirdropper")
const totalAmount = 1000

module.exports = async function (deployer, networks, accounts) {
  // deploy cronos token
  await deployer.deploy(CronosToken, "Cronos Token", "CRT", totalAmount)
  const cronosToken = await CronosToken.deployed()

  // deploy Airdropper
  await deployer.deploy(SimpleAirdropper)
  const simpleAirdropper = await SimpleAirdropper.deployed()

  // approve Airdropper as spender in token contract
  cronosToken.approve(simpleAirdropper.address, totalAmount)
};





