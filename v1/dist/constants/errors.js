"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
class CustomErrorBase extends Error {
    constructor(name, operation = '', message = '', errorCode, httpStatus, ...params) {
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
}
;
class Forbidden extends CustomErrorBase {
    constructor(operation = '', message = '', ...params) {
        super('Forbidden', operation, message, 1, 403, ...params);
    }
    ;
}
;
class UnAuth extends CustomErrorBase {
    constructor(operation = '', message = '', ...params) {
        super('UnAuth', operation, message, 0, 401, ...params);
    }
    ;
}
;
class Conflict extends CustomErrorBase {
    constructor(operation = '', message = '', ...params) {
        super('Conflict', operation, message, 7, 409, ...params);
    }
    ;
}
;
class MissingField extends CustomErrorBase {
    constructor(operation = '', message = '', ...params) {
        super('MissingField', operation, message, 2, 406, ...params);
    }
    ;
}
;
class WrongParam extends CustomErrorBase {
    constructor(operation = '', message = '', ...params) {
        super('WrongParam', operation, message, 3, 422, ...params);
    }
    ;
}
;
class NotFound extends CustomErrorBase {
    constructor(operation = '', message = '', ...params) {
        super('NotFound', operation, message, 4, 404, ...params);
    }
    ;
}
;
class ServerError extends CustomErrorBase {
    constructor(operation = '', message = '', ...params) {
        super('ServerError', operation, message, 5, 500, ...params);
    }
    ;
}
;
class TooMany extends CustomErrorBase {
    constructor(operation = '', message = '', ...params) {
        super('TooMany', operation, message, 6, 429, ...params);
    }
    ;
}
;
module.exports = { Forbidden, MissingField, WrongParam, NotFound, ServerError, UnAuth, TooMany, Conflict };
//# sourceMappingURL=errors.js.map