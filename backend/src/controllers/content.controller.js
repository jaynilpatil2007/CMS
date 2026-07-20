import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import { Navbar } from "../models/navbar.model.js"
import { Hero } from "../models/hero.model.js";

export const getNavbar = asyncHandler(async (req, res) => {
    const navbar = await Navbar.findOne();

    if (!navbar) {
        throw new ApiError(404, "Navbar not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            navbar,
            "Navbar fetched successfully"
        )
    );
})

export const getHero = asyncHandler(async (req, res) => {
    const hero = await Hero.findOne();

    if (!hero) {
        throw new ApiError(404, "Hero not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            hero,
            "Hero fetched successfully"
        )
    );
})      