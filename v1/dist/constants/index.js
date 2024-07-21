"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports.response = () => {
    return {
        status: true,
        desc: '',
        httpStatus: 200,
        result: {}
    };
};
module.exports.expiresIn = 2 * 24 * 60 * 60;
module.exports.expiresInMobile = (8 * 30) * 24 * 60 * 60;
module.exports.login_try = {
    max_try: 10,
    inside_at: 600
};
module.exports.errors = require('./errors');
//# sourceMappingURL=index.js.map