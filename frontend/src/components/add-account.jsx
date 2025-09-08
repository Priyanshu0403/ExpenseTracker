import { generateAccountNumber } from "@/lib";
import useStore from "@/store";
import { useState } from "react";
import { useForm } from "react-hook-form";
import DialogWrapper from "./wrappers/dialog-wrapper";
import { DialogPanel, DialogTitle } from "@headlessui/react";

const accounts = ["Cash", "Crypto", "Paypal", "Visa Debit Card"];

export const AddAccount = ({ isOpen, setIsOpen, refetch }) => {
  const { user } = useStore((state) => state);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { account_number: generateAccountNumber() },
  });

  const [selectedAccount, setSelectedAccount] = useState(accounts[0]);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {};
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <DialogWrapper isOpen={isOpen} closeModal={closeModal}>
      <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-6 text-left align-middle shadow-xl transition-all">
        <DialogTitle
          as="h3"
          className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-300 mb-4 uppercase"
        >
          Add Account
        </DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="fex flex-col gap-1 mb-2">
            <p className="text-gray-700 dark:text-gray-400 text-sm mb-2">
              Select Account
            </p>
            <select
                onChange={(e)=> setSelectedAccount(e.target.value)}
                className="bg-transparent appearance-none border border-gray-300 dark:border-gray-800 rounded w-full py-2 px-3
                 text-gray-700 dark:text-gray-500 outline-none focus:ring-1 ring-blue-500 dark:placeholder::text-gray-500"
            >
                {accounts.map((acc,index)=>(
                    <option key={index} value={acc}
                    className="w-full flex items-center justify-center dark:bg-slate-900"
                    >
                        {acc}
                    </option>
                ))}
            </select>
          </div>
        </form>
      </DialogPanel>
    </DialogWrapper>
  );
};
