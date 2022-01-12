const CronosToken = artifacts.require("CronosToken")
const Airdropper = artifacts.require("Airdropper")
const totalAmount = "1000000000000000000000000"

module.exports = async function (deployer, networks, accounts) {
  // deploy cronos token
  await deployer.deploy(CronosToken, "Cronos Token", "CRT", totalAmount)
  const cronosToken = await CronosToken.deployed()

  // deploy Airdropper
  await deployer.deploy(Airdropper)
  const airdropper = await Airdropper.deployed()

  // approve Airdropper as spender in token contract
  cronosToken.approve(airdropper.address, totalAmount)
};





