const User = require('../model/UserModel');

const admin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        if(user && user.isAdmin) {
            next();
        }

        return res.status(404).json({success : false, message : 'Not authorized as an admin'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success : false, message : "Error server"});
    }
};
 
module.exports = admin;