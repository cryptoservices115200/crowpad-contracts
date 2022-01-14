// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  const CronosToken = await hre.ethers.getContractFactory("CronosToken");
  const cronosToken = await CronosToken.deploy(
    "Crowpad Token",
    "CROW",
    10000000000
  );
  await cronosToken.deployed();
  console.log("CronosToken deployed to:", cronosToken.address);

  const CrowpadSimpleTokenFactory = await hre.ethers.getContractFactory(
    "CrowpadSimpleTokenFactory"
  );
  const crowpadSimpleTokenFactory = await CrowpadSimpleTokenFactory.deploy();
  await crowpadSimpleTokenFactory.deployed();
  console.log(
    "CrowpadSimpleTokenFactory deployed to:",
    crowpadSimpleTokenFactory.address
  );

  const CrowpadTokenFactory = await hre.ethers.getContractFactory(
    "CrowpadTokenFactory"
  );
  const crowpadTokenFactory = await CrowpadTokenFactory.deploy();
  await crowpadTokenFactory.deployed();
  console.log("CrowpadTokenFactory deployed to:", crowpadTokenFactory.address);

  const CrowpadAirdropper = await hre.ethers.getContractFactory(
    "CrowpadAirdropper"
  );
  const crowpadAirdropper = await CrowpadAirdropper.deploy();
  await crowpadAirdropper.deployed();
  console.log("CrowpadAirdropper deployed to:", crowpadAirdropper.address);

  const CrowpadFlexTierStakingContract = await hre.ethers.getContractFactory(
    "CrowpadFlexTierStakingContract"
  );
  const crowpadFlexTierStakingContract =
    await CrowpadFlexTierStakingContract.deploy(
      "0x44DA42feC06528d827d737E3B276AF6036913044",
      "0x9502E2F202dDEC76BB1331Ec56a8a1a05B17d0Ac",
      "0x059cF17C3B04C7C0624dd332Ba81936aDD9c842B"
    );
  await crowpadFlexTierStakingContract.deployed();
  console.log(
    "CrowpadFlexTierStakingContract deployed to:",
    crowpadFlexTierStakingContract.address
  );

  const CrowpadBronzeTierStakingContract = await hre.ethers.getContractFactory(
    "CrowpadBronzeTierStakingContract"
  );
  const crowpadBronzeTierStakingContract =
    await CrowpadBronzeTierStakingContract.deploy(
      "0x44DA42feC06528d827d737E3B276AF6036913044",
      "0x9502E2F202dDEC76BB1331Ec56a8a1a05B17d0Ac",
      "0x059cF17C3B04C7C0624dd332Ba81936aDD9c842B"
    );
  await crowpadBronzeTierStakingContract.deployed();
  console.log(
    "CrowpadBronzeTierStakingContract deployed to:",
    crowpadBronzeTierStakingContract.address
  );

  const CrowpadSilverTierStakingContract = await hre.ethers.getContractFactory(
    "CrowpadSilverTierStakingContract"
  );
  const crowpadSilverTierStakingContract =
    await CrowpadSilverTierStakingContract.deploy(
      "0x44DA42feC06528d827d737E3B276AF6036913044",
      "0x9502E2F202dDEC76BB1331Ec56a8a1a05B17d0Ac",
      "0x059cF17C3B04C7C0624dd332Ba81936aDD9c842B"
    );
  await crowpadSilverTierStakingContract.deployed();
  console.log(
    "CrowpadSilverTierStakingContract deployed to:",
    crowpadSilverTierStakingContract.address
  );

  const CrowpadGoldTierStakingContract = await hre.ethers.getContractFactory(
    "CrowpadGoldTierStakingContract"
  );
  const crowpadGoldTierStakingContract =
    await CrowpadGoldTierStakingContract.deploy(
      "0x44DA42feC06528d827d737E3B276AF6036913044",
      "0x9502E2F202dDEC76BB1331Ec56a8a1a05B17d0Ac",
      "0x059cF17C3B04C7C0624dd332Ba81936aDD9c842B"
    );
  await crowpadGoldTierStakingContract.deployed();
  console.log(
    "CrowpadGoldTierStakingContract deployed to:",
    crowpadGoldTierStakingContract.address
  );

  /*
  const CrowpadLockingContract = await hre.ethers.getContractFactory(
    "CrowpadLockingContract"
  );
  const crowpadLockingContract = await CrowpadLockingContract.deploy(
    "0x44DA42feC06528d827d737E3B276AF6036913044",
    "0x9502E2F202dDEC76BB1331Ec56a8a1a05B17d0Ac",
    "0x059cF17C3B04C7C0624dd332Ba81936aDD9c842B"
  );
  await crowpadLockingContract.deployed();
  console.log(
    "CrowpadLockingContract deployed to:",
    crowpadLockingContract.address
  );
  */
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
