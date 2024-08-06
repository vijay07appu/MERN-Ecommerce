import express from 'express'

import { razorCtrl } from '../controllers/razorCtrl.js'

const router = express.Router()

router.get('/create-order',razorCtrl.createorder)


export default router