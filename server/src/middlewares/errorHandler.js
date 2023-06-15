const errorHandlerMiddleware = (err, req, res, next) => {
    if(err instanceof Error){
        err.status = 500;
        console.log(err.stack);
        return res.status(err.status).json({ msg: err.message, stack: err.stack });
    }
    return res.status(500).json({ msg: 'Something went wrong, please try again later' });
}

module.exports = errorHandlerMiddleware;