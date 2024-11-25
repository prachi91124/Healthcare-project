const { constants } = require("../constants");
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            return res.status(statusCode).json({
                title: "Validation Failed",
                message: err.message,
                stackTrace: err.stack
            });

        case constants.NOT_FOUND:
            return res.status(statusCode).json({
                title: "Not found",
                message: err.message,
                stackTrace: err.stack
            });
        case constants.UNAUTHORIZED:
            return res.status(statusCode).json({
                title: "Unauthorized",
                message: err.message,
                stackTrace: err.stack
            });
        case constants.SERVER_ERROR:
            return res.status(statusCode).json({
                title: "Server Error",
                message: err.message,
                stackTrace: err.stack
            });

        default:
            console.log("No error, all good!");
            return res.status(500).json({
                title: "Internal Server Error",
                message: "Something went wrong, Please try agan later...",
                stackTrace: err.stack
            })
    }
};
module.exports = errorHandler;