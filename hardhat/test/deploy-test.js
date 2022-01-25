const { expect } = require("chai");
const { ethers } = require("hardhat");

const CrowpadSimpleTokenFactory = ethers.getContractFactory("CrowpadSimpleTokenFactory");
const CrowpadTokenFactory = ethers.getContractFactory("CrowpadTokenFactory");

const CrowpadAirdropper = ethers.getContractFactory("CrowpadAirdropper");
const CronosToken = ethers.getContractFactory("CronosToken");
const CrowpadFlexTierStaker = ethers.getContractFactory("CrowpadFlexTierStaker");
const CrowpadBronzeTierStaker = ethers.getContractFactory("CrowpadBronzeTierStaker");
const CrowpadSilverTierStaker = ethers.getContractFactory("CrowpadSilverTierStaker");
const CrowpadGoldTierStaker = ethers.getContractFactory("CrowpadGoldTierStaker");

const CrowpadSimpleTokenFactoryAddress = "0xA07672C04D5e6BDdfAD3Ea97bb4e3C53cB74EDfA";
const CrowpadTokenFactoryAddress = "0x8a69D67361Afbc705FdCd8bbaB4ab46137707422";
const CrowpadAirdropperAddress = "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853";
const CrowpadFlexTierStakerAddress = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6";
const CrowpadBronzeTierStakerAddress = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6";
const CrowpadSilverTierStakerAddress = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6";
const CrowpadGoldTierStakerAddress = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6";

let owner;

describe.skip("CrowpadAirdropper", function () {
  let crowpadAirdropper, cronosToken;
  beforeEach(async function () {
    crowpadAirdropper = (await CrowpadAirdropper).attach(
      CrowpadAirdropperAddress
    );
    cronosToken = (await CronosToken).deploy();
    [owner] = await ethers.getSigners();
  });
  it("should check airdrop validity", async () => {
    await crowpadAirdropper.checkAirdropValidity(
      cronosToken.address,
      [
        "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
        "0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc",
      ],
      [1000000, 200000]
    );
  });
  it("should do airdrop", async () => {
    await crowpadAirdropper.airdropToken(
      cronosToken.address,
      [
        "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
        "0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc",
      ],
      [1000000, 200000]
    );
    expect(
      cronosToken.balanceOf("0x70997970c51812dc3a010c7d01b50e0d17dc79c8")
    ).equal(1000000);
    expect(
      cronosToken.balanceOf("0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc")
    ).equal(1000000);
  });
  describe("CrowpadFlexTierStakingContract", function () {
    let crowpadFlexTierStakingContract;
    beforeEach(async function () {
      crowpadFlexTierStakingContract = (
        await CrowpadFlexTierStakingContract
      ).attach(CrowpadFlexTierStakerAddress);
    });
    it("should stake liquidity", async () => {
      await crowpadFlexTierStakingContract.updateTime(
        0,
        new Date(Date.now() + 100000).valueOf()
      );
      await crowpadFlexTierStakingContract.setDepositor(owner.address);
      await crowpadFlexTierStakingContract.stake(owner.address, 10000);
    });
  });
  describe("CrowpadBronzeTierStakingContract", function () {
    let crowpadBronzeTierStakingContract;
    beforeEach(async function () {
      crowpadBronzeTierStakingContract = (
        await CrowpadBronzeTierStakingContract
      ).attach(CrowpadBronzeTierStakerAddress);
    });
    it("should stake liquidity", async () => {
      await crowpadBronzeTierStakingContract.updateTime(
        0,
        new Date(Date.now() + 100000).valueOf()
      );
      await crowpadBronzeTierStakingContract.setDepositor(owner.address);
      await crowpadBronzeTierStakingContract.stake(owner.address, 10000);
    });
  });
  describe("CrowpadSilverTierStakingContract", function () {
    let crowpadSilverTierStakingContract;
    beforeEach(async function () {
      crowpadSilverTierStakingContract = (
        await CrowpadSilverTierStakingContract
      ).attach(CrowpadSilverTierStakerAddress);
    });
    it("should stake liquidity", async () => {
      await crowpadSilverTierStakingContract.updateTime(
        0,
        new Date(Date.now() + 100000).valueOf()
      );
      await crowpadSilverTierStakingContract.setDepositor(owner.address);
      await crowpadSilverTierStakingContract.stake(owner.address, 10000);
    });
  });
  describe("CrowpadGoldTierStakingContract", function () {
    let crowpadGoldTierStakingContract;
    beforeEach(async function () {
      crowpadBronzeTierStakingContract = (
        await CrowpadGoldTierStakingContract
      ).attach(CrowpadGoldTierStakerAddress);
    });
    it("should stake liquidity", async () => {
      await crowpadGoldTierStakingContract.updateTime(
        0,
        new Date(Date.now() + 100000).valueOf()
      );
      await crowpadGoldTierStakingContract.setDepositor(owner.address);
      await crowpadGoldTierStakingContract.stake(owner.address, 10000);
    });
  });
});

describe("CrowpadSimpleTokenFactory", function () {
  let crowpadSimpleTokenFactory;
  beforeEach(async function () {
    crowpadSimpleTokenFactory = await (
      await CrowpadSimpleTokenFactory
    ).attach(CrowpadSimpleTokenFactoryAddress);
    [owner] = await ethers.getSigners();
  });
  it("should set its deploy fee on cronos", async () => {
    await crowpadSimpleTokenFactory.setDeployFee(
      ethers.utils.parseEther("0.02")
    );
    expect(await crowpadSimpleTokenFactory.deployFee()).equal(
      ethers.utils.parseEther("0.02")
    );
  });

  it("should deploy a new token on cronos", async () => {
    await crowpadSimpleTokenFactory.createNewToken(
      "STEED TOKEN",
      "STEED",
      6,
      100000000000,
      "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    );
  });

  it("should return all token on cronos", async () => {
    expect(await crowpadSimpleTokenFactory.getAllTokens()).to.be.an('array');
  });

  it("should return all token for owner on cronos", async () => {
    expect(await crowpadSimpleTokenFactory.getUserTokens("0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D")).to.be.an('array');
  });
});

describe("CrowpadTokenFactory", function () {
  let crowpadTokenFactory;
  beforeEach(async function () {
    crowpadTokenFactory = await (
      await CrowpadTokenFactory
    ).attach(CrowpadTokenFactoryAddress);
    [owner] = await ethers.getSigners();
  });
  it("should set its deploy fee on cronos", async () => {
    await crowpadTokenFactory.setDeployFee(ethers.utils.parseEther("0.5"));
    expect(await crowpadTokenFactory.deployFee()).equal(
      ethers.utils.parseEther("0.5")
    );
  });

  it("should deploy a new token on cronos", async () => {
    await crowpadTokenFactory.createNewToken(
      "STEED TOKEN",
      "STEED",
      6,
      100000000000,
      10,
      10,
      60,
      "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
      owner.address,
      owner.address
    );
  });

  it("should return all token on cronos", async () => {
    expect(await crowpadTokenFactory.getAllTokens()).to.be.an('array');
  });

  it("should return all token for owner on cronos", async () => {
    expect(await crowpadTokenFactory.getUserTokens("0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D")).to.be.an('array');
  });
});