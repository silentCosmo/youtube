import React, { useEffect, useState } from "react";
import "./Profile.css";
import LeftSideBar from "../../components/Leftsidebar/LeftSideBar";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getUserUpdates } from "../../redux/action/profile";
import { initiatePayment } from "../../redux/action/payment";
import {ToastContainer,toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.currentUserReducer)?.result;
  const userUpdates = useSelector((state) => state.profileReducer);
  const [userPlan, setUserPlan] = useState("Loading..");
  const [loading, setLoading] = useState(true);

  console.log(userUpdates?.plan);

  useEffect(() => {
    dispatch(getUserUpdates(user?._id));
  }, [user]);

  useEffect(() => {
    userUpdates?.plan && setUserPlan(userUpdates?.plan || "Free");
    userUpdates?.plan&&setLoading(false)
    if(userUpdates?.payment==='success'){
      toast.success("The payment was successsful",{theme:"dark"})
    }else if(userUpdates?.payment==='ongoing'){
      toast.warning("Your previous payment was pending!",{theme:"dark"})
    }else if(userUpdates?.payment==='failed'){
      toast.error("The payment was failed",{theme:"dark"})
    }
  }, [userUpdates?.plan]);

  const plans = [
    {
      name: "Free",
      duration: "5",
      cost: 0,
      color: "bg-slate-600",
      text: "text-slate-500",
    },
    {
      name: "Bronze",
      duration: "7",
      cost: 10,
      color: "bg-amber-800",
      text: "text-amber-700",
    },
    {
      name: "Silver",
      duration: "10",
      cost: 50,
      color: "bg-gray-400",
      text: "text-gray-400",
    },
    {
      name: "Gold",
      duration: "Unlimited",
      cost: 100,
      color: "bg-yellow-500",
      text: "text-yellow-600",
    },
  ];

  const activePlan = plans.filter((p) => p.name === userPlan)[0];
  const otherPlans = plans.filter((p) => p.name !== userPlan);

  const handlePlanChange = (plan) => {
    setUserPlan(plan.name);
  };

  console.log();

  const handlePayment = async (plan) => {
    const txnId = Date.now();
    if(plan.cost===0){return toast.info('You will be downgraded to the Free Plan after your current plan expires.',{theme:'dark'})}
    try {
      const paymentData = {
        productinfo: plan.name,
        amount: plan.cost,
        email: user.email,
        udf1: user?._id,
        txnid: txnId,
        firstname: user?.user,
        phone: "1234567890",
        surl: `${process.env.REACT_APP_NODE_SERVER}/payment/result`,
        furl: `${process.env.REACT_APP_NODE_SERVER}/payment/result`,
      };
      const payment = await dispatch(initiatePayment(paymentData));

      console.log(paymentData);
      console.log(payment);

      const form = payment.data.response;
      const formContainer = document.createElement("div");
      formContainer.innerHTML = form;
      document.body.appendChild(formContainer);

      formContainer.querySelector("form").submit();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container_Pages_App">
      <LeftSideBar />
      <div className="container2_Pages_App">
        {!loading ? (
          <div className=" max-w-4xl mx-auto p-5">
            <ToastContainer position="bottom-center" autoClose={10000} />
            <div className="bg-zinc-900 w-full max-w-full flex flex-col md:flex-row text-center md:text-left rounded-lg text-zinc-400 p-4 md:p-6 box-border">
              <div className="bg-slate-400 w-16 h-16 text-center justify-center flex mx-auto md:mx-0 p-2 rounded-full my-auto">
                <b className="bg-slate-600 w-12 h-12 p-2 rounded-full font-extrabold text-5xl text-slate-900">
                  {user?.user.slice(0, 1).toUpperCase() || "X"}
                </b>
              </div>
              <div className="bg-zinc-800 w-1 ml-5"></div>
              <div className="md:ml-5">
                <p className="text-sm my-1">
                  <b className="text-lg">{user?.user || "User Name"}</b>
                </p>
                <p className="text-sm my-1">
                  {user?.email || "usertest@email.com"}
                </p>
                <p className="text-sm my-2">
                  Joined on: {moment(user?.joinedon).format("D MMM YYYY")}
                </p>
                <p className="text-sm my-1">
                  {userUpdates?.city || "city"},{" "}
                  {userUpdates?.region || "region"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
              <div className="bg-zinc-900 text-center p-6 rounded-lg">
                <p className="text-lg font-semibold text-zinc-400">
                  Engage Points
                </p>
                {/*             <p className="text-lg font-bold text-white text-opacity-90 py-1 px-3 bg-gradient-to-r from-purple-900 to-indigo-800 w-fit mx-auto rounded-2xl cursor-none">
                 */}{" "}
                <p
                  className={`text-lg font-bold text-white text-opacity-90 py-1 px-3 w-fit mx-auto rounded-2xl cursor-none bg-opacity-60 ${activePlan.color}`}
                >
                  {userUpdates?.points || 0} EP
                </p>
                <p className="text-sm text-zinc-500">
                  Earned from watching videos
                </p>
              </div>

              <div className="bg-zinc-900 text-center p-6 rounded-lg">
                <p className="text-lg font-semibold text-zinc-400">
                  Active Plan
                </p>
                {/* <p className="text-lg font-extrabold text-opacity-75 px-3 text-transparent bg-clip-text bg-gradient-to-r from-slate-500 to-zinc-500 w-fit mx-auto rounded-2xl">
              Free Plan
            </p> */}
                <div
                  className={`font-bold py-2 px-4 rounded-lg text-gray-200 w-fit mx-auto cursor-pointer bg-opacity-60 ${activePlan.color}`}
                >
                  {userPlan} Plan
                </div>
                <p className="text-sm text-zinc-500">
                  You have {activePlan.cost === 0 && "only"}{" "}
                  {activePlan.duration} watchminutes
                </p>
              </div>
            </div>

            <div className="bg-zinc-900 text-center p-6 pt-1 rounded-lg mt-5">
              <p className="text-lg font-semibold text-zinc-400">
                Plan Selection
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {otherPlans.map((plan) => (
                  <div
                    key={plan.name}
                    className={`rounded-lg p-6 text-center text-stone-300 shadow-lg bg-gradient-to-r bg-opacity-10 ${plan.color}`}
                  >
                    <h3 className={`text-2xl font-bold mb-2 ${plan.text}`}>
                      {plan.name} Plan
                    </h3>
                    <p className="text-sm text-zinc-400 mb-4">
                      {plan.duration} watch minutes per day
                    </p>
                    <p className="text-lg font-bold mb-4">₹{plan.cost}</p>

                    <button
                      onClick={() => handlePayment(plan)}
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
                      {plan.cost > 0 && plan.cost > activePlan.cost
                        ? `Upgrade to ${plan.name}`
                        : `Switch to ${plan.name}`}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900 text-center p-6 rounded-lg mt-5">
              <p className="text-lg font-semibold text-zinc-400">
                More features
              </p>
              <p className="text-sm text-zinc-500">Coming soon...</p>
            </div>
          </div>
        ) : (
          <div className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center">
            <div className="loading">
              <svg width="64px" height="48px">
                <polyline
                  points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
                  id="back"
                />
                <polyline
                  points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
                  id="front"
                />
              </svg>
              {/* <div className="text-red-500 font-semibold animate-pulse duration-300 uppercase">Loading</div> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
