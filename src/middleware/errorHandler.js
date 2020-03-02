import _ from 'lodash';
import {InvalidRequest} from "../exceptions/request";

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
    }
    catch (err) {
        let statusCode, message, errors;
        if (err instanceof InvalidRequest) {
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

        if (!_.isEmpty(errors)) {
            body.error = errors;
        }
        ctx.status = statusCode;
        ctx.body = body;
    }
};

export default errorHandler;