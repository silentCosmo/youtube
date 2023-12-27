import { HiOutlineSearch } from "react-icons/hi"; 
import React from 'react'
import "./SearchList.css"

function SearchList({searchListArray,setSearchQuery}) {
  console.log(searchListArray.length);
  return (
    <>
    { searchListArray.length!==0?
    
        <div className="container_searchlist">
          {
            searchListArray.map((li,ind)=>{
              return <p key={ind} className='list_item' onClick={e=>setSearchQuery(li)} ><HiOutlineSearch /> &nbsp; {li}</p>
            })
          }
        </div>
        :
        <></>
    }
    </>
  )
}

export default SearchList