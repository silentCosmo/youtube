import express from 'express'
import auth from '../Middleware/Auth.js'
import { handlePaymentResult, initiatePayment} from '../Controllers/PaymentController.js'

const routes = express.Router()

routes.post('/initiate',auth,initiatePayment)
routes.post('/result',handlePaymentResult)

export default routes;