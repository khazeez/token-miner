'use client';

import logo from '@/public/vercel.svg';
import { Button, Divider, Input, InputNumber, message, UploadProps } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import Image from 'next/image';
import copyIcon from '@/public/copy-right.png';

export default function Home() {

  return (
    <div>
      <div className="bg-black w-full py-[5px] text-white text-center">
        Token Minter 
      </div>

      <div className="flex justify-center items-center w-full mt-[20px]">
        <Image src={logo} alt="logo" width={200} height={200} />
      </div>

      <div className="flex flex-col lg:flex-row gap-[30px] mt-[20px] px-[30px] border-2 min-h-[80vh] justify-center items-center">
        <div className="rounded-[20px] border-[1px] border-gray-200 p-[24px] flex-1">
          <h1 className="text-[22px] font-bold">Mint Token</h1>
          <div className="flex flex-col gap-[10px]">
            <InputNumber
              style={{
                borderRadius: 16,
                height: 48,
                backgroundColor: '#F0F0F0',
              }}
              placeholder="Amount"
            />
            <Button className="!bg-black !text-white !h-[40px] !rounded-[16px]">
              Mint Token
            </Button>
          </div>
          <h1 className="text-[22px] font-bold">Burn Token</h1>
          <div className="flex flex-col gap-[10px]">
            <InputNumber
              style={{
                borderRadius: 16,
                height: 48,
                backgroundColor: '#F0F0F0',
              }}
              placeholder="Amount"
            />
            <Button className="!bg-black !text-white !h-[40px] !rounded-[16px]">
              Mint Token
            </Button>
          </div>
        </div>
        <div className="rounded-[20px] border-[1px] border-gray-200 p-[24px] flex-1 w-full">
          <h1 className="mb-[20px]">Your Token Balance</h1>
          <div className="flex flex-col gap-[10px]">
            <div className="flex items-center justify-between">
              <h1 className="text-[#00000099]"></h1>
              <div className="flex items-center gap-[5px]">
                <h1 className="text-[#A8A8A8]">0</h1>
              </div>
            </div>
            <Divider />
          </div>
        </div>
      </div>
    </div>
  );
}
