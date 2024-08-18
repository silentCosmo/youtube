import React, { useState } from 'react'
import './SearchBar.css'
import { MdOutlineMic, MdSearch } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import SearchList from './SearchList';
import { Link } from 'react-router-dom';

function SearchBar() {
    const [searchQuery,setSearchQuery] = useState("")
    const [searchList,setSearchList] = useState(false)
    const TitleArray = ["video","marvel", "animation", "avengers", "iron man" ].filter(q=>q.toUpperCase().includes(searchQuery.toUpperCase()))
  return (
    <>
    <div className="SearchBar_Container">
        <div className="SearchBar_Container2">
            <div className="search_div">
                <input type="text" className='iBox_SearchBar' placeholder='Search something..' onChange={e=>setSearchQuery(e.target.value)} value={searchQuery} onClick={e=>setSearchList(true)} />
                <Link><CiSearch size={22} className='searchIcon_SearchBar'/></Link>
                <MdOutlineMic size={24} className='Mic_SearchBar'/>
                {searchQuery && searchList && <SearchList setSearchQuery={setSearchQuery} TitleArray={TitleArray} />}
            </div>
        </div>
    </div>
    </>
  )
}

export default SearchBar