import express from "express"; 
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import {deleteCategoryController,createCategoryController,updateCategoryController,getAllCategoryController,singleCategoryController} from '../Controllers/categoryController.js'
// router object

const router = express.Router();

//routings

//REGISTER 
router.post('/create-category',requireSignIn,isAdmin,createCategoryController);


router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController);

router.get('/get-all-category',getAllCategoryController);

router.get('/single-category/:slug',singleCategoryController);

router.delete('/delete-category/:id',requireSignIn,isAdmin,deleteCategoryController);
export default router;