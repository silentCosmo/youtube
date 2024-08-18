import React from 'react'
import './SearchList.css'
import { CiSearch } from "react-icons/ci";

function SearchList({setSearchQuery,TitleArray}) {
  return (
    <>
    <div className="Container_SearchList">
        {
            TitleArray.map((title,index)=>{
                return <p key={index} onClick={e=>setSearchQuery(title)} className='titleItem'>
                    <CiSearch/> {title}
                </p>
            })
        }
    </div>
    </>
  )
}

export default SearchList