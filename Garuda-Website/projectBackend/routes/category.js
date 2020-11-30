const express=require("express");//l2
const router=express.Router();//l2

const {getCategoryById,createCategory,getAllCategory,getCategory,updateCategory,removeCategory}=require("../controllers/category");//l2
const {isSignedIn,isAuthenticated,isAdmin}=require("../controllers/auth");//l2
const {getUserById}=require("../controllers/user");//l2


//params
router.param("userId",getUserById);//l2
router.param("categoryId",getCategoryById);//l2


//actual routes goes here

//CREATE
router.post("/category/create/:userId",
isSignedIn,
isAuthenticated,
isAdmin,
createCategory);//l3

//READ
router.get("/category/:categoryId",getCategory);//l4
router.get("/categories",getAllCategory);//l4

//UPDATE
router.put("/category/:categoryId/:userId",//l5
isSignedIn,
isAuthenticated,
isAdmin,
updateCategory)

//DELETE
router.delete("/category/:categoryId/:userId",isSignedIn,//l6
isAuthenticated,
isAdmin,
removeCategory)



module.exports=router;