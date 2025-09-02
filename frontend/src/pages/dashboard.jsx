import Chart from '@/components/chart';
import DoughnutChart from '@/components/doughnutChart';
import Info from '@/components/info';
import Navbar from '@/components/navbar';
import Stats from '@/components/stats';
// import useStore from '@/store';
import React, { useEffect, useState } from 'react'
import Accounts from '@/components/accounts';
import api from '@/lib/apiCall';
import { toast } from 'sonner';
import Loading from '@/components/loading';
import RecentTransactions from '@/components/recent-transactions';

const Dashboard = () => {

  //Just Understanding
  const [data,setData] = useState([]);
  const [isLoading,setIsLoading] = useState(false);

  const fetchDashboardStats = async () =>{
    const URL = `/transactions/dashboard`;
    try{
      const { data } = await api.get(URL);
      setData(data);
    }catch(error){
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Something unexpected happend. Try again later."
      );
      if(error?.response?.data?.status === "auth_failed"){
        localStorage.removeitem("user");
        window.location.reload();
      }
    }finally{
      setIsLoading(false);
    }
  };

  useEffect(()=>{
    setIsLoading(true);
    fetchDashboardStats();
  },[]);

  if(isLoading)
    return <div className='flex items-center justify-center w-full h-[80vh]'><Loading/></div>;

  //till here






  // const theme = useStore((state) => state.theme); //"dark" "light"
  // const theme = "light"
  return (
    // <main className={theme}>
      // <div className='w-full px-6 md:px-20 bg-white dark:bg-slate-900'>
      //   <Navbar />

        <div className='px-0 md:px-5 2xl:px-20'>
          <Info
            title='Dashboard'
            subtitle='Monitor your financial activities'
          />
          <Stats dt={{
            balance: data?.availableBalance,
            income: data?.totalIncome,
            expense:data?.totalExpense,
          }}/>

          <div className='w-full flex flex-col-reverse md:flex-row items-center gap-10'>
            <Chart data={data?.chartData} />
            {data?.totalIncome > 0 && (
              <DoughnutChart 
              dt={{
                balance: data?.availableBalance,
                income: data?.totalIncome,
                expense:data?.totalExpense,
              }}/>
              )}
            
          </div>

          <div className='flex flex-col-reverse md:flex-row gap-0 md:gap-10 2xl:gap-20'>
            <RecentTransactions data={data?.lastTransactions}/>
            {data?.lastAccount?.length > 0 && <Accounts data={data?.lastAccount}/>}
          </div>
        </div>
    //   </div>
    // </main>
  )
}

export default Dashboard
