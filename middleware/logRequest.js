export const logRequestBody = (req, res, next) => {
    console.log(req.body); 
    next();
};
