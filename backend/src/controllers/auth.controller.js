import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Admin } from "../models/admin.model.js";

const generateAccessRefreshToken = async function (userId) {
    try {
        const admin = await Admin.findById(userId);
        const refreshToken = await admin.generateRefreshToken();
        const accessToken = await admin.generateAccessToken();

        admin.refreshToken = refreshToken;
        await admin.save({ validateBeforeSave: false })

        return { refreshToken, accessToken };
    } catch (error) {
        throw new ApiError(400, "Something went wrong while generating tokens");
    }
}

export const signup = asyncHandler(async (req, res) => {
    const { adminId, password } = req.body;
    if (!adminId || !password) throw new ApiError(400, "Fill all required credentials!");

    const existedAdmin = await Admin.findOne({ adminId });
    if (existedAdmin) throw new ApiError(400, "Admin is already registered");

    const admin = await Admin.create({
        adminId,
        password
    });

    const createdAdmin = await Admin.findById(admin._id).select("-password -refreshToken");
    if (!createdAdmin) throw new ApiError(500, "Error while creating a new admin");

    return res.status(200).json(
        new ApiResponse(200, createdAdmin, "Admin SignUp successfully")
    );
});

export const login = asyncHandler(async (req, res) => {
    const { adminId, password } = req.body;
    if (!adminId || !password) throw new ApiError(400, "Fill all required credentials");

    const admin = await Admin.findOne({ adminId });
    if (!admin) throw new ApiError(400, "User does not exist");

    const isPasswordValid = await admin.isPasswordCorrect(password);
    if (!isPasswordValid) throw new ApiError(400, "Password is not correct");

    const { refreshToken, accessToken } = await generateAccessRefreshToken(admin._id);

    const loggedInUser = await Admin.findById(admin._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: false,
    }

    return res.status(200)
        .cookie("accessToken", accessToken)
        .cookie("refreshToken", refreshToken)
        .json(
            new ApiResponse(200, loggedInUser, "Login successfully")
        );
});

export const logout = asyncHandler(async (req, res) => {
    await Admin.findByIdAndUpdate(
        req.user._id,
        {
            $set: { refreshToken: undefined }
        },
        {
            new: true,
        }
    );

    const options = {
        httpOnly: true,
        secure: false,
    }

    return
    res.status(200)
        .clearcokkie("accessToken")
        .clearcokkie("refreshToken")
        .json(
            new ApiResponse(200, {}, "Logged out successfully")
        );
})

export const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if (!incomingRefreshToken) throw new ApiError(401, "unauthorized request");

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id);
        if (!user) throw new ApiError(401, "Invalid refresh token");

        if (incomingRefreshToken !== user?.refreshToken) throw new ApiError(401, "Refresh Token is expired or used");

        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, newrefreshToken } = await generateAccessAndRefreshTokens(user._id);

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newrefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: newrefreshToken },
                    "Access Token refreshed"
                )
            )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token");
    }
})