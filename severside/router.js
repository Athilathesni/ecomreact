import { Router } from "express";
import Auth from './middle/Auth.js';

import * as rh from './requesthandler.js'

const router=Router();
router.route('/adduser').post(rh.addUser)
router.route('/login').post(rh.login)
router.route('/verify').post(rh.verifyEmail)
router.route("/passchange").put(rh.passchange)
router.route("/home").get(rh.homepage)
router.route("/addproduct").post(Auth,rh.addproduct)
router.route("/navdata").get(Auth,rh.navdata)
router.route("/companyadd").post(Auth,rh.sellerdata)
router.route("/companydetails").get(Auth,rh.displaycompany)
router.route("/categories").get(Auth,rh.categories)
router.route("/buyer").get(Auth,rh.buyerdetails)
router.route("/editbuyer").put(Auth,rh.editbuyer)
router.route("/address").post(Auth,rh.addAddress)
router.route("/displayaddress").get(Auth,rh.displayaddress)
router.route("/deleteaddress/:id").delete(rh.deleteAddress)
export default router