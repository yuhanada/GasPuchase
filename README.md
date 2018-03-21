# GasPurchase
Application of Smart Contract to IoT

About Smart Contract
1. set up geth and download browser-solidity-gh-pages
2. import contract/GasPurchase.sol to browser-solidity
3. Move to Run tab and push the create button

About DApp
1. set up meteor
2. create each DApp
   $ meteor create xxx
3. copy and paste each files
4. add following packages 
   $ meteor add twbs:bootstrap
   $ meteor add ethereum:web3
   $ meteor add ethereum:accounts
   $ meteor add ethereum:blocks

   $ meteor add session
   $ meteor add ethereum:tools

   $ meteor add less
   $ meteor add ethereum:dapp-styles
      //change file name from main.css to main.less
      //add the following sentence to the file
      main.less
      //@import '{ethereum:dapp-styles}/dapp-styles.less';
5. run DApp
   $ meteor
