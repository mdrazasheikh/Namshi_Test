import _ from 'lodash';
import Error from "../data/error";
import {InvalidRequest} from "../exceptions/request";

/**
 * Validate the request parameter
 * @param request
 * @param requiredKeys
 */
export const validateRequest = (request, requiredKeys = []) => {
    if (_.isEmpty(requiredKeys) || !Array.isArray(requiredKeys)) {
        return true;
    }

    let error = new Error();

    for (let key of requiredKeys) {
        if (_.isEmpty(key)) {
            continue;
        }
        if (key.match(/[a-zA-Z0-9]+\.[a-zA-Z0-9]+/)) {
            let keyPieces = key.split('.');
            if (_.isEmpty(keyPieces[0]) || _.isEmpty(keyPieces[1])) {
                error.set('Invalid Key', key);
            }
            if (keyPieces.length > 2) {
                error.set('3 level nesting is not supported', key);
            }
            if (!request.hasOwnProperty(keyPieces[0]) || !request[keyPieces[0]].hasOwnProperty(keyPieces[1]) || _.isEmpty(request[keyPieces[0]][keyPieces[1]])) {
                error.set(`"${key}" cannot be empty`, key);
            }
        } else {
            if (_.isEmpty(request[key])) {
                error.set(`"${key}" cannot be empty`, key);
            }
        }
    }

    if (error.count) {
        throw new InvalidRequest(`Please check the details and try again`, error.get());
    }
};

/**
 * Validate transfer Request params
 * @param request
 * @param requiredFields
 */
export const validateTransferRequest = (request, requiredFields = ['from', 'to', 'amount']) => {
    validateRequest(request, requiredFields);

    let error = new Error();

    if (isNaN(parseInt(request['from'])) || request['from'].toString().indexOf('.') !== -1) {
        error.set(`"from" should be a valid account number`, 'from');
    }

    if (isNaN(parseInt(request['to'])) || request['to'].toString().indexOf('.') !== -1) {
        error.set(`"to" should be a valid account number`, 'to');
    }

    if (isNaN(request['amount']) || parseFloat(request['amount']) <= 0) {
        error.set(`"amount" should be a numeric value and greater than 0`, 'amount');
    }

    if (error.count) {
        throw new InvalidRequest(`Please check the details and try again`, error.get());
    }
};