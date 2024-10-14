import React, { useState } from 'react'
import './CreateEditChannel.css'
import { useDispatch, useSelector } from 'react-redux';
import {updateChannelData} from '../../redux/action/channeluser'
import { login } from '../../redux/action/auth';

function CreateEditChannel({setEditCreateChannelBtn}) {
    const dispatch = useDispatch()
    const currentUser = useSelector(state=>state.currentUserReducer);
    const [name,setName] = useState(currentUser?.result.name)
    const [desc,setDesc] = useState(currentUser?.result.desc)
    const handleSubmit = ()=>{
        if(!name){
            alert('Please enter Name!')
            
        }else if(!desc){
            alert('Please enter Description')
        }else{
            dispatch(updateChannelData(currentUser?.result._id,{name:name,desc:desc}))
            setEditCreateChannelBtn(false)
            setTimeout(()=>{
                dispatch(login({email:currentUser.result.email}))
            },5000)
        }
    }
  return (
    <div className="container_CreateEditChanel">
        <div className="container2_CreateEditChanel">
            <h1>{currentUser?.result?.name?<>Edit</>:<>Create</>} Your Channel</h1>
            <input type="submit" name='text' value='X' id="ibtn_x" onClick={()=>setEditCreateChannelBtn(false)} />
            <hr className="hr" />
            <input type="text" placeholder='Enter Your/Channel name' name='text' value={name} onChange={(e)=>setName(e.target.value)} className='ibox' />
            <textarea rows={10} placeholder='Enter channel description' value={desc} onChange={(e)=>setDesc(e.target.value)} className='ibox'></textarea>
            <input type="submit" value="Create" onClick={handleSubmit} id='ibtn' />
        </div>
    </div>
  )
}

export default CreateEditChannel