import userData from '../model/user.js'
import bcrypt from 'bcrypt'
//import 
export const addUser = async (req,res) => {
    try {
       const password =await bcrypt.hash(req.body.password,10)
       const userDataval = {
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            address:req.body.address,
            password:password
       }
       const saveUSerData = await userData.create(userDataval)
        res.status(200).json({message:"user added successflly",data:saveUSerData})
    }catch(error) {
        res.status(500).json({errorMessage:error.message})
    }
}

export const getUser = async (req,res) => {
    try {
        const getuserData = await userData.find()
        res.status(200).json({message:"user get successfulyy",data:getuserData})
    } catch(error) {
        res.status(500).json({errorMessage:error.message})
    }

}

export const getSingleUser = async (req,res) =>{
    try{
        const id = req.params.uid
        const getsingleUserdata = await userData.findById(id)
        res.status(200).json({message:"user get successfully",data:getsingleUserdata})

    }catch(error) {
        res.status(500).json({errorMessage:error.message})
    }
}

export const deleteUSer = async (req,res) => {
    try{
        const id = req.params.uid
        const deleteuserData = await userData.findByIdAndDelete(id)
        res.status(200).json({message:"user deleted successfully",data:deleteuserData})

    }catch(error) {
        res.status(500).json({errorMessage:error.message})
    }
}

export const updateUser=async(req,res)=>{
    try{
        const id=req.params.uid
        const userDataval={
            name:req.body.name,
            email:req.body.email,
            address:req.body.address,
            phone:req.body.phone,
        }
        const updateUSerData=await userData.findByIdAndUpdate(id,userDataVal,{
            new:true,
            runValidators:true
        })
        res.status(200).json({message:"userData updated successfully",data:updateUSerData})
    }catch(error){
        console.log(error.message)

    }
}

export const login=async(req,res)=>{
    try{
        const uData=await userData.findOne({email:req.body.email})
        if(!uData){
            return res.status(200).json({message:"User Not Found",status:0})
        }
        console.log(req.body.password)
        console.log(uData.password)
        const passwordMatch=await bcrypt.compare(req.body.password,uData.password)
        if(passwordMatch){
            res.status(200).json({message:"login successfully",status:1,data:uData})
        }
        res.status(200).json({message:"password not match",status:0 })

    }catch(error) {
        res.status(500).json({errorMessage:error.message})
    }
}


