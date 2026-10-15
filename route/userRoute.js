import express from "express"
import AuthanticateToken from '../utils/authmiddleware.js'
import {addUser,getUser,getSingleUser,deleteUSer,login,updateUser} from "../controller/userDataController.js"

const router = express.Router()

router.post('/api/add-user',addUser)
router.get('/api/get-user',AuthanticateToken,getUser)
router.get('/api/get-singleuser/:uid',AuthanticateToken,getSingleUser)
router.delete('/api/delete-user/:uid',AuthanticateToken,deleteUSer)
router.put('/api/update-user/:uid',AuthanticateToken,updateUser)
router.get('/api/login',login)


export default router