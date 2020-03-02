import _ from 'lodash';

/**
 * Invalid Request Exception
 * @param message
 * @param errors
 * @constructor
 */
export function InvalidRequest(message, errors = null) {
    this.message = !_.isEmpty(message) ? message : 'Invalid Request Parameters';
    this.name = 'Invalid Request';
    this.code = 400;
    if (!_.isEmpty(errors)) {
        this.errors = errors;
    }
}