class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
    }
}

export const CustomNotFoundError = (msg) => new CustomError(msg, 404);
export const CustomConflictError = (msg) => new CustomError(msg, 409);
export default CustomError;