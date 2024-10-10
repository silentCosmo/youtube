import axios from 'axios'
import { applyMiddleware } from 'redux';

const API = axios.create({baseURL:'http://localhost:5000'})

API.interceptors.request.use((req)=>{
    //console.log(localStorage.getItem("Profile"));
    
    if(localStorage.getItem("Profile")){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("Profile")).token}`
    }
    return req;
})

export const  login = (authData)=>API.post("/user/login", authData)
export const updateChannelData = (id,updateData)=> API.patch(`/user/update/${id}`,updateData)
export const fetchAllChannel = ()=> API.get("/user/getallchannel")

export const uploadVideo = (fileData,fileOption)=> API.post("/video/upload",fileData,fileOption)
export const getVideos = ()=> API.get("/video/getvideos")
export const videoLikes = (id,like)=> API.patch(`/video/like/${id}`,{like})
export const videoViews = (id)=> API.patch(`/video/views/${id}`)

export const postComment = (commentData)=>API.post('/comment/post',commentData)
export const deleteComment = (id)=>API.delete(`/comment/delete/${id}`)
export const editComment = (id,commentBody)=>API.patch(`/comment/edit/${id}`,{commentBody})
export const getAllComment = ()=> API.get('/comment/get')