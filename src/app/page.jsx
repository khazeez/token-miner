'use client';

import logo from '@/public/vercel.svg';
import { Button, Divider, InputNumber } from 'antd';
import Image from 'next/image';
import { web3, contract } from './contract';
import { useState } from 'react';

export default function Home() {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(0);
  const [value, setValue] = useState(0)
  const [symbol, setSymbol] = useState("")


  const connectWallet = async () => {
    if (web3 && contract) {
      try {
        const accounts = await web3.eth.requestAccounts();
        setAccount(accounts[0]);
        getBalance(accounts[0]);
        let symbolToken = await contract.methods.symbol().call();
        setSymbol(symbolToken);
      } catch (error) {
        console.error("Error accessing accounts:", error);
      }
    } else {
      console.error("Web3 or contract is not initialized");
    }
  };

  

  const mintToken = async () => {
    try {
      const gasPrice = await web3?.eth.getGasPrice();
      await contract.methods.mint().send({ from: account, gasPrice });
      getBalance(account)
    } catch (error) {
      console.error(error);
    }
  };

  const inputValue = async ({q}) => {
    try {
    await setValue(q)
    } catch (err) {
     await console.log(err)
    }
  }

  const burnToken = async () => {
    try {
      const gasPrice = await web3?.eth.getGasPrice();
      await contract.methods.burn(value).send({ from: account, gasPrice });
      getBalance(account)
    } catch (err) {
      console.error(err);
    }
  }

  const getBalance = async(account)=> {
    if (!account) return; 
    const newBalance = await contract.methods.checkBalance(account).call(); 
    setBalance(Number(newBalance));
  }





  return (
    <div>
      {/* <div className="bg-black w-full py-[5px] text-white text-center">
        Token Minter
      </div> */}

      <div className="flex justify-center items-center w-full mt-[20px]">
        <Image src={logo} alt="logo" width={200} height={200} />
      </div>

      {!account ? (
        <div className="flex flex-col lg:flex-row gap-[30px] mt-[20px] px-[30px] border-2 min-h-[80vh] justify-center items-center">
          <Button className="!bg-black !text-white" onClick={connectWallet}>
            Connect Wallet
          </Button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-[30px] mt-[20px] px-[30px] border-2 min-h-[80vh] justify-center items-center">
          <div className="rounded-[20px] border-[1px] border-gray-200 p-[24px] flex-1">
            <h1 className="text-[22px] font-bold">Mint Token</h1>
            <div className="flex flex-col gap-[10px]">
              <Button className="!bg-black !text-white !h-[40px] !rounded-[16px]" onClick={mintToken}>
                Mint Token
              </Button>
            </div>
            <h1 className="text-[22px] font-bold pt-4">Burn Token</h1>
            <div className="flex flex-col gap-[10px]">
              <input
                style={{
                  borderRadius: 16,
                  height: 48,
                  backgroundColor: '#F0F0F0',
                  textAlign: 'center',
                }}
                min={1}
                max={balance}
                placeholder="Amount"
                onChange={({target})=> inputValue({q: Number(target.value)})}
              />
              <Button className="!bg-black !text-white !h-[40px] !rounded-[20px]" onClick={burnToken}>
                Burn Token
              </Button>
            </div>
          </div>
          <div className="rounded-[20px] border-[1px] border-gray-200 p-[24px] flex-1 w-full">
            <h2 style={{color:'blue'}}><b>Account connected: </b> {account}</h2>
            <Divider />
            <h1 className="mb-[20px]">Your Token Balance</h1>
            <div className="flex flex-col gap-[10px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[5px]">
                  <h1 className="text-[#A8A8A8] " style={{ fontSize:'63px'}}>{balance/10**18} {symbol}</h1>
                </div>
              </div>
              <Divider />
              <Button onClick={connectWallet} >refresh</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
