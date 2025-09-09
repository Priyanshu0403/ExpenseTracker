import api from '@/lib/apiCall';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner';
import DialogWrapper from './wrappers/dialog-wrapper';
import { DialogPanel, DialogTitle, useClose } from '@headlessui/react';
import { Button } from './ui/button';
import { formatCurrency } from '@/lib';
import { Input } from './ui/input';
import useStore from '@/store';
import Loading from './loading';

const TransferMoney = ({isOpen,setIsOpen,id,refetch}) => {
    const {user} = useStore((state)=>state);
    const {
        register,
        handleSubmit,
        formState:{errors},
        watch,
    } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [loading,setLoading] = useState(false);
    const [accountData, setAccountData] = useState([]);
    const [fromAccountInfo, setFromAccountInfo] = useState([]);
    const [toAccountInfo, setToAccountInfo] = useState([]);

    const submitHandler = async(data) =>{
        try {
            setLoading(true);
            const newData = {
                ...data,
                from_account: fromAccountInfo.id,
                to_account: toAccountInfo.id,
            };
            const {data:res} = await api.put(`/transaction/transfer-money/`,newData);

            if(res?.status === "success"){
                toast.success(res?.message);
                setIsOpen(false);
                refetch();
            }
        } catch (error) {
            console.error("Something went wrong:",error);
            toast.error(error?.response?.data?.message || error.message);
        }finally{
            setLoading(false);
        }
    };

    const getAccountBalance = (setAccount, val)=>{
        const filteredAccount = accountData?.find(
            (account) => account.account_name === val
        );

        setAccountData(filteredAccount); //here check this if something goes wrong
    };

    function closeModal(){
        setIsOpen(false);
    };

    const fetchAccounts = async()=>{
        try {
            const {data: res} = await api.get(`/account`);
            setAccountData(res?.data);
        } catch (error) {
            console.error(error);
        }finally{
            setLoading(false);
        }
    };

    useEffect(()=>{
        fetchAccounts();
    },[]);


  return (
    <DialogWrapper isOpen={isOpen} closeModal={closeModal}>
        <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-6 text-left ">
            <DialogTitle 
                as='h3'
                className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-300 mb-4 uppercase"
            >
                Transfer Money
            </DialogTitle>

            {isLoading?(
                <Loading/>
            ):(
                <form onSubmit={handleSubmit(submitHandler)}>
                    <div  className='flex flex-col gap-1 mb-2'>
                        <p className='text-gray-700 dark:text-gray-400 text-sm mb-2'>
                            Select Account
                        </p>

                        <select></select>
                    </div>
                
            </form>    
            )}
            
        </DialogPanel>
    </DialogWrapper>
  )
}

export default TransferMoney
