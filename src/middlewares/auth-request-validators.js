const validateUserAuth = (req, res, next) => {

    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            data: {},
            message: "Something went wrong",
            error: "Email or Password missing in the request",
            success: false
        });
    }

    next();
}

const validateIsAdminRequest = (req, res, next) => {

    if(!req.body.userId){
        return res.status(400).json({
            data: {},
            message: "Something went wrong",
            error: "User id is not given",
            success: false
        });
    }

    next();
}


module.exports = {
    validateUserAuth,
    validateIsAdminRequest
}