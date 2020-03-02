'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Error {
    constructor(error = []) {
        this.error = error;
    }

    /**
     * Set error
     * @param message
     * @param key
     */
    set(message, key = null) {
        let error = { 'message': message };
        if (!_lodash2.default.isEmpty(key)) {
            error['key'] = key;
        }
        this.error = [...this.error, error];
    }

    /**
     * Get error
     * @return {*}
     */
    get() {
        return this.error;
    }

    /**
     * Get count
     */
    get count() {
        return this.error.length;
    }
}

exports.default = Error;
//# sourceMappingURL=error.js.map