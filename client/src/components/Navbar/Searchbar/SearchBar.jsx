import React, { useState } from 'react'
import './SearchBar.css'
import { MdOutlineMic } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import SearchList from './SearchList';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IoIosArrowRoundBack } from "react-icons/io";

function SearchBar({searchToggle,setSearchToggle}) {
    const [searchQuery,setSearchQuery] = useState("")
    const [searchList,setSearchList] = useState(false)
    //const Ta = useSelector(s=>s.videoReducer).data
    
    const TitleArray = useSelector(state=>state.videoReducer)?.data?.filter(q=>q?.title?.toUpperCase().includes(searchQuery.toUpperCase())).map(m=>m?.title)
    //const TitleArray = ["video","marvel", "animation", "avengers", "iron man" ].filter(q=>q.toUpperCase().includes(searchQuery.toUpperCase()))
  
  return (
    <>
    <div className={`${searchToggle?"SearchBar_Container":"sbc_hidden"} `}>
        <div className="SearchBar_Container2">
            <div className="search_div">
                <div className="searchBar_close lg:hidden" onClick={()=>setSearchToggle(false)} ><IoIosArrowRoundBack size={24} /></div>
                <input type="text" className='iBox_SearchBar' placeholder='Search' onChange={e=>setSearchQuery(e.target.value)} value={searchQuery} onClick={e=>setSearchList(true)} />
                <Link to={searchQuery&&`search/${searchQuery}`} onClick={()=>setSearchList(false)}><CiSearch size={22} className='searchIcon_SearchBar'/></Link>
                <MdOutlineMic size={24} className='Mic_SearchBar'/>
                {searchQuery && searchList && <SearchList setSearchQuery={setSearchQuery} TitleArray={TitleArray} setSearchList={setSearchList} />}
            </div>
        </div>
    </div>
    </>
  )
  
}

export default SearchBar