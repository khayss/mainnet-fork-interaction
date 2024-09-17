import { ethers } from "hardhat";
import { addresses, getContracts } from "../helpers/helper";

async function main() {
  const contracts = await getContracts();
  const impersonatedAccount = await ethers.getImpersonatedSigner(
    addresses.TOKEN_HOLDER_ADDRESS
  );
  const usdtDecimals = await contracts.UsdtContract.decimals();
  const usdcDecimals = await contracts.UsdcContract.decimals();

  // Check USDT and USDC balance before Lp Addition
  const usdtBalBeforeLpAdd = await contracts.UsdtContract.balanceOf(
    addresses.TOKEN_HOLDER_ADDRESS
  );
  const usdcBalBeforeLpAdd = await contracts.UsdcContract.balanceOf(
    addresses.TOKEN_HOLDER_ADDRESS
  );

  console.log(
    "USDT balance before adding Liquidity:",
    usdtBalBeforeLpAdd.toString()
  );
  console.log(
    "USDC balance before adding Liquidity:",
    usdcBalBeforeLpAdd.toString()
  );

  // Amount of USDT and USDC to be added to the liquidity pool
  const usdtLpAmount = ethers.parseUnits("10000", usdtDecimals);
  const usdcLpAmount = ethers.parseUnits("10000", usdcDecimals);

  const approveAmount = ethers.parseUnits("1000000", usdtDecimals);
  // Approve USDT for UniswapV2Router02
  const approveUsdt = await contracts.UsdtContract.connect(
    impersonatedAccount
  ).approve(addresses.UNISWAP_V2_ROUTER_ADDRESS_02, approveAmount);
  await approveUsdt.wait();

  // Approve USDC for UniswapV2Router02
  const approveUsdc = await contracts.UsdcContract.connect(
    impersonatedAccount
  ).approve(addresses.UNISWAP_V2_ROUTER_ADDRESS_02, approveAmount);
  await approveUsdc.wait();

  // Add Liquidity
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
  const minAmountUsdt = 0; /* ethers.parseUnits("9000", usdtDecimals); */
  const minAmountUsdc = 0; /* ethers.parseUnits("9000", usdcDecimals); */
  const addLpTx = await contracts.UniswapV2Router02.addLiquidity(
    addresses.USDT_CONTRACT_ADDRESS,
    addresses.USDC_CONTRACT_ADDRESS,
    usdtLpAmount,
    usdcLpAmount,
    minAmountUsdt,
    minAmountUsdc,
    addresses.TOKEN_HOLDER_ADDRESS,
    deadline
  );
  await addLpTx.wait();

  const usdtBalAfterLpAdd = await contracts.UsdtContract.balanceOf(
    addresses.TOKEN_HOLDER_ADDRESS
  );
  const usdcBalAfterLpAdd = await contracts.UsdcContract.balanceOf(
    addresses.TOKEN_HOLDER_ADDRESS
  );

  console.log("USDT balance after swap:", usdtBalAfterLpAdd.toString());
  console.log("USDC balance after swap:", usdcBalAfterLpAdd.toString());

  
  // Remove Liquidity
  const
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
