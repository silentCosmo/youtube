import React from "react";
import "./Profile.css";
import LeftSideBar from "../../components/Leftsidebar/LeftSideBar";

function Profile() {
  return (
    <div className="container_Pages_App">
      <LeftSideBar />
      <div className="container2_Pages_App">
        <div className="m-5">
          <div className="bg-zinc-900 w-full flex flex-col text-center rounded-lg text-zinc-400">
            <div className="bg-slate-400 text-center justify-center flex mx-auto p-2 m-5 rounded-full">
              <b className="bg-slate-600 w-12 h-12 p-2 rounded-full font-extrabold text-5xl text-slate-900">
                S
              </b>
            </div>
            <div className="md:my-auto">
              <p className="mt-0 text-sm">emailsomebig@address.com</p>
              <p className="mt-0 text-sm">Joined on: 29 May 2030</p>
            </div>
          </div>
          <div className="md:flex gap-3 justify-center">
            <div className="mt-2">
              <div className="bg-zinc-900 text-center p-6 rounded-lg mx-auto">
                <p className="text-lg font-semibold text-zinc-400">
                  Engage Points
                </p>
                <p className="text-lg font-bold text-white text-opacity-80 py-1 px-3 bg-gradient-to-r from-purple-900 to-indigo-800 w-fit mx-auto rounded-2xl">
                  150 EP
                </p>
                <p className="text-sm text-zinc-500">
                  Earned from watching videos
                </p>
              </div>
            </div>
            <div className="mt-2">
              <div className="bg-zinc-900 text-center p-6 rounded-lg mx-auto">
                <p className="text-lg font-semibold text-zinc-400">
                  Active plan
                </p>
                <p className="text-lg font-extrabold text-opacity-75 py-1 px-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-indigo-700 w-fit mx-auto rounded-2xl">
                  Free Plan
                </p>
                <p className="text-sm text-zinc-500">
                  <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                    Upgrade{" "}
                  </span>
                  to higher plans for more features
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
