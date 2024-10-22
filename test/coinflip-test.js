const { assert } = require("chai")
const { developmentChains } = require("../helper-hardhat-config")
const { network, ethers, deployments } = require("hardhat")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("CoinFlip", function () {
          beforeEach(async function () {
              accounts = await ethers.getSigners()
              deployer = accounts[0]

              await deployments.fixture(["coinflip"])
              basicNft = await ethers.getContract("CoinFlip")
          })
      })
