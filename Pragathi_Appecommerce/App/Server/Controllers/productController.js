import slugify from "slugify";
import productModel from "../Models/productModel.js";
import fs from 'fs'
import categoryModel from "../Models/categoryModel.js";
import braintree from 'braintree'
import orderModel from "../Models/orderModel.js";
import dotenv from 'dotenv'

dotenv.config()


// /payetn gateway

var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAUNTREE_MERCHANT_ID,
    publicKey: process.env.BRAUNTREE_PUBLIC_KEY,
    privateKey: process.env.BRAUNTREE_PRIVATE_KEY,
});
//createProductController

export const createProductController = async (req, res) => {
    const {
        name,
        slug,
        description,
        price,
        category,
        quantity,
        shipping
    } = req.fields;
    const {
        photo
    } = req.files;

    try {
        //validation
        if (!name || !description || !price || !category || !quantity || !photo) {
            return res
                .status(500)
                .send({
                    message: "All the fields are required."
                })
        }

        const product = new productModel({
            ...req.fields,
            slug: slugify(name)
        })
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type
        }

        await product.save();
        return res
            .status(201)
            .send({
                success: true,
                message: "Product created succesfully.",
                product
            })

    } catch (e) {
        console.log(e);
        return res
            .status(500)
            .send({
                success: false,
                e,
                message: "Error in creating product"
            })
    }

}

//getAllProductController

export const getAllProductController = async (req, res) => {
    try {
        const products = await productModel
            .find({})
            .populate('category')
            .select('-photo')
            .limit(12)
            .sort({
                createdAt: -1
            });
        return res
            .status(200)
            .send({
                success: true,
                TotalCount: products.length,
                message: "All Products.",
                products
            })
    } catch (e) {
        console.log(e);
        return res
            .status(500)
            .send({
                success: false,
                e,
                message: "Error in geting all products"
            })
    }

}

// getSingleProductController except photo

export const getSingleProductController = async (req, res) => {

    try {
        const product = await productModel
            .findOne({
                slug: req.params.slug
            })
            .select('-photo')
            .populate('category')
        return res
            .status(200)
            .send({
                success: true,
                message: "single Products.",
                product
            })
    } catch (e) {
        console.log(e);
        return res
            .status(500)
            .send({
                success: false,
                e,
                message: "Error in geting single products"
            })
    }

}

//getProductPhotoController

export const getProductPhotoController = async (req, res) => {

    try {
        const product = await productModel
            .findById(req.params.pid)
            .select("photo")
        if (product.photo.data) {
            res.set('cntent-type', product.photo.contentType)
        }
        return res
            .status(200)
            .send(product.photo.data)
    } catch (e) {
        console.log(e);
        return res
            .status(500)
            .send({
                success: false,
                e,
                message: "Error in geting photo"
            })
    }

}

//deleteProductController

export const deleteProductController = async (req, res) => {
    try {
        const deletedProduct = await productModel
            .findByIdAndDelete(req.params.id)
            .select("-photo");

        if (!deletedProduct) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "Product not found"
                });
        }

        return res
            .status(200)
            .json({
                success: true,
                message: "Deleted Product successfully.",
                product: deletedProduct, // Send the deleted product in the response
            });
    } catch (e) {
        console.log(e);
        return res
            .status(500)
            .json({
                success: false,
                e,
                message: "Error in Deleting Product"
            });
    }
};

// updateProductController

export const updateProductController = async (req, res) => {
    const {
        name,
        slug,
        description,
        price,
        category,
        quantity,
        shipping
    } = req.fields;
    const {
        photo
    } = req.files;

    try {
        //validation
        if (!name || !description || !price || !category || !quantity || (!photo)) {
            return res
                .status(500)
                .send({
                    message: "All the fields are required."
                })
        }

        const product = await productModel.findByIdAndUpdate(req.para.id, {
            ...req.fields,
            slug: slugify(name)
        }, {
            new: true
        })
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type
        }

        await product.save();
        return res
            .status(201)
            .send({
                success: true,
                message: "Product updated succesfully.",
                product
            })

    } catch (e) {
        console.log(e);
        return res
            .status(500)
            .send({
                success: false,
                e,
                message: "Error in updating product"
            })
    }

}

// productFilterController

export const productFilterController = async (req, res) => {
    try {

        const {
            checked,
            radio
        } = req.body;

        let args = {};
        if (checked.length > 0)
            args.category = checked;
        if (radio.length)
            args.price = {
                $gte: radio[0],
                $lte: radio[1]
            };
        const products = await productModel.find(args);
        res
            .status(200)
            .send({
                success: true,
                products
            });
    } catch (e) {
        console.log(e);
        return res
            .status(500)
            .json({
                success: false,
                e,
                message: "Error while filtering Product"
            });
    }
};

// productCountController

export const productCountController = async (req, res) => {
    try {

        const Total = await productModel
            .find({})
            .estimatedDocumentCount();
        res
            .status(200)
            .send({
                success: true,
                Total
            })
    } catch (e) {
        console.log(e);
        return res
            .status(500)
            .json({
                success: false,
                e,
                message: "Error in Product Count"
            });
    }
};

//productListController

export const productListController = async (req, res) => {
    try {

        const perPage = 3;
        const page = req.params.page ?
            req.params.page :
            1;
        const products = await productModel
            .find({})
            .select('-photo')
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({
                createdAt: -1
            })
        res
            .status(200)
            .send({
                success: true,
                products
            })
    } catch (e) {
        console.log(e);
        return res
            .status(500)
            .json({
                success: false,
                e,
                message: "Error in per page ctrl Count"
            });
    }
};

//searchProductController

export const searchProductController = async (req, res) => {
    try {

        const {
            keyword
        } = req.params;
        const result = await productModel.find({
            $or: [{
                name: {
                    $regex: keyword,
                    $option: "i"
                }
            }, {
                description: {
                    $regex: keyword,
                    $option: "i"
                }
            }]
        }).select('-photo');
        res.json(result)
    } catch (e) {
        console.log(e);
        return res
            .status(500)
            .json({
                success: false,
                e,
                message: "Error in searching"
            });
    }
};

// similarProductController

export const similarProductController = async (req, res) => {
    try {
        const {
            pId,
            cId
        } = req.params;
        const products = await productModel.find({
            category: cId,
            _id: {
                $ne: pId
            }
        }).select("-photo").limit(3).populate('category')
        return res
            .status(500)
            .json({
                success: true,
                products
            });

    } catch (e) {
        console.log(e);
        return res
            .status(500)
            .json({
                success: false,
                e,
                message: "Error in gttingsimilar products"
            });
    }
};

// categoriyWiseProductController

export const categoriyWiseProductController = async (req, res) => {
    try {
        const {
            slug
        } = req.params;
        console.log(slug);
        const category = await categoryModel.findOne({
            slug
        })
        const products = await productModel.find({
            category
        }).populate('category')

        return res
            .status(200)
            .send({
                success: true,
                products,
                category
            });

    } catch (e) {
        console.log(e);
        return res
            .status(500)
            .json({
                success: false,
                e,
                message: "Error in gtting  products"
            });
    }
};

// braintreeTokenController

export const braintreeTokenController = async (req, res) => {
    try {
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(response);
            }
        });

    } catch (error) {
        console.log(error);
    }

};

// /braintreePaymentsController

export const braintreePaymentsController = async (req, res) => {

    try {
        const {
            cart,
            nonce,
        } = req.body;
        let total = 0;
        cart.map((item) => {
            total += item[price]
        })

        let newTranscation = gateway.transaction.sale({
            amount:total,
            paymentMethodNonce:nonce,
            options:{
                submitForSettlement:true
            },
            
        },
        function(error, result){
            if(result){
                const order = new orderModel({
                    products:cart,
                    payments:result,
                    buyer:req.user._id,

                }).save();
                res.json({ok:true});
            }else{
                res.status(500).send(error);
            }
            
        }
    )

    } catch (error) {
        console.log(error);
    }

};