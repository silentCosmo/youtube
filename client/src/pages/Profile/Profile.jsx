import React, { useEffect } from "react";
import "./Profile.css";
import LeftSideBar from "../../components/Leftsidebar/LeftSideBar";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getUserUpdates } from "../../redux/action/profile";

function Profile() {
  const dispatch = useDispatch()
  const user = useSelector((state)=>state.currentUserReducer)?.result;
  const userUpdates = useSelector((state)=>state.profileReducer)
  
  useEffect(()=>{
    user && dispatch(getUserUpdates(user?._id))
  },[user,dispatch])
  
  return (
    <div className="container_Pages_App">
      <LeftSideBar />
      <div className="container2_Pages_App max-w-4xl mx-auto my-10 p-5">
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
            <p className="text-lg font-bold text-white text-opacity-90 py-1 px-3 bg-gradient-to-r from-purple-900 to-indigo-800 w-fit mx-auto rounded-2xl cursor-none">
              {userUpdates?.points||0} EP
            </p>
            <p className="text-sm text-zinc-500">Earned from watching videos</p>
          </div>

          <div className="bg-zinc-900 text-center p-6 rounded-lg">
            <p className="text-lg font-semibold text-zinc-400">Active Plan</p>
            {/* <p className="text-lg font-extrabold text-opacity-75 px-3 text-transparent bg-clip-text bg-gradient-to-r from-slate-500 to-zinc-500 w-fit mx-auto rounded-2xl">
              Free Plan
            </p> */}
            <div className="bg-gradient-to-r from-slate-800 to-zinc-800 text-slate-400 font-bold py-2 px-4 rounded-lg hover:bg-gradient-to-l w-fit mx-auto cursor-pointer">
              Free Plan
            </div>
            <p className="text-sm text-zinc-500">
              Upgrade to higher plans for more features
            </p>
          </div>
        </div>
        <div className="bg-zinc-900 text-center p-6 rounded-lg mt-5">
          <p className="text-lg font-semibold text-zinc-400">Plan Selection</p>
          <p className="text-sm text-zinc-500">Coming soon...</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
