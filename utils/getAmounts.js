import { Contract } from "ethers";

import {
  CRYPTODEVS_EXCHANGE_CONTRACT_ABI,
  CRYPTODEVS_EXCHANGE_CONTRACT_ADDRESS,
  CRYPTODEVS_TOKEN_CONTRACT_ABI,
  CRYPTODEVS_TOKEN_CONTRACT_ADDRESS,
} from "../constants";

export const getEtherBalance = async (provider, address, contract = false) => {
  console.log("getEtherBalance", provider, address, contract);

  try {
    if (contract) {
      const balance = await provider.getBalance(CRYPTODEVS_EXCHANGE_CONTRACT_ADDRESS);
      return balance;
    } else {
      const balance = await provider.getBalance(address);
      return balance;
    }
  } catch (err) {
    console.error(err);
    return 0;
  }
};

export const getCDTokensBalance = async (provider, address) => {
  console.log("getCDTokensBalance", provider, address);

  try {
    const tokenContract = new Contract(
      CRYPTODEVS_TOKEN_CONTRACT_ADDRESS,
      CRYPTODEVS_TOKEN_CONTRACT_ABI,
      provider
    );
    const balanceOfCryptoDevsTokens = await tokenContract.balanceOf(address);
    return balanceOfCryptoDevsTokens;
  } catch (err) {
    console.error(err);
    return 0;
  }
};

export const getLPTokensBalance = async (provider, address) => {
  console.log("getLPTokensBalance", provider, address);

  try {
    const exchangeContract = new Contract(
      CRYPTODEVS_EXCHANGE_CONTRACT_ADDRESS,
      CRYPTODEVS_EXCHANGE_CONTRACT_ABI,
      provider
    );
    const balanceOfLPTokens = await exchangeContract.balanceOf(address);
    return balanceOfLPTokens;
  } catch (err) {
    console.error(err);
    return 0;
  }
};

export const getReserveOfCDTokens = async (provider, address) => {
  console.log("getReserveOfCDTokens", provider, address);
  try {
    const exchangeContract = new Contract(
      CRYPTODEVS_EXCHANGE_CONTRACT_ADDRESS,
      CRYPTODEVS_EXCHANGE_CONTRACT_ABI,
      provider
    );
    const cryptoDevsTokenReserve = await exchangeContract.getReserve();
    return cryptoDevsTokenReserve;
  } catch (err) {
    console.error(err);
    return 0;
  }
};
