import express from 'express'
import { login } from '../Controllers/Auth.js'
import { getAllChannels, updateChannelData } from '../Controllers/Channel.js'
import { pointUpdationController, userDetailsControlller } from '../Controllers/Profile.js'

const routes = express.Router()

routes.post('/login',login)
routes.patch('/update/:id', updateChannelData)
routes.get('/getallchannel', getAllChannels)
routes.patch('/points/update/:id',pointUpdationController)
routes.get('/getuser/:id',userDetailsControlller)

export default routes