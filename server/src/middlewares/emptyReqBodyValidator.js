const emptyReqBodyValidator = (req, res, next) => {    
    if (!req.body || Object.keys(req.body).length === 0) {        
        throw new Error("Empty request body");
    }
    next();
}

module.exports = emptyReqBodyValidator;