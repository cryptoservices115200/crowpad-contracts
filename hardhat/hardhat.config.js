require("dotenv").config();
require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const getHDWallet = () => {
  const { MNEMONIC, PRIVATE_KEY } = process.env;

  if (PRIVATE_KEY && PRIVATE_KEY !== "") {
    return [PRIVATE_KEY];
  }
  if (MNEMONIC && MNEMONIC !== "") {
    return {
      mnemonic: MNEMONIC,
    };
  }

  throw Error("Private Key Not Set! Please set up .env");
};

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    development: {
      url: "http://localhost:8545",
      accounts: getHDWallet(),
    },
    testnet: {
      url: "https://cronos-testnet-3.crypto.org:8545",
      accounts: getHDWallet(),
    },
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
};
