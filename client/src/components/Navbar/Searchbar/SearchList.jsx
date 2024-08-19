import React from 'react'
import './SearchList.css'
import { CiSearch } from "react-icons/ci";

function SearchList({setSearchQuery,TitleArray,setSearchList}) {
  const handleClick = (title)=>{
    setSearchQuery(title)
    setSearchList(false)
  }
  return (
    <>
    <div className="Container_SearchList">
        {
            TitleArray.map((title,index)=>{
                return <p key={index} onClick={e=>handleClick(title)} className='titleItem'>
                    <CiSearch/> {title}
                </p>
            })
        }
    </div>
    </>
  )
}

export default SearchList