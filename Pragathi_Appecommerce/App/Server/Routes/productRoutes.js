import express from "express";
import formidable from "express-formidable";
import {isAdmin, requireSignIn} from "../middleware/authMiddleware.js";
import {
    createProductController,
    getAllProductController,
    productFilterController,
    productListController,
    getSingleProductController,
    getProductPhotoController,
    deleteProductController,
    updateProductController,
    productCountController,
    searchProductController,
    similarProductController,
    categoriyWiseProductController,
    braintreeTokenController,
    braintreePaymentsController
    
} from "../Controllers/productController.js";
const router = express.Router();

//routings

router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);

//
router.get('/get-all-products',  getAllProductController);

// single product except photo
router.get('/get-product/:slug', requireSignIn, isAdmin, getSingleProductController);
//get photo

router.get('/product-photo/:pid', getProductPhotoController);
//
router.delete('/delete-product/:id', requireSignIn, isAdmin, deleteProductController);

//filter routes
router.post('/product-filter',  productFilterController);

//productcountes routes
router.get('/product-count',  productCountController);

//product per page
router.get('/product-list/:page',  productListController)

router.put('/update-product/:id', requireSignIn, isAdmin, formidable(), updateProductController);

//Search product routes
router.get('/sreach/:keyword', requireSignIn, searchProductController);


//Similar product routes
router.get('/related-product/:pId/:cId', requireSignIn, similarProductController);


//Similar product routes
router.get('/product-category/:slug', categoriyWiseProductController);

// payments route
//token
router.get('/braintree/token',braintreeTokenController)

//payments
router.post('/braintree/payment',braintreePaymentsController)
export default router;