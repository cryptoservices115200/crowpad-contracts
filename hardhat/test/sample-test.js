const { expect } = require("chai");
const { expectRevert, ether } = require("@openzeppelin/test-helpers");
const { ethers } = require("hardhat");

const CrowpadSimpleTokenFactory = ethers.getContractFactory(
  "CrowpadSimpleTokenFactory"
);
const CrowpadTokenFactory = ethers.getContractFactory("CrowpadTokenFactory");
describe("CrowpadSimpleTokenFactory", function () {
  let crowpadSimpleTokenFactory, deployer;
  beforeEach(async function () {
    crowpadSimpleTokenFactory = await (
      await CrowpadSimpleTokenFactory
    ).deploy();
    const [addr] = await ethers.getSigners();
    deployer = addr;
  });
  it("should set its deploy fee on cronos", async () => {
    const tx = await crowpadSimpleTokenFactory.setDeployFee(10000000);
    expect(await crowpadSimpleTokenFactory.deployFee()).equal(10000000);
  });
  it("should deploy a new token on cronos", async () => {
    await crowpadSimpleTokenFactory.deployNewInstance(
      "STEED TOKEN",
      "STEED",
      6,
      1000000,
      "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
      deployer.address,
      {
        from: deployer.address,
        value: ether("0.8"),
      }
    );
  });
});

describe("CrowpadTokenFactory", function () {
  let crowpadTokenFactory, deployer;
  beforeEach(async function () {
    crowpadTokenFactory = await (await CrowpadTokenFactory).deploy();
    const [addr] = await ethers.getSigners();
    deployer = addr;
  });
  it("should set its deploy fee on cronos", async () => {
    const tx = await crowpadTokenFactory.setDeployFee(10000000);
    expect(await crowpadTokenFactory.deployFee()).equal(10000000);
  });
  it("should deploy a new token on cronos", async () => {
    await crowpadTokenFactory.deployNewInstance(
      "STEED TOKEN",
      "STEED",
      6,
      10000000000,
      10,
      10,
      60,
      "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
      deployer.address,
      deployer.address,
      {
        from: deployer.address,
        value: ether("0.8"),
      }
    );
  });
});
