require("babel-register");
require("babel-polyfill");

module.exports = {
  networks: {
    ganache: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
    },
    gas: 2100000,
    gasPrice: 8000000000,
  },
  contracts_directory: "./src/contracts/",
  contracts_build_directory: "./src/abis/",
  compilers: {
    solc: {
      version: "0.8.7",
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
