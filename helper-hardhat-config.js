const { ethers } = require("hardhat")

const networkConfig = {
    5: {
        name: "goerli",
        vrfCoordinatorV2: "url",
        entranceFee: ethers.utils.parseEther("0.01"),
        gasLane: "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc",
        subscriptionId: "0", // for real chain we need to get this from the UI
        gasLimit: "500000", // gasLimit will vary from chain to chain hence we need to define this
        interval: "30", // interval will also depend from chain to chain
    },
    31337: {
        // local chain id is 31337
        name: "hardhat",
        entranceFee: ethers.utils.parseEther("0.005"),
        gasLane: "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc", // for local we are jsut mocking so gas lane doesn't matter
        gasLimit: "500000",
        interval: "30",
    },
}

const developmentChains = ["hardhat", "localhost"]

module.exports = {
    networkConfig,
    developmentChains,
}
