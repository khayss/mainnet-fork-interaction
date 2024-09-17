import { ethers } from "hardhat";

export const addresses = {
  TOKEN_HOLDER_ADDRESS: "0xb12b800ca658F6C9D48c920b2AD7fa1024f6CE07",
  UNISWAP_V2_ROUTER_ADDRESS_02: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
  USDT_CONTRACT_ADDRESS: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  USDC_CONTRACT_ADDRESS: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
};
export async function getContracts() {
  const UsdtContract = await ethers.getContractAt(
    "IERC20",
    addresses.USDT_CONTRACT_ADDRESS
  );
  const UsdcContract = await ethers.getContractAt(
    "IERC20",
    addresses.USDC_CONTRACT_ADDRESS
  );
  const UniswapV2Router02 = await ethers.getContractAt(
    "IUniswapV2Router02",
    addresses.UNISWAP_V2_ROUTER_ADDRESS_02
  );

  return {
    UsdtContract,
    UsdcContract,
    UniswapV2Router02,
  };
}
