import { Contract, providers, utils, BigNumber } from "ethers";
import {
  CRYPTODEVS_EXCHANGE_CONTRACT_ABI,
  CRYPTODEVS_EXCHANGE_CONTRACT_ADDRESS,
} from "../constants";

export const removeLiquidity = async (signer, removeLPTokensWei) => {
  console.log("removeLiquidity", signer, removeLPTokensWei.toString());

  try {
    const exchangeContract = new Contract(
      CRYPTODEVS_EXCHANGE_CONTRACT_ADDRESS,
      CRYPTODEVS_EXCHANGE_CONTRACT_ABI,
      signer
    );

    const exchangeContractTx = await exchangeContract.removeLiquidity(removeLPTokensWei);
    await exchangeContractTx.wait(1);
  } catch (error) {
    console.error(`removeLiquidity ${error}`);
  }
};

export const getTokensAfterRemove = async (
  provider,
  removeLPTokensWei,
  _ethBalance,
  cryptoDevsTokenReserve
) => {
  console.log(
    "getTokensAfterRemove",
    provider,
    removeLPTokensWei.toString(),
    _ethBalance.toString(),
    cryptoDevsTokenReserve.toString()
  );

  try {
    const exchangeContract = new Contract(
      CRYPTODEVS_EXCHANGE_CONTRACT_ADDRESS,
      CRYPTODEVS_EXCHANGE_CONTRACT_ABI,
      provider
    );

    const _totalSupplyOfLP = await exchangeContract.totalSupply();
    const _removeEther = _ethBalance.mul(removeLPTokensWei).div(_totalSupplyOfLP);
    const _removeCD = cryptoDevsTokenReserve.mul(removeLPTokensWei).div(_totalSupplyOfLP);
    return { _removeEther, _removeCD };
  } catch (error) {
    console.error(`removeLiquidity ${error}`);
  }
};
