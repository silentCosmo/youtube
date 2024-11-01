import React, { useEffect, useState } from "react";
import "./Profile.css";
import LeftSideBar from "../../components/Leftsidebar/LeftSideBar";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getUserUpdates } from "../../redux/action/profile";

function Profile() {
  const dispatch = useDispatch()
  const user = useSelector((state)=>state.currentUserReducer)?.result;
  const userUpdates = useSelector((state)=>state.profileReducer)
  const [userPlan,setUserPlan] = useState(userUpdates?.plan||'Free')
  
  useEffect(()=>{
    user && dispatch(getUserUpdates(user?._id))
  },[user,dispatch])

  
  const plans = [
    {
      name: "Free",
      duration: "5",
      cost: 0,
      color: "bg-slate-600",
      text: "text-slate-500"
    },
    {
      name: "Bronze",
      duration: "7",
      cost: 10,
      color: "bg-amber-800",
      text: "text-amber-700"
    },
    {
      name: "Silver",
      duration: "10",
      cost: 50,
      color: "bg-gray-400",
      text: "text-gray-400"
    },
    {
      name: "Gold",
      duration: "Unlimited",
      cost: 100,
      color: "bg-yellow-500",
      text: "text-yellow-600"
    },
  ];

  const activePlan = plans.filter((p)=>p.name === userPlan)[0]
  const otherPlans = plans.filter((p)=> p.name !== userPlan)
  
  const handlePlanChange = (plan)=>{
    setUserPlan(plan.name)
  }

  return (
    <div className="container_Pages_App">
      <LeftSideBar />
      <div className="container2_Pages_App max-w-4xl mx-auto my-5 p-5 !overflow-y-hidden">
        <div className="bg-zinc-900 w-full max-w-full flex flex-col md:flex-row text-center md:text-left rounded-lg text-zinc-400 p-4 md:p-6 box-border">
          <div className="bg-slate-400 text-center justify-center flex mx-auto md:mx-0 p-2 mb-5 md:mb-0 rounded-full">
            <b className="bg-slate-600 w-12 h-12 p-2 rounded-full font-extrabold text-5xl text-slate-900">
              {user?.email.slice(0,1).toUpperCase()||'X'}
            </b>
          </div>

          <div className="md:ml-5">
            <p className="text-sm">{user?.email||'usertest@email.com'}</p>
            <p className="text-sm">Joined on:  {moment(user?.joinedon).format('D MMM YYYY')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          <div className="bg-zinc-900 text-center p-6 rounded-lg">
            <p className="text-lg font-semibold text-zinc-400">Engage Points</p>
{/*             <p className="text-lg font-bold text-white text-opacity-90 py-1 px-3 bg-gradient-to-r from-purple-900 to-indigo-800 w-fit mx-auto rounded-2xl cursor-none">
 */}            <p className={`text-lg font-bold text-white text-opacity-90 py-1 px-3 w-fit mx-auto rounded-2xl cursor-none bg-opacity-60 ${activePlan.color}`}>
              {userUpdates?.points||0} EP
            </p>
            <p className="text-sm text-zinc-500">Earned from watching videos</p>
          </div>

          <div className="bg-zinc-900 text-center p-6 rounded-lg">
            <p className="text-lg font-semibold text-zinc-400">Active Plan</p>
            {/* <p className="text-lg font-extrabold text-opacity-75 px-3 text-transparent bg-clip-text bg-gradient-to-r from-slate-500 to-zinc-500 w-fit mx-auto rounded-2xl">
              Free Plan
            </p> */}
            <div className={`font-bold py-2 px-4 rounded-lg text-gray-200 w-fit mx-auto cursor-pointer bg-opacity-60 ${activePlan.color}`}>
              {userPlan} Plan
            </div>
            <p className="text-sm text-zinc-500">
              You have {activePlan.cost===0 && 'only'} {activePlan.duration} watchminutes
            </p>
          </div>
        </div>

        <div className="bg-zinc-900 text-center p-6 pt-1 rounded-lg mt-5">
          <p className="text-lg font-semibold text-zinc-400">Plan Selection</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {otherPlans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-lg p-6 text-center text-stone-300 shadow-lg bg-gradient-to-r bg-opacity-10 ${plan.color}`}
              >
                <h3 className={`text-2xl font-bold mb-2 ${plan.text}`}>{plan.name} Plan</h3>
                <p className="text-sm text-zinc-400 mb-4">{plan.duration} watch minutes per day</p>
                <p className="text-lg font-bold mb-4">₹{plan.cost}</p>
                
                <button
                  onClick={() => handlePlanChange(plan)}
                  className={`py-2 px-4 rounded-lg w-full text-white font-semibold transition duration-200 active:scale-90 ${
                    plan.name === "Free"
                      ? "bg-gray-700 hover:bg-gray-600"
                      : plan.name === "Bronze"
                      ? "bg-amber-800 hover:bg-amber-700"
                      : plan.name === "Silver"
                      ? "bg-gray-500 hover:bg-gray-400"
                      : "bg-yellow-600 hover:bg-yellow-500"
                  }`}
                >
                  {plan.cost > 0 && plan.cost>activePlan.cost ? `Upgrade to ${plan.name}` : `Switch to ${plan.name}`}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900 text-center p-6 rounded-lg mt-5">
          <p className="text-lg font-semibold text-zinc-400">More features</p>
          <p className="text-sm text-zinc-500">Coming soon...</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
