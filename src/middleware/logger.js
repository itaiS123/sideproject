export const requestLogger = (req, res, next) => {
    const time = new Date().toLocaleTimeString();
    console.log(`[${time}] ${req.method} request to ${req.url}`);
    next();
};