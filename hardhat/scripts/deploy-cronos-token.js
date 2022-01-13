// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  /*
  const CrowpadSimpleTokenFactory = await hre.ethers.getContractFactory(
    "CrowpadSimpleTokenFactory"
  );
  const crowpadSimpleTokenFactory = await CrowpadSimpleTokenFactory.deploy();

  await crowpadSimpleTokenFactory.deployed();

  console.log(
    "CrowpadSimpleTokenFactory deployed to:",
    crowpadSimpleTokenFactory.address
  );
*/
  const CrowpadTokenFactory = await hre.ethers.getContractFactory(
    "CrowpadTokenFactory"
  );
  const crowpadTokenFactory = await CrowpadTokenFactory.deploy();

  await crowpadTokenFactory.deployed();

  console.log("CrowpadTokenFactory deployed to:", crowpadTokenFactory.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
