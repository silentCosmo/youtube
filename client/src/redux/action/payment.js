import * as api from '../../api'

export const initiatePayment =(paymentData)=> async(dispatch)=>{
    try {
        const response = api.initiatePayments(paymentData)
        console.log(response);
        return response
    } catch (error) {
        console.log(error);
        
    }
}