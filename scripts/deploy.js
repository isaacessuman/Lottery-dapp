const hre = require("hardhat");

async function main() {
    // Get the contract factory
    const Lottery = await hre.ethers.getContractFactory("Lottery");

    // Deploy the contract
    const lottery = await Lottery.deploy();

    // Wait for the contract to be deployed
    await lottery.waitForDeployment();

    // Log the contract address
    console.log("Lottery deployed to:", await lottery.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});