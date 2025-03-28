require("@nomicfoundation/hardhat-toolbox");

module.exports = {
    solidity: "0.8.28",
    networks: {
        somnia: {
            url: "https://dream-rpc.somnia.network/",
            accounts: ["8ebfdde7251a873f7af72e28a0a65e2e78d89534f400752b42836d9a73b01076"],
            chainId: 50312,
        },
    },
};