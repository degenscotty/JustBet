const { network, ethers } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
require("dotenv").config()

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    log("----------------DEPLOYING------------------")
    log("-------------------------------------------")

    const args = [
        /* Mock IRandomizer Contract */
    ]
    const coinFlip = await deploy("CoinFlip", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(coinFlip.address, args)
    }
    log("-------------------------------------------")
    log("-------------------DONE--------------------")
}

module.exports.tags = ["all", "coinflip"]
