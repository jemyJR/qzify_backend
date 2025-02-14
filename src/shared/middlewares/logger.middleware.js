const loggerMiddleware = (req, res, next) => {
    const timeStamp = new Date().toISOString();
    console.log(`[Request Log] [${timeStamp}] [${req.method}] [${JSON.stringify(req.body)}]`)
    next();
}
const responseLogger = (req, res, next) => {
    const timeStamp = new Date().toISOString();
    const ogSend = res.send;
    res.send = function (resBody) {
        console.log(`[Response Log] [${timeStamp}] [${req.method}] [${res.statusCode}]`)
        console.log(`[Response Log] ${resBody}`)
        return ogSend.call(this, resBody)
    }
    next();
}

module.exports = {
    loggerMiddleware,
    responseLogger
}