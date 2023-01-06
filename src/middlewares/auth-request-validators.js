const validateUserAuth = (req, res, next) => {

    if(!req.body.email || !req.body.password){
        res.status(400).json({
            data: {},
            message: "Something went wrong",
            error: "Email or Password missing in the request",
            success: false
        });
    }

    next();
}

module.exports = {
    validateUserAuth
}