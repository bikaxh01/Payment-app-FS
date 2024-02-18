import { useEffect, useState } from "react"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios"


export const Dashboard = () => {
  const [balance,setBalance] = useState('')

  // useEffect(()=>{
  //   const balanceCheck= async()=>{
  //     const response = await axios.get('http://localhost:3000/api/v1/account/balance', {
  //     headers: {
  //       token: localStorage.getItem('token')
  //     }
  //   })
  //   balance()
  // },[])
  console.log(localStorage.getItem('token'));
  console.log("sfs");
   
    return <div>
        <Appbar />
        <div className="m-8">
            <Balance value={"10,000"} />
            <button>refresh</button>
            <Users></Users>
        </div>
    </div>
}