const Schema = require('../models/Schemas.js');

const deleteUsers =async(req,res)=>{
    const user = Schema.Users;
    const data = await user.deleteMany({});
    if(data){
        res.status(200)
    }
}

module.exports = {
    deleteUsers,
};