const CrowpadFlexTierStaking = artifacts.require("CrowpadFlexTierStakingContract")
const depositor = "0x43ad0f0585659a68faA72FE276e48B9d2a23B117"
const token = "0x823A790e7672afcAFe8CE408aA1f5EFf6bc3ccd7"
const feeAddress = "0x052f11157A23406F2A705fE78F2695009a6Ec022"

module.exports = async function (deployer, networks, accounts) {
  // deploy CrowpadFlexTierStakingContract
  await deployer.deploy(CrowpadFlexTierStaking, depositor, token, feeAddress)
}
