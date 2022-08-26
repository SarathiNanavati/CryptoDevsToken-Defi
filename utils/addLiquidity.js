import { Contract, utils } from "ethers";
import {
  CRYPTODEVS_TOKEN_CONTRACT_ABI,
  CRYPTODEVS_TOKEN_CONTRACT_ADDRESS,
  CRYPTODEVS_EXCHANGE_CONTRACT_ABI,
  CRYPTODEVS_EXCHANGE_CONTRACT_ADDRESS,
} from "../constants";

export const addLiquidity = async (signer, addCDAmountInWei, addEtherAmountInWei) => {
  console.log("addLiquidity", signer, addCDAmountInWei.toString(), addEtherAmountInWei.toString());
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

    const tokenContractTx = await tokenContract.approve(
      CRYPTODEVS_EXCHANGE_CONTRACT_ADDRESS,
      addCDAmountInWei.toString()
    );
    await tokenContractTx.wait(1);

    const exchangeContractTx = await exchangeContract.addLiquidity(addCDAmountInWei, {
      value: addEtherAmountInWei,
    });
    await exchangeContractTx.wait(1);
  } catch (err) {
    console.error(`addLiquidity ${err}`);
  }
};

export const calculateCD = async (_addEther = "0", etherBalanceContract, cdTokenReserve) => {
  console.log("calculateCD", _addEther, etherBalanceContract.toString(), cdTokenReserve.toString());
  const _addEtherAmountInWei = utils.parseEther(_addEther);
  const cryptoDevTokenAmount = _addEtherAmountInWei.mul(cdTokenReserve).div(etherBalanceContract);
  return cryptoDevTokenAmount;
};
