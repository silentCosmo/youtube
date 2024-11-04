//const PayU = require("payu");
import PayU from "payu-websdk"
import users from '../Models/Auth.js'

const payuClient = new PayU({
    key: process.env.PAYU_MERCHANT_KEY,
    salt: process.env.PAYU_SALT_KEY
},'TEST')

export const initiatePayment = async(req,res)=>{
    try {
        const paymentData = req.body
        console.log('data',paymentData)
        const response = payuClient.paymentInitiate(paymentData)
        console.log('res',response);
        await users.findByIdAndUpdate(paymentData.udf1,{$set:{payment:'ongoing'}})
        res.status(200).json({response})
    } catch (error) {
        console.log('error',error);
        res.status(500).json({message:error})
    }
}

export const handlePaymentResult = async(req,res)=>{
    const {txnid, udf1, status, productinfo, field9, error_message} = req.body
    console.log(req.body);
    try {
        /* const userData = await users.findById(udf1)
        if(status==='success'){
            await users.findByIdAndUpdate(
                udf1,{
                    payment:'success',
                    plan:productinfo,
                }
            )
            await userData.updateOne({$set:{payment:'success', plan:productinfo}}) 
        }else{
            await userData.updateOne({payment:'failed'})
        } */

        await users.findByIdAndUpdate(udf1,{
            $set:{
                payment:status==='success'?'success':'failed',
                ...(status==='success'&&{plan:productinfo})
            }
        })
        
        return res.redirect(`https://youtubewa.vercel.app/profile/${udf1}`) 
    } catch (error) {
        console.log('error payment',error);
    }
    
}

export const verifyPayment = async(req,res)=>{
    console.log(req);
    
    try {
        const {txnID} = req.params
        const response = await payuClient.verifyPayment(txnID)
        console.log('res',response);
        res.status(200).json({response})
    } catch (error) {
        console.log('error',error);
        res.status(500).json({message:error})
    }
}