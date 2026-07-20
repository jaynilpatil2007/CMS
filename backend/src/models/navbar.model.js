import mongoose from "mongoose";

const navbarSchema = new mongoose.Schema({
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true,
    },
    LogoImg: {
        type: String,
    },
    headings: [
        {
            type: String,
        }
    ],
    buttonText: {
        type: String,
    }
}, { timestamps: true });

export const Navbar = mongoose.model("Navbar", navbarSchema); 