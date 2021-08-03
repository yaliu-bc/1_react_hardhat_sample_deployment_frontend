require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  //Add artifacts under src
  paths: {
    artifacts: './src/artifacts',
  },
  //Add networks to connect the test nets, etc.
  networks:{
    //the localhost
    hardhat:{
      chainId: 1337,
    },    
    // ropsten
    ropsten: {
      url: "https://ropsten.infura.io/v3/"+process.env.PROJECT_ID,
      accounts: [process.env.ACCOUNT_KEY]
    }, 
 },

};
