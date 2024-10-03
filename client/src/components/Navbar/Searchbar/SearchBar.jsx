import React, { useState } from 'react'
import './SearchBar.css'
import { MdOutlineMic, MdSearch } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import SearchList from './SearchList';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function SearchBar() {
    const [searchQuery,setSearchQuery] = useState("")
    const [searchList,setSearchList] = useState(false)
    const Ta = useSelector(s=>s.videoReducer).data
    console.log(Ta);
    
    const TitleArray = useSelector(state=>state.videoReducer)?.data?.filter(q=>q?.title?.toUpperCase().includes(searchQuery.toUpperCase())).map(m=>m?.title)
    //const TitleArray = ["video","marvel", "animation", "avengers", "iron man" ].filter(q=>q.toUpperCase().includes(searchQuery.toUpperCase()))
  return (
    <>
    <div className="SearchBar_Container">
        <div className="SearchBar_Container2">
            <div className="search_div">
                <input type="text" className='iBox_SearchBar' placeholder='Search something..' onChange={e=>setSearchQuery(e.target.value)} value={searchQuery} onClick={e=>setSearchList(true)} />
                <Link to={`search/${searchQuery}`}><CiSearch size={22} className='searchIcon_SearchBar'/></Link>
                <MdOutlineMic size={24} className='Mic_SearchBar'/>
                {searchQuery && searchList && <SearchList setSearchQuery={setSearchQuery} TitleArray={TitleArray} setSearchList={setSearchList} />}
            </div>
        </div>
    </div>
    </>
  )
}

export default SearchBar