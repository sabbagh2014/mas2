export const NetworkContextName = "(BSC) BNB Smart Chain";
export const ACTIVE_NETWORK = 97;
export const BNB_NETWORK = 97;
export const OpenMarketplace = "0x14C9c6A657EE450805848B07A403DD883B862C1f";
export const NFTTokenContract = "0x0dCD9c3d03f09B9313d2A6851B7C98B532AC7dC9";
export const deadAddress = "0x0000000000000000000000000000000000000000";
export const masToken = "0xe6a18c271ac1cd06a82c00245b6469cf99b851c7";
// export const USDTToken = '0xdac17f958d2ee523a2206206994597c13d831ec7'
export const USDTToken = "0x55d398326f99059fF775485246999027B3197955";
export const WBTCToken = "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599";
export const BUSDToken = "0xe9e7cea3dedca5984780bafc599bd69add087d56";
export const CEO_NAME = "MAS MANGER";
export const websiteName =
  window.location.protocol + "//" + window.location.host;
export const RPC_URL = "https://bscrpc.com/";

export const tokensDetails = [
  {
    name: "MAS",
    chainId: "97",
    tokenAddress:masToken,
    networkName: "Binance Smart Chain Mainnet",
    databaseKey: "masBalance",
    img: "images/tokens/1.png",
  },
  {
    name: "BUSD",
    chainId: "97",
    tokenAddress: BUSDToken,
    networkName: "Binance Smart Chain Mainnet",
    databaseKey: "busdBalance",
    img: "images/tokens/6.png",
  },
  {
    name: "USDT",
    chainId: "97",
    tokenAddress: USDTToken,
    networkName: "Binance Smart Chain Mainnet",
    databaseKey: "usdtBalance",
    img: "images/tokens/3.png",
  },
];
export const getCoinkDetails = (name) => {
  switch (name.toString()) {
    case "MAS":
      return {
        name: "MAS",
        chainId: "97",
        tokenAddress: masToken,
        networkName: "Binance Smart Chain Mainnet",
        databaseKey: "masBalance",
        img: "images/tokens/1.png",
      };
    case "BUSD":
      return {
        name: "BUSD",
        chainId: "97",
        tokenAddress: BUSDToken,
        networkName: "Binance Smart Chain Mainnet",
        databaseKey: "busdBalance",
        img: "images/tokens/6.png",
      };
    case "USDT":
      return {
        name: "USDT",
        chainId: "97",
        tokenAddress: USDTToken,
        networkName: "Binance Smart Chain Mainnet",
        databaseKey: "usdtBalance",
        img: "images/tokens/3.png",
      };
  }
};
