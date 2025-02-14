const errorHandler = (err, req, res, next) => {
    const timeStamp = new Date().toISOString();
    console.log(`[${timeStamp}] [${err.stack}]`);
    res.status(err.status || 500).json({
        status: err.status || 500,
        message: err.message || "Internal Server Error"
    });
}

const routeNotFound = (req, res) => {
    res.status(404).json({
        status: 404,
        message: "Route Not Found"
    })
}
module.exports = {
    errorHandler,
    routeNotFound
}