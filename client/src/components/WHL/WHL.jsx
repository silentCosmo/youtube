import React, { useEffect, useState } from "react";
import "./WHL.css";
import LeftSideBar from "../Leftsidebar/LeftSideBar";
import WHLvideoList from "./WHLvideoList";
import { useDispatch, useSelector } from "react-redux";
import { clearHistory } from "../../redux/action/history";
import ConfirmModal from "./ConfirmModal";
import { useNavigate } from "react-router-dom";

function WHL({ page, videoList }) {
  const currentUser = useSelector((state) => state.currentUserReducer);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noHistory, setNoHistory] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteHistory = () => {
    if (currentUser) {
      if (noHistory) {
        navigate("/");
      } else {
        dispatch(
          clearHistory({
            uId: currentUser?.result?._id,
          })
        );
      }
      setIsModalOpen(false);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    isHistoryEmpty();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const isHistoryEmpty = () => {
    if (videoList && currentUser) {
      const currentUserId = currentUser?.result?._id;
      const hasAnyMatch = videoList?.data?.some(
        (video) => video.viewer === currentUserId
      );
      if (hasAnyMatch) {
        setNoHistory(false);
      } else {
        setNoHistory(true);
      }
    }
  };
  useEffect(()=>{isHistoryEmpty() //eslint-disable-next-line
    },[videoList,currentUser])
  return (
    <div className="container_Pages_App">
      <LeftSideBar />
      <div className="container2_Pages_App">
        <div className="container_whl">
          <div className="box_WHL leftside_whl">
            <b>{noHistory?`You dont have any ${page}`:`Your Watch ${page} Shown Here`} </b>
            {page === "History" && currentUser &&(
              <div
                className="clear_History_btn"
                onClick={() => handleOpenModal()}
              >
                Clear History
              </div>
            )}
          </div>
          <div className="rightSide_whl">
            <h1>{page} {noHistory?'is empty':''} </h1>
            <div className="whl_list">
              <WHLvideoList
                page={page}
                currentUser={currentUser?.result?._id}
                videoList={videoList}
              />
            </div>
          </div>
        </div>
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleDeleteHistory}
        noHistory={noHistory}
        page={page}
      />
    </div>
  );
}

export default WHL;
