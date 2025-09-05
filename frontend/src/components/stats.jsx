import React from "react";
import { BsCashCoin, BsCurrencyDollar } from "react-icons/bs";
import { SiCashapp } from "react-icons/si";
import { IoMdArrowDown, IoMdArrowUp } from "react-icons/io";
import { Card } from "./ui/card";
import { formatCurrency } from "@/lib";

const ICON_STYLES = [
  "bg-blue-300 text-blue-800",
  "bg-emerald-300 text-emerald-800",
  "bg-rose-300 text-rose-800",
];

const Stats = ({ dt }) => {
  const data = [
    {
      label: "Total Balance",
      amount: dt?.balance,
      icon: <BsCurrencyDollar size={26} />,
      increase: 10.9,
    },
    {
      label: "Total Income",
      amount: dt?.income,
      icon: <BsCashCoin size={26} />,
      increase: 8.9,
    },
    {
      label: "Total Expense",
      amount: dt?.expense,
      icon: <SiCashapp size={26} />,
      increase: -10.9,
    },
  ];

  const ItemCard = ({ item, index }) => {
    return (
      <Card className="flex items-center justify-between w-full h-48 gap-5 px-4 py-12 shadow-1g 2xl:min-w-96 2xl:px-8 dark:bg-slate-800 bg-gray-50 shadow-gray-400">
        <div className="flex items-center w-full h-full gap-2">
          <div
            className={`w-12 h-12 flex items-center justify-center rounded-full ${ICON_STYLES[index]}`}
          >
            {item.icon}
          </div>
          <div className="space-y-3">
            <span className="text-base text-gray-600 dark:text-gray-400 md:text-lg">
              {item.label}
            </span>
            <p className="text-2xl font-bold text-black 2xl:text-3xl dark:text-gray-400">
              {formatCurrency(item?.amount || 0.0)}
            </p>
            <span className="text-xs text-gray-600 md:text-sm 2xl:text-base dark:text-gray-500">
              Overall {item.label}
            </span>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between py-8 md:py-0 gap-8 2xl:gap-40 mb-20">
      <div className="flex flex-col md:flex-row items-center justify-between w-full gap-10 2xl:gap-20 ">
        {data?.map((item, index) => (
          <ItemCard key={index} item={item} index={index} />
        ))}
      </div>
    </div>
  );
  // return (
  //   <div className="flex flex-col md:flex-row items-center justify-between py-8 md:py-0 gap-8 2xl:gap-40 mb-20">
  //     {data.map((item, index) => (
  //       <div
  //         key={index + item.label}
  //         className="w-full 2xl:min-w-96 flex items-center justify-between gap-5 px-4 md:px-8 py-12 rounded-lg bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-900"
  //       >
  //         <div className="flex items-center gap-2">
  //           <div
  //             className={`w-12 h-12 flex items-center justify-center rounded-full ${ICON_STYLES[index]}`}
  //           >
  //             {item.icon}
  //           </div>
  //           <div className="space-y-1">
  //             <span className="text-gray-500 dark:text-gray-400 text-base md:text-lg">
  //               {item.label}
  //             </span>
  //             <p className="text-2xl 2xl:text-3xl font-bold text-black dark:text-gray-300">
  //               {item.amount}
  //             </p>
  //           </div>
  //           {/* <div
  //             className={`text-sm font-medium ${
  //               item.increase > 0 ? "text-green-500" : "text-red-500"
  //             }`}
  //           >
  //             {item.increase > 0 ? "+" : ""}
  //             {item.increase}%
  //           </div> */}
  //         </div>
  //         <div>
  //           <p
  //             className={`flex gap-1 items-center text-base md:text-lg
  //              font-semibold ${
  //                item.increase > 0 ? "text-emerald-500" : "text-red-500"
  //              }`}
  //           >
  //             {item.increase > 0 ? <IoMdArrowUp /> : <IoMdArrowDown />}
  //             {Math.abs(item.increase)} %
  //           </p>
  //           <span className="text-xs md:text-sm text-gray-600 dark:text-gray-500">
  //             Compare to last year
  //           </span>
  //         </div>
  //       </div>
  //     ))}
  //   </div>
  // );
};

export default Stats;
