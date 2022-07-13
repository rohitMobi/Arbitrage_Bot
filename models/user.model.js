const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:{ type: String },
    email:{ type: String, required: true, unique: [true, "Email is already exits"] },
    password:{ type: String, required: true },
    role:{ type: String, required: true },
    mobile:{ type: Number, required: true, unique: [true, "Email is already exits"] }
}, { timestamps: true });

module.exports = mongoose.model("users", UserSchema);