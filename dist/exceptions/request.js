'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InvalidRequest = InvalidRequest;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Invalid Request Exception
 * @param message
 * @param errors
 * @constructor
 */
function InvalidRequest(message, errors = null) {
    this.message = !_lodash2.default.isEmpty(message) ? message : 'Invalid Request Parameters';
    this.name = 'Invalid Request';
    this.code = 400;
    if (!_lodash2.default.isEmpty(errors)) {
        this.errors = errors;
    }
}
//# sourceMappingURL=request.js.map