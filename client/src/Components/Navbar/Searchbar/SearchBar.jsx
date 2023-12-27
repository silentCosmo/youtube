import { ImMic } from "react-icons/im"; 
import { BsSearch } from "react-icons/bs";
import React, { useState } from 'react'
import "./SearchBar.css"
import SearchList from "./SearchList";

function Searchbar() {
  const [searchQuery,setSearchQuery] = useState("");
  const [searchList,setSearchList] = useState(false);
  const searchListArray = ['elon musk','salar movie trailer','silentcosmo','tesla','iguana','mars lander','batman','iron man','marvel'].filter(q=>q.toUpperCase().includes(searchQuery.toUpperCase()));
  return (
    <>
      <div className="searchbar_container">
        <div className="searchbar">
          <div className="search_div">
            <input type="text" placeholder="Search" className='iBox_searchbar' 
              onChange={e=>setSearchQuery(e.target.value)}
              value={searchQuery}
              onClick={e=>setSearchList(true)} />
            <BsSearch  className="search_icon" title="Search"
              onClick={e=>setSearchList(false)} />
            <ImMic className="voice_search"title="Search with your voice" />
            { searchQuery&& searchList &&
              <SearchList searchListArray={searchListArray} setSearchQuery={setSearchQuery}/>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Searchbar