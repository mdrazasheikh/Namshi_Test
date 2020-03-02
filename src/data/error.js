import _ from 'lodash';

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
        let error = {'message': message};
        if (!_.isEmpty(key)) {
            error['key'] = key;
        }
        this.error = [
            ...this.error,
            error
        ];
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

export default Error;