import React, { useState } from 'react'
import './CreateEditChannel.css'
import { currentUser } from '../../assets/u_db'

function CreateEditChannel({setEditCreateChannelBtn}) {
    const [name,setName] = useState(currentUser?.result.name)
    const [desc,setDesc] = useState(currentUser?.result.desc)
    const handleSubmit = ()=>{
        if(!name){
            alert('Please enter Name!')
            
        }else if(!desc){
            alert('Please enter Description')
        }else{
            setEditCreateChannelBtn(false)
        }
    }
  return (
    <div className="container_CreateEditChanel">
        <input type="submit" name='text' value={'X'} className="ibtn_x" onClick={()=>setEditCreateChannelBtn(false)} />
        <div className="container2_CreateEditChanel">
            <h1>{currentUser?.result?.name?<>Edit</>:<>Create</>} Your Channel</h1>
            <input type="text" placeholder='Enter Your/Channel name' name='text' value={name} onChange={(e)=>setName(e.target.value)} className='ibox' />
            <textarea rows={15} placeholder='Enter channel description' value={desc} onChange={(e)=>setDesc(e.target.value)} className='ibox'></textarea>
            <input type="submit" value="Create" onClick={handleSubmit} className='ibtn' />
        </div>
    </div>
  )
}

export default CreateEditChannel