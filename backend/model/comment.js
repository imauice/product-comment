var mongoose = require('mongoose') ;

const commentSchema = new mongoose.Schema({
    productId:{type:String,required:true},
    userId:{type:String,required:true},
    comment:{type:String},
},{
    timestamps:true
});


const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment }
