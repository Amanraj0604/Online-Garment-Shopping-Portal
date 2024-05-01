import React, { useEffect, useMemo, useState } from 'react'
import "./home.css"
import Featuredinfo from '../../componant/featuredinfo/Featuredinfo'
import Chart from '../../componant/chart/Chart'
// import { userData } from '../../dummyData'
import WidgetSm from '../../componant/widgetsm/WidgetSm'
import WidgetLg from '../../componant/widgetLg/WidgetLg'
import { userRequest } from '../../requestMethod'
export default function Home() {
  const [userStats,setUserStats]=useState([]);
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(()=>{
    const getStats= async ()=>{
      try{
        const res= await userRequest.get("/user/stats")
        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ])
        );
      }catch(err){}
    }
    getStats();
  },[MONTHS])

  // console.log(userStats);
  return (
    <div className='home'>
      <Featuredinfo/>
      <Chart data={userStats} title="User Analytics" grid dataKey={"Active User"}/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  )
}
