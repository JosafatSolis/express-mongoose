const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
    },
    username: {
        type: String,
        required: true,
        validate: {
            message: "El username ya existe.",
            validator: async (username) => {
                const items = await mongoose.models["User"].count({ username });
                return items < 1;
            },
        },
    },
    email: {
        type: String,
        required: true,
        validate: {
            message: "El email ya existe.",
            validator: async (email) => {
                const items = await mongoose.models["User"].count({ email });
                return items < 1;
            },
        },
    }
});

module.exports = mongoose.model("User", userSchema);