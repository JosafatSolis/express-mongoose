const mongoose = require('mongoose');

// Importar un componente:
const { Schema } = mongoose;

// Si se quiere validar el unique, debe ser con un custom validator:
// https://mongoosejs.com/docs/validation.html
// EJEMPLO DE VALIDACIÓN DE UNIQUE:
const restaurantScheema = new Schema({
    name: {
        type: String,
        required: true,
        validate: {
            message: "El nombre ya existe.",
            validator: async (name) => {
                const items = await mongoose.models["Restaurant"].count({ name });
                return items < 1;
            },
        },
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Debe de especificarse un Owner Id."]
    },
    description:{
        type: String,
        required: [true, "Se requiere una descripción"],
        min: 20
    },
    address : {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true,
        min: [10, "La capacidad mínima es de 10"]
    },
    rate: {
        type: Number,
        required: false,
        min:1,
        max:5
    }
});

module.exports = mongoose.model('Restaurant', restaurantScheema);