import React, { useEffect, useRef } from 'react'
import './Library.css'
import {FaHistory, } from 'react-icons/fa'
import { MdOutlineWatchLater } from 'react-icons/md'
import { AiOutlineLike } from 'react-icons/ai'
import LeftSideBar from '../../components/Leftsidebar/LeftSideBar'
import WHLvideoList from '../../components/WHL/WHLvideoList'
import { useSelector } from 'react-redux'

function Library() {
    const currentUser = useSelector(state=>state.currentUserReducer);
    const liked = useSelector((state)=>state.likedvideoReducer)
    const watchlater = useSelector((state)=>state.watchlaterReducer)
    const history = useSelector(state=>state.historyReducer)
    
    const historyScrollRef = useRef(null);
    const watchLaterScrollRef = useRef(null);
    const likedScrollRef = useRef(null);

    const handleWheelScroll = (scrollContainer) => (event) => {
        if (event.deltaY !== 0) {
            event.preventDefault();
            scrollContainer.scrollLeft += event.deltaY;
        }
    };

    useEffect(() => {
        const historyScrollContainer = historyScrollRef.current;
        const watchLaterScrollContainer = watchLaterScrollRef.current;
        const likedScrollContainer = likedScrollRef.current;

        if (historyScrollContainer) {
            historyScrollContainer.addEventListener('wheel', handleWheelScroll(historyScrollContainer));
        }
        if (watchLaterScrollContainer) {
            watchLaterScrollContainer.addEventListener('wheel', handleWheelScroll(watchLaterScrollContainer));
        }
        if (likedScrollContainer) {
            likedScrollContainer.addEventListener('wheel', handleWheelScroll(likedScrollContainer));
        }

        // Cleanup listeners on component unmount
        return () => {
            if (historyScrollContainer) {
                historyScrollContainer.removeEventListener('wheel', handleWheelScroll(historyScrollContainer));
            }
            if (watchLaterScrollContainer) {
                watchLaterScrollContainer.removeEventListener('wheel', handleWheelScroll(watchLaterScrollContainer));
            }
            if (likedScrollContainer) {
                likedScrollContainer.removeEventListener('wheel', handleWheelScroll(likedScrollContainer));
            }
        };
    }, []);

  return (
    <div className="container_Pages_App">
        <LeftSideBar/>
        <div className="container2_Pages_App">
            <div className="container_libraryPage">
                <h1 className="title_container_LibraryPage">
                    <b><FaHistory/></b>
                    <b>History</b>
                </h1>
                <div className="container_videoList_LibraryPage" ref={historyScrollRef}>
                    <WHLvideoList page={"History"} currentUser={currentUser?.result?._id} videoList={history} />
                </div>
            </div>
            <div className="container_libraryPage">
                <h1 className="title_container_LibraryPage">
                    <b><MdOutlineWatchLater/></b>
                    <b>Watch Later</b>
                </h1>
                <div className="container_videoList_LibraryPage" ref={watchLaterScrollRef}>
                    <WHLvideoList page={"Watch Later"} currentUser={currentUser?.result?._id} videoList={watchlater} />
                </div>
            </div>
            <div className="container_libraryPage">
                <h1 className="title_container_LibraryPage">
                    <b><AiOutlineLike/></b>
                    <b>Liked Videos</b>
                </h1>
                <div className="container_videoList_LibraryPage" ref={likedScrollRef}>
                    <WHLvideoList page={"Liked Videos"} currentUser={currentUser?.result?._id} videoList={liked} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Library