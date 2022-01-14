const { expect } = require("chai");
const { ethers } = require("hardhat");

const CrowpadSimpleTokenFactory = ethers.getContractFactory(
  "CrowpadSimpleTokenFactory"
);
const CrowpadTokenFactory = ethers.getContractFactory("CrowpadTokenFactory");
const CrowpadAirdropper = ethers.getContractFactory("CrowpadAirdropper");
const CronosToken = ethers.getContractFactory("CronosToken");

let owner;
/*
describe("CrowpadSimpleTokenFactory", function () {
  let crowpadSimpleTokenFactory;
  beforeEach(async function () {
    crowpadSimpleTokenFactory = await (
      await CrowpadSimpleTokenFactory
    ).attach("0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0");
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
    await crowpadSimpleTokenFactory.deployNewInstance(
      "STEED TOKEN",
      "STEED",
      6,
      100000000000,
      "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
      owner.address,
      {
        from: owner.address,
        value: ethers.utils.parseEther("0.8"),
      }
    );
  });
});

describe("CrowpadTokenFactory", function () {
  let crowpadTokenFactory;
  beforeEach(async function () {
    crowpadTokenFactory = await (
      await CrowpadTokenFactory
    ).attach("0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82");
    [owner] = await ethers.getSigners();
  });
  it("should set its deploy fee on cronos", async () => {
    await crowpadTokenFactory.setDeployFee(ethers.utils.parseEther("0.5"));
    expect(await crowpadTokenFactory.deployFee()).equal(
      ethers.utils.parseEther("0.5")
    );
  });

  it("should deploy a new token on cronos", async () => {
    await crowpadTokenFactory.deployNewInstance(
      "STEED TOKEN",
      "STEED",
      6,
      100000000000,
      10,
      10,
      60,
      "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
      owner.address,
      owner.address,
      {
        from: owner.address,
        value: ethers.utils.parseEther("0.8"),
      }
    );
  });
});
*/
describe("CrowpadAirdropper", function () {
  let crowpadAirdropper, cronosToken;
  beforeEach(async function () {
    crowpadAirdropper = await CrowpadAirdropper.deploy();
    cronosToken = await CronosToken.deploy();
    [owner] = await ethers.getSigners();
  });
  it("should 3 must be as 3", async () => {
    /*
    console.log(
      await crowpadAirdropper.checkAirdropValidity(
        "0x9A676e781A523b5d0C0e43731313A708CB607508",
        [addr1, addr2],
        [10000000, 2000000]
      )
    );
    */
    console.log(
      await crowpadAirdropper.checkAirdropValidity(
        cronosToken.address,
        [
          "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
          "0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc",
        ],
        [1000000, 200000]
      )
    );
  });
});
