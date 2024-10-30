import axios from 'axios'

/* const API = axios.create({baseURL:'http://localhost:5000'}) */
/* const API = axios.create({baseURL:'https://youtube-0xsa.onrender.com'}) */
const API = axios.create({baseURL:'https://youtube.koyeb.app'})

API.interceptors.request.use((req)=>{
    
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
export const deleteVideo = (id)=> API.delete(`/video/delete/${id}`)

export const postComment = (commentData)=>API.post('/comment/post',commentData)
export const deleteComment = (id)=>API.delete(`/comment/delete/${id}`)
export const editComment = (id,commentBody)=>API.patch(`/comment/edit/${id}`,{commentBody})
export const getAllComment = ()=> API.get('/comment/get')
export const commentLikes = (id,like,uid)=> API.patch(`/comment/like/${id}`,{like,uid})

export const addHistory = (historyData)=> API.post("video/history/push",historyData)
export const getHistory = ()=> API.get("video/history/get")
export const delHistory = (uId)=> API.delete(`video/history/delete/${uId}`)

export const addLikedvideo = (likedvideoData)=> API.post("/video/liked",likedvideoData)
export const getLikedvideo =()=> API.get("video/liked/get")
export const deleteLikedvideo = (vid,viewer)=> API.delete(`/video/liked/remove/${vid}/${viewer}`)

export const addWatchlater = (watchlaterData)=> API.post("video/watchlater",watchlaterData)
export const getWatchlater =()=> API.get("/video/watchlater/get")
export const deleteWatchlater = (vid,viewer) => API.delete(`/video/watchlater/remove/${vid}/${viewer}`)

export const updatePoint =(id)=> API.patch(`/user/points/update/${id}`)
export const getUserDetails =(id)=> API.get(`/user/getuser/${id}`)