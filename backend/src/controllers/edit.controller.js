import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadCloudinary } from "../utils/cloudinary.js";

import { Navbar } from "../models/navbar.model.js";
import { Hero } from "../models/hero.model.js";

export const navbarEdit = asyncHandler(async (req, res) => {
    const { LogoImg, headings, buttonText } = req.body;

    const updatedData = {};

    if (LogoImg !== undefined) {
        updatedData.LogoImg = LogoImg;
    }

    if (headings !== undefined) {
        updatedData.headings = headings;
    }

    if (buttonText !== undefined) {
        updatedData.buttonText = buttonText;
    }

    if (Object.keys(updatedData).length === 0) {
        throw new ApiError(400, "No fields provided for update");
    }

    const navbar = await Navbar.findOneAndUpdate(
        { admin: req.user._id },
        {
            $set: updatedData
        },
        {
            new: true,
            runValidators: true,
        }
    );

    if (!navbar) {
        throw new ApiError(404, "navbar not found");
    }

    return res.status(200)
        .json(
            new ApiResponse(200, navbar, "Edit Successfully")
        )
});

export const heroEdit = asyncHandler(async (req, res) => {
    const heroImagePath = req.file?.path;
    if (!heroImagePath) throw new ApiError(404, "image is required");

    const uploadImage = await uploadCloudinary(heroImagePath);
    if (!uploadImage) throw new ApiError(500, "Cloudinary upload failed");

    const hero = await Hero.findOneAndUpdate(
        {
            admin: req.user._id,
        },
        {
            $push: {
                eventImg: uploadImage.secure_url,
            }
        },
        {
            new: true,
            runValidators: true,
        }
    )

    return res.status(200)
        .json(
            new ApiResponse(200, hero, "Hero image upload successfully")
        )
});