const CrowpadFlexTierStaker = artifacts.require("CrowpadFlexTierStaker")
const depositor = "0x43ad0f0585659a68faA72FE276e48B9d2a23B117"
const token = "0x18b260e4D2048338241F103e6940a64C3d33A098"
const feeAddress = "0x052f11157A23406F2A705fE78F2695009a6Ec022"

module.exports = async function (deployer, networks, accounts) {
  // deploy CrowpadFlexTierStaker
  await deployer.deploy(CrowpadFlexTierStaker, depositor, token, feeAddress)
}
