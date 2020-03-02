"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateTransferRequest = exports.validateRequest = undefined;

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _error = require("../data/error");

var _error2 = _interopRequireDefault(_error);

var _request = require("../exceptions/request");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Validate the request parameter
 * @param request
 * @param requiredKeys
 */
const validateRequest = exports.validateRequest = (request, requiredKeys = []) => {
    if (_lodash2.default.isEmpty(requiredKeys) || !Array.isArray(requiredKeys)) {
        return true;
    }

    let error = new _error2.default();

    for (let key of requiredKeys) {
        if (_lodash2.default.isEmpty(key)) {
            continue;
        }
        if (key.match(/[a-zA-Z0-9]+\.[a-zA-Z0-9]+/)) {
            let keyPieces = key.split('.');
            if (_lodash2.default.isEmpty(keyPieces[0]) || _lodash2.default.isEmpty(keyPieces[1])) {
                error.set('Invalid Key', key);
            }
            if (keyPieces.length > 2) {
                error.set('3 level nesting is not supported', key);
            }
            if (!request.hasOwnProperty(keyPieces[0]) || !request[keyPieces[0]].hasOwnProperty(keyPieces[1]) || _lodash2.default.isEmpty(request[keyPieces[0]][keyPieces[1]])) {
                error.set(`"${key}" cannot be empty`, key);
            }
        } else {
            if (_lodash2.default.isEmpty(request[key])) {
                error.set(`"${key}" cannot be empty`, key);
            }
        }
    }

    if (error.count) {
        throw new _request.InvalidRequest(`Please check the details and try again`, error.get());
    }
};

/**
 * Validate transfer Request params
 * @param request
 * @param requiredFields
 */
const validateTransferRequest = exports.validateTransferRequest = (request, requiredFields = ['from', 'to', 'amount']) => {
    validateRequest(request, requiredFields);

    let error = new _error2.default();

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
        throw new _request.InvalidRequest(`Please check the details and try again`, error.get());
    }
};
//# sourceMappingURL=validation.js.map