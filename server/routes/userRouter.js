
import {userCtrl} from '../controllers/userCtrl.js'
import {auth} from '../middleware/auth.js'
import express from 'express'

const router = express.Router()


router.post('/register',userCtrl.register)

router.post('/login',userCtrl.login)

router.get('/logout',userCtrl.logout)

router.get('/refresh_token',userCtrl.refreshtoken)

router.get('/infor',auth,userCtrl.getUser)
 

export default router