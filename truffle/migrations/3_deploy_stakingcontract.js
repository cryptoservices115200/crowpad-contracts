const FlexTierStaking = artifacts.require("FlexTierStakingContract")

module.exports = async function (deployer, networks, accounts) {
  // deploy FlexTierStakingContract
  await deployer.deploy(FlexTierStaking, "0x43ad0f0585659a68faA72FE276e48B9d2a23B117", "0x141b63455c0050BDCB46f18Cbc4d5B5b19f7e2C0", "0x052f11157A23406F2A705fE78F2695009a6Ec022")
};
