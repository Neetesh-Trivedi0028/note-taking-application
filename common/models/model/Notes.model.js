const mongoose = require('mongoose'); 
const NotesSchema  = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    tags:{
        type: String,
    }
},{
    timestamps: {
        createdAt: 'created',
        updatedAt: 'updated',
    },
    id: false,
    toJSON: {
        getters: true,
    },
    toObject: {
        getters: true,
    },
})


module.exports =  mongoose.model('Notes', NotesSchema);