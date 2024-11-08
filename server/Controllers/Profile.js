import mongoose from "mongoose";
import users from '../Models/Auth.js'

export const pointUpdationController = async(req,res)=>{
    const {id:_id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(400).json('No user found with the Id')
    }
    try {
        await users.findByIdAndUpdate(
            _id,{$inc:{points:5}}
        )
        return res.status(200).json('Point updated successfuly')
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}

export const userDetailsControlller = async(req,res)=>{
    const {id:_id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(400).json('User identification failed')
    }
    try {
        const userData = await users.findById(_id)
        //console.log(userData);
        if(userData?.payment!=='inactive'){
            await userData.updateOne({payment:'inactive'})
        }
        return res.status(200).send(userData)
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}

export const watchTimeController = async(req,res)=>{
    const {id,wt} = req.body
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json('user identification failed')
    }
    /* if (typeof wt !== 'number' || wt < 0) {
        return res.status(400).json('Invalid watch time value');
    } */
   const limit = {'Free':300,'Bronze':420,'Silver':600}
    try {
        console.log(wt,':',id);
        //await users.findByIdAndUpdate(id,{$inc:{'plan.watchtime':wt}})
        /* const userPlan = await users.findByIdAndUpdate(
            id,{$inc:{'plan.watchTime':-wt}},
            {new:true, fields:{plan:1}}
        ) */
       const planUpdate = await users.findById(id).select('plan')
       const userPlan = planUpdate.plan
       const reminingWatchTime = userPlan.watchTime - wt
       const currentDate = new Date()
        console.log('ok',activePlan);

        if(reminingWatchTime<=0){
            if(!userPlan.resetDate){
                userPlan.watchTime = 0
                userPlan.resetDate = new Date(currentDate.getTime() + 24*60*60*1000)
                console.log('limit reached');
                
            }else if(userPlan.resetDate<=currentDate){
                userPlan.resetDate = null
                userPlan.watchTime = limit[userPlan.tier]
                console.log('limit reseted');
            }
            await planUpdate.save()
            return res.status(200).json({message:'watch time exceeded'})
        }else{
            userPlan.watchTime = reminingWatchTime
            await planUpdate.save()
            return res.status(200).json({message:'watch time updated',data:userPlan})
        }

    } catch (error) {
        console.log(error);
        
        res.status(400).json({message:'watch time updation error', error:error.message})
    }
}