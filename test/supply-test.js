const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("Lending Pool", () => {
  let deployer, user;
  let lendingPool, token;

  const wEthAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

  /** Constants */
  const USER_DEPOSIT = ethers.utils.parseEther("1");

  beforeEach(async () => {
    [deployer, user] = await ethers.getSigners();

    // deploying the library contract
    const reserveLibFactory = await ethers.getContractFactory("ReserveLogic");
    const reserveLib = await reserveLibFactory.deploy();
    await reserveLib.deployed();
    console.log("Deployed Reserve library contract");

    const genericLibFactory = await ethers.getContractFactory("GenericLogic", {
      signers: deployer,
    });
    const genericLib = await genericLibFactory.deploy();
    await genericLib.deployed();
    console.log("Deployed generic library contract");

    const validationLibFactory = await ethers.getContractFactory(
      "ValidationLogic",
      {
        signers: deployer,
        libraries: {
          GenericLogic: genericLib.address,
        },
      }
    );
    const validationLib = await validationLibFactory.deploy();
    await validationLib.deployed();
    console.log("Deployed Validation library contract");

    const lendingPoolFactory = await ethers.getContractFactory("LendingPool", {
      signers: deployer,
      libraries: {
        ValidationLogic: validationLib.address,
        ReserveLogic: reserveLib.address,
      },
    });
    lendingPool = await lendingPoolFactory.deploy();
    await lendingPool.deployed();
    console.log("Lending pool deployed");

    token = await ethers.getContractAt("IWeth", wEthAddress, deployer);
    console.log("Got the weth contract");

    const tx = await token.deposit({ value: ethers.utils.parseEther("500") });
    await tx.wait();
    const balanceDeployerbefore = await token.balanceOf(deployer.address);
    console.log(
      `deployer remaining balance: ${balanceDeployerbefore.toString()}`
    );
    token.transfer(user.address, ethers.utils.parseEther("500"));
    const balanceDeployer = await token.balanceOf(deployer.address);
    console.log(`deployer remaining balance: ${balanceDeployer.toString()}`);
    // console.log(`User balance: ${token.balanceOf(user.address)}`);
    const balanceUser = await token.connect(user).balanceOf(user.address);
    console.log(`User remaining balance: ${balanceUser.toString()}`);
  });

  it("Should give the address of lending pool", async () => {
    console.log("Lending Pool address: ");
    console.log(`${lendingPool.address}`);
  });

  it("get the asset configuration in the lending pool", async () => {
    const tx = await lendingPool.getConfiguration(wEthAddress);

    console.log(tx);

    // assert.equal(txReceipt.args[0].amount.toString(), USER_DEPOSIT);
  });
});
