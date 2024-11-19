const asyncHandler = require("express-async-handler");
const letter = require("../models/newsletterModel.js");
const { findByIdAndUpdate } = require("../models/doctorDetailsModel");
require("dotenv").config();

const getDetails = async(req,res)=>{
    try{
        const letters = await letter.find();
        res.status(200).json(letters);
    }
    catch(err){
        res.status(500).json({message:"Newsletter doesn't exists"});
    }
}

const postDetails = asyncHandler(async(req,res)=>{
    const{title, author, description, imageUrl} = req.body;

    if(!title, !author, !description, !imageUrl){
        res.status(400);
        throw new Error("Please provide all fields");
    }

    const letterExists = await letter.findOne({title});
    if(letterExists){
        res.status(400).json({message:"User already exists"});
    }

    const newsletter = letter.create({
        title, author, date, description, imageUrl
    })

    res.status(201).json({message:"Newsletter created successfully"});
})

const putDetails = asyncHandler(async(req,res) => {
    const id = req.params;

    const{title, author, date, description, imageUrl} = req.body;

    const updated = await letter.findByIdAndUpdate({id});
    if(!updated)
        return res.status(404).json({message:"User not found"});
    
})

const deleteDetails = asyncHandler(async(req,res)=>{
    const id = req.params.id;

    const del = await letter.findByIdAndDelete(id);

    if(del){
        res.status(200).json({message:"User deleted successfully"});
    }
    else{
        res.status(400).json({message:"User not found"});
    }
})

module.exports = {
    getDetails,
    postDetails,
    putDetails,
    deleteDetails
}