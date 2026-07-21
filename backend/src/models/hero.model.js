import mongoose from "mongoose";

const heroSchema = new mongoose.Schema({
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true,
    },
    eventImg: [
        {
            type: String,
            required: true,
        }
    ]
}, { timestamps: true });

export const Hero = mongoose.model("Hero", heroSchema);