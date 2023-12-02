import slugify from "slugify";
import categoryModel from "../Models/categoryModel.js";

export const createCategoryController = async(req, res) => {

    try {

        const {name} = req.body;
        if (!name) {
            return res
                .status(401)
                .send({ message: "Name is required."})
        }

        const existingCategory = await categoryModel.findOne({name});
        if(existingCategory){
            return res
            .status(200)
            .send({success:true, message: "Category Already exist."})
        }

        const category = await new categoryModel({name,slug:slugify(name)}).save();
        return res
        .status(201)
        .send({success:true, message: "new Category Created.",category})
    } catch (e) {
        console.log(e);
        return res
            .status(500)
            .send({success: false, e, message: "Error in Category"})
    }

}

//
export const updateCategoryController = async(req, res) => {

    try {

        const {name} = req.body;
        const {id} = req.params;

        const category = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        return res
        .status(200)
        .send({success:true, message: " Category updated succesfully.",category})
    } catch (e) {
        console.log(e);
        return res
            .status(500)
            .send({success: false, e, message: "Error while updating Category"})
    }

}

//getAllCategoryController

export const getAllCategoryController = async(req, res) => {

    try {
 

        const category = await categoryModel.find({})
        return res
        .status(200)
        .send({success:true, message: " All Category List.",category})
    } catch (e) {
        console.log(e);
        return res
            .status(500)
            .send({success: false, e, message: "Error while getting all the Categories"})
    }

}

//singleCategoryController

export const singleCategoryController = async(req, res) => {

    try { 
        const {id} = req.params;

        const category = await categoryModel.findOne({slug:req.params.slug})
        return res
        .status(200)
        .send({success:true, message: " single  Category succesfully.",category})
    } catch (e) {
        console.log(e);
        return res
            .status(500)
            .send({success: false, e, message: "Error while getting single"})
    }

}

// deleteCategoryController

export const deleteCategoryController = async(req, res) => {

    try { 
        const {id} = req.params;

        await categoryModel.findByIdAndDelete(id)

        return res
        .status(200)
        .send({success:true, message: "   Category deleted  succesfully."})
    } catch (e) {
        console.log(e);
        return res
            .status(500)
            .send({success: false, e, message: "Error while deleting category"})
    }

}