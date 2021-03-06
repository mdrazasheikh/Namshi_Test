'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _request = require('../exceptions/request');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Error handler middleware
 * @param ctx
 * @param next
 * @return {Promise<void>}
 */
const errorHandler = async (ctx, next) => {
    try {
        await next();
        if (ctx.status === 404) {
            ctx.throw(404);
        }
    } catch (err) {
        let statusCode, message, errors;
        if (err instanceof _request.InvalidRequest) {
            statusCode = err.code;
            errors = err.errors;
            message = err.message;
        } else {
            statusCode = err.statusCode || err.status || 500;

            if (err.hasOwnProperty('response')) {
                message = err.response.body;
            } else if (err.hasOwnProperty('message')) {
                message = err.message;
            } else {
                message = 'Something went wrong !!';
            }
        }

        let body = {
            code: statusCode,
            message: message
        };

        if (!_lodash2.default.isEmpty(errors)) {
            body.error = errors;
        }
        ctx.status = statusCode;
        ctx.body = body;
    }
};

exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map