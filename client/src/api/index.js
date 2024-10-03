import axios from 'axios'

const API = axios.create({baseURL:'http://localhost:5000'})

API.interceptors.request.use((req)=>{
    console.log(localStorage.getItem("Profile"));
    
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
