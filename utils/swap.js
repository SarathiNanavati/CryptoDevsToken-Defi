import { Contract } from "ethers";
import {
  CRYPTODEVS_EXCHANGE_CONTRACT_ABI,
  CRYPTODEVS_EXCHANGE_CONTRACT_ADDRESS,
  CRYPTODEVS_TOKEN_CONTRACT_ABI,
  CRYPTODEVS_TOKEN_CONTRACT_ADDRESS,
} from "../constants";

export const getAmountOfTokensReceivedFromSwap = async (
  _swapAmountInWei,
  provider,
  ethSelected,
  ethBalance,
  reservedCD
) => {
  console.log(
    "getAmountOfTokensReceivedFromSwap",
    _swapAmountInWei.toString(),
    provider,
    ethSelected,
    ethBalance.toString(),
    reservedCD.toString()
  );

  try {
    const exchangeContract = new Contract(
      CRYPTODEVS_EXCHANGE_CONTRACT_ADDRESS,
      CRYPTODEVS_EXCHANGE_CONTRACT_ABI,
      provider
    );

    let amountOfTokens;
    if (ethSelected) {
      amountOfTokens = await exchangeContract.getAmountOfTokens(
        _swapAmountInWei,
        ethBalance,
        reservedCD
      ); // output CD Token
    } else {
      amountOfTokens = await exchangeContract.getAmountOfTokens(
        _swapAmountInWei,
        reservedCD,
        ethBalance
      ); // output eth
    }

    return amountOfTokens;
  } catch (err) {
    console.error(`getAmountOfTokensReceivedFromSwap ${err}`);
  }
};

export const swapTokens = async (
  signer,
  swapAmountInWei,
  tokenToBeReceivedAfterSwap,
  ethSelected
) => {
  console.log(
    "swapTokens",
    signer,
    swapAmountInWei.toString(),
    tokenToBeReceivedAfterSwap.toString(),
    ethSelected
  );

  try {
    const exchangeContract = new Contract(
      CRYPTODEVS_EXCHANGE_CONTRACT_ADDRESS,
      CRYPTODEVS_EXCHANGE_CONTRACT_ABI,
      signer
    );

    const tokenContract = new Contract(
      CRYPTODEVS_TOKEN_CONTRACT_ADDRESS,
      CRYPTODEVS_TOKEN_CONTRACT_ABI,
      signer
    );

    let exchangeContractTx;
    if (ethSelected) {
      exchangeContractTx = await exchangeContract.ethToCryptoDevToken(tokenToBeReceivedAfterSwap, {
        value: swapAmountInWei,
      });
    } else {
      tokenContractTx = await tokenContract.approve(
        CRYPTODEVS_EXCHANGE_CONTRACT_ADDRESS,
        swapAmountInWei.toString()
      );
      await tokenContractTx.wait(1);

      exchangeContractTx = await exchangeContract.cryptoDevTokenToEth(
        swapAmountInWei,
        tokenToBeReceivedAfterSwap
      );
    }

    await exchangeContractTx.wait(1);
  } catch (err) {
    console.error(`swapTokens ${err}`);
  }
};
