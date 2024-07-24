import express from 'express'
import { productCtrl } from '../controllers/productCtrl.js'

const router=express.Router()


router.route('/products')

.get(productCtrl.getProduct)
.post(productCtrl.createProduct)

router.route('/products/:id')
.delete(productCtrl.deleteProduct)
.put(productCtrl.updateProduct) 


export default router

