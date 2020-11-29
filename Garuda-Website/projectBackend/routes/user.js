const express=require("express");
const router=express.Router();
const {getUserById,getUser,updateUser,userPurchaseList}=require("../controllers/user");
const {isSignedIn,isAdmin,isAuthenticated}=require("../controllers/auth");


router.param("userId",getUserById);

router.put("/user/:userId",isSignedIn,isAuthenticated,updateUser);//user can update his/her profile
router.get("/user/:userId",isSignedIn,isAuthenticated,getUser);//get user with perticular si
router.get("/orders/user/:userId",isSignedIn,isAuthenticated,userPurchaseList);




// router.get("/users",getAllUsers);section8 lection5,6





module.exports=router;