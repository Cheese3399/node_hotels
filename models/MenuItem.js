const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true,
    },
    taste:{
        type: String,
        enum: ['sweet', 'spicy', 'sour'],
        required: true,
    },
    is_drink:{
        type: Boolean,
        default: true
    },
    ingredients:{
        type: [String],
        default: []
    },
    num_sales:{
        type: Number,
        defaultL: 0
    }
})

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;