import React from 'react'
import './SearchList.css'
import { CiSearch } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

function SearchList({setSearchQuery,TitleArray,setSearchList}) {
  const navigate = useNavigate()
  const handleClick = (title)=>{
    setSearchQuery(title)
    setSearchList(false)
    navigate(`search/${title}`)
  }
  return (
    <>
    <div className="Container_SearchList">
        {
            TitleArray?.map((title,index)=>{
                return <p key={index} onClick={e=>handleClick(title)} className='titleItem'>
                    <CiSearch/> {title.slice(0,42)}
                </p>
            })
        }
    </div>
    </>
  )
}

export default SearchList