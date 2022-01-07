// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  const CronosToken = await hre.ethers.getContractFactory("CronosToken");
  const cronosToken = await CronosToken.deploy(
    "Cronos Token",
    "CRT",
    "1000000000000000000000000"
  );

  await cronosToken.deployed();

  console.log("CronosToken deployed to:", cronosToken.address);

  const MCFSimpleFactory = await hre.ethers.getContractFactory(
    "MCFSimpleFactory"
  );
  const mcfSimpleFactory = await MCFSimpleFactory.deploy();

  await mcfSimpleFactory.deployed();

  console.log("MCFSimpleFactory deployed to:", mcfSimpleFactory.address);

  const SimpleAirdropper = await hre.ethers.getContractFactory(
    "SimpleAirdropper"
  );
  const simpleAirdropper = await SimpleAirdropper.deploy();

  await simpleAirdropper.deployed();

  console.log("SimpleAirdropper deployed to:", simpleAirdropper.address);

  /*
  const BaseTierStakingContract = await hre.ethers.getContractFactory(
    "BaseTierStakingContract"
  );
  const baseTierStakingContract = await BaseTierStakingContract.deploy(
    1,
    1,
    20,
    1,
    100,
    1,
    0x9502e2f202ddec76bb1331ec56a8a1a05b17d0ac,
    0x80f01a3dbc5ff1489ff1936225bced0f21372267,
    0x9502e2f202ddec76bb1331ec56a8a1a05b17d0ac,
    0x059cf17c3b04c7c0624dd332ba81936add9c842b
  );

  await baseTierStakingContract.deployed();

  console.log(
    "BaseTierStakingContract deployed to:",
    baseTierStakingContract.address
  );

  const GoldTierStakingContract = await hre.ethers.getContractFactory(
    "GoldTierStakingContract"
  );
  const goldTierStakingContract = await GoldTierStakingContract.deploy(
    1,
    1,
    20,
    1,
    100,
    1,
    0x9502e2f202ddec76bb1331ec56a8a1a05b17d0ac,
    0x80f01a3dbc5ff1489ff1936225bced0f21372267,
    0x9502e2f202ddec76bb1331ec56a8a1a05b17d0ac,
    0x059cf17c3b04c7c0624dd332ba81936add9c842b
  );

  await goldTierStakingContract.deployed();

  console.log(
    "GoldTierStakingContract deployed to:",
    goldTierStakingContract.address
  );

  const SilverTierStakingContract = await hre.ethers.getContractFactory(
    "SilverTierStakingContract"
  );
  const silverTierStakingContract = await SilverTierStakingContract.deploy(
    1,
    1,
    20,
    1,
    100,
    1,
    0x9502e2f202ddec76bb1331ec56a8a1a05b17d0ac,
    0x80f01a3dbc5ff1489ff1936225bced0f21372267,
    0x9502e2f202ddec76bb1331ec56a8a1a05b17d0ac,
    0x059cf17c3b04c7c0624dd332ba81936add9c842b
  );

  await silverTierStakingContract.deployed();

  console.log(
    "SilverTierStakingContract deployed to:",
    silverTierStakingContract.address
  );

  const BronzeTierStakingContract = await hre.ethers.getContractFactory(
    "BronzeTierStakingContract"
  );
  const bronzeTierStakingContract = await BronzeTierStakingContract.deploy(
    1,
    1,
    20,
    1,
    100,
    1,
    0x9502e2f202ddec76bb1331ec56a8a1a05b17d0ac,
    0x80f01a3dbc5ff1489ff1936225bced0f21372267,
    0x9502e2f202ddec76bb1331ec56a8a1a05b17d0ac,
    0x059cf17c3b04c7c0624dd332ba81936add9c842b
  );

  await bronzeTierStakingContract.deployed();

  console.log(
    "BronzeTierStakingContract deployed to:",
    bronzeTierStakingContract.address
  );

  const FlexTierStakingContract = await hre.ethers.getContractFactory(
    "FlexTierStakingContract"
  );
  const flexTierStakingContract = await FlexTierStakingContract.deploy(
    1,
    1,
    20,
    1,
    100,
    1,
    0x9502e2f202ddec76bb1331ec56a8a1a05b17d0ac,
    0x80f01a3dbc5ff1489ff1936225bced0f21372267,
    0x9502e2f202ddec76bb1331ec56a8a1a05b17d0ac,
    0x059cf17c3b04c7c0624dd332ba81936add9c842b
  );

  await FlexTierStakingContract.deployed();

  console.log(
    "FlexTierStakingContract deployed to:",
    FlexTierStakingContract.address
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
