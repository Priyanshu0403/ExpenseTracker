import React from "react";
import Title from "./title";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { RiProgress3Line } from "react-icons/ri";
import { IoMdWarning } from "react-icons/io";
import { Link } from "react-router-dom";
import { formatCurrency } from "@/lib";

const RecentTransactions = ({ data }) => {
  return (
    <div className="flex-1 py-20 w-full md:w-2/3">
      <div className="flex items-center justify-between">
        <Title title="Latest Transactions" />
        <Link 
        to="/transactions"
        className="text-sm text-gray-600 dark:text-gray-500 hover:text-violet-600 hover:underline mr-5">
          View All
        </Link>
      </div>
      {/* for making the table scrollable we use overflow class */}
      <div className="overflow-x-auto mt-5">
        <table className="w-full">
          <thead className="w-full border-b border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-500 hover:bg-gray-300/10">
            <tr className="w-full text-black dark:text-gray-400">
              <th className="py-2 px-2">Date</th>
              <th className="py-2 px-2">Description</th>
              <th className="py-2 px-2">Status</th>
              <th className="py-2 px-2">Source</th>
              <th className="py-2 px-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr
                key={index}
                className="text-center text-black dark:text-gray-400 border-b border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <td className="py-4">
                  {new Date(item.createdat).toLocaleDateString()}
                </td>
                <td className="py-3 px-2">
                  <div>
                    <p className="font-medium text-lg text-black dark:text-gray-400">
                      {item?.description}
                    </p>
                    {/* <span className="text-sm text-gray-600">
                      {item.contact}
                    </span> */}
                  </div>
                </td>
                <td className="py-3 px-2 flex items-center gap-2">
                  {item?.status === "Completed" && (
                    <IoCheckmarkDoneCircle
                      className="text-emerald-500"
                      size={24}
                    />
                  )}
                  {item?.status === "Pending" && (
                    <RiProgress3Line className="text-amber-600" size={24} />
                  )}
                  {item?.status === "Rejected" && (
                    <IoMdWarning className="text-red-600" size={24} />
                  )}
                  <span>{item?.status}</span>
                </td>
                <td className="py-3 px-2">
                  <p className="line-clamp-1">{item?.source}</p>
                </td>
                <td className="py-3 px-2 text-black dark:text-gray-400 text-base md:text-xl">
                  <span className={`${item?.type === "Income" ? "text-emerald-600" : "text-red-600"}`}>
                     {formatCurrency(item?.amount)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTransactions;

// const data = [
//   {
//     date: "2024-01-05",
//     name: "Online Store",
//     contact: "+1234567890",
//     status: "Completed",
//     source: "Credit Card",
//     amount: 150,
//   },
//   {
//     date: "2024-01-12",
//     name: "Grocery Store",
//     contact: "+1987654321",
//     status: "Rejected",
//     source: "Debit Card",
//     amount: 75,
//   },
//   {
//     date: "2024-01-20",
//     name: "Utility Bill",
//     contact: "+1122334455",
//     status: "Pending",
//     source: "Bank Transfer",
//     amount: 100,
//   },
//   {
//     date: "2024-02-03",
//     name: "Restaurant",
//     contact: "+1555666777",
//     status: "Completed",
//     source: "Cash",
//     amount: 50,
//   },
//   {
//     date: "2024-02-10",
//     name: "Online Subscription",
//     contact: "+1444333222",
//     status: "Completed",
//     source: "Credit Card",
//     amount: 25,
//   },
//   {
//     date: "2024-02-18",
//     name: "Gas Station",
//     contact: "+1777888999",
//     status: "Completed",
//     source: "Debit Card",
//     amount: 40,
//   },
//   {
//     date: "2024-03-07",
//     name: "Electronics Store",
//     contact: "+1987654321",
//     status: "Completed",
//     source: "Credit Card",
//     amount: 200,
//   },
//   {
//     date: "2024-03-15",
//     name: "Online Service",
//     contact: "+1122334455",
//     status: "Pending",
//     source: "Bank Transfer",
//     amount: 120,
//   },
//   {
//     date: "2024-03-22",
//     name: "Coffee Shop",
//     contact: "+1234567890",
//     status: "Rejected",
//     source: "Cash",
//     amount: 10,
//   },
//   {
//     date: "2024-04-01",
//     name: "Grocery Store",
//     contact: "+1555666777",
//     status: "Completed",
//     source: "Debit Card",
//     amount: 90,
//   },
//   {
//     date: "2024-04-08",
//     name: "Online Shopping",
//     contact: "+1444333222",
//     status: "Completed",
//     source: "Credit Card",
//     amount: 180,
//   },
//   {
//     date: "2024-04-15",
//     name: "Car Maintenance",
//     contact: "+1777888999",
//     status: "Completed",
//     source: "Cash",
//     amount: 300,
//   },
// ];
