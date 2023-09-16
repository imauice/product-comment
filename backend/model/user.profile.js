var mongoose = require('mongoose') ;

const profileSchema = new mongoose.Schema({
    userId:{type: 'string',required: true},
    name:{type: 'string',required: true},
    avatar:{
        type:{
            id:{type: 'string',required: true},
            url:{type: 'string',required: true}
        }
    }
  });

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile