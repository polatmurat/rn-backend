interface CustomError extends Error {
    operation: string;
    errorCode: number;
    httpStatus: number;
    date: Date;
};

class CustomErrorBase extends Error implements CustomError {
    operation: string;
    errorCode: number;
    httpStatus: number;
    date: Date;

    constructor(name: string, operation = '', message = '', errorCode: number, httpStatus: number, ...params: any[]) {
        super(...params);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomErrorBase);
        }
        this.name = name;
        this.operation = operation;
        this.errorCode = errorCode;
        this.httpStatus = httpStatus;
        this.message = message;
        this.date = new Date();
    }
};

class Forbidden extends CustomErrorBase {
    constructor(operation = '', message = '', ...params: any[]) {
        super('Forbidden', operation, message, 1, 403, ...params);
    };
};
class UnAuth extends CustomErrorBase {
    constructor(operation = '', message = '', ...params: any[]) {
        super('UnAuth', operation, message, 0, 401, ...params);
    };
};

class Conflict extends CustomErrorBase {
    constructor(operation = '', message = '', ...params: any[]) {
        super('Conflict', operation, message, 7, 409, ...params);
    };
};

class MissingField extends CustomErrorBase {
    constructor(operation = '', message = '', ...params: any[]) {
        super('MissingField', operation, message, 2, 406, ...params);
    };
};

class WrongParam extends CustomErrorBase {
    constructor(operation = '', message = '', ...params: any[]) {
        super('WrongParam', operation, message, 3, 422, ...params);
    };
};

class NotFound extends CustomErrorBase {
    constructor(operation = '', message = '', ...params: any[]) {
        super('NotFound', operation, message, 4, 404, ...params);
    };
};

class ServerError extends CustomErrorBase {
    constructor(operation = '', message = '', ...params: any[]) {
        super('ServerError', operation, message, 5, 500, ...params);
    };
};

class TooMany extends CustomErrorBase {
    constructor(operation = '', message = '', ...params: any[]) {
        super('TooMany', operation, message, 6, 429, ...params);
    };
};

export { Forbidden, MissingField, WrongParam, NotFound, ServerError, UnAuth, TooMany, Conflict };
