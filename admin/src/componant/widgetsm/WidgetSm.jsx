import React, { useEffect, useState } from 'react'
import "./WidgetSm.css";
import { Visibility } from '@mui/icons-material';
import { userRequest } from '../../requestMethod';
export default function WidgetSm() {
  const [users,setUsers]=useState([]);

  useEffect(()=>{
    const getUsers=async ()=>{
      try{
      const res=await userRequest.get("user/?new=true")
      setUsers(res.data)
      }
      catch(err)
      {

      }
    }
    getUsers();
  },[])
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.map(user=>(
        <li className="widgetSmListItem" key={user._id}>
          <img
            src={user.img||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq-gE2ZUc5sTuA7wUcQtqsUglG2by5g-2mJQ&usqp=CAU"}
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.username}</span>
            {/* <span className="widgetSmUserTitle">{user.email}</span> */}
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        ))}
      </ul>
    </div>
  )
}
