'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promiseMysql = require('promise-mysql');

var _promiseMysql2 = _interopRequireDefault(_promiseMysql);

var _config = require('../config/config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Transaction {

    /**
     * Constructor
     * @param request
     */
    constructor(request) {
        this.connection = this.connect();
        this.request = request;
    }

    /**
     * Create db connection
     * @return {*}
     */
    connect() {
        let config = {
            host: _config.db.host,
            port: _config.db.port,
            user: _config.db.username,
            password: _config.db.password,
            database: _config.db.database,
            connectionLimit: 100
        };

        return _promiseMysql2.default.createPool(config);
    }

    /**
     * Get balances
     * @return {Promise<*>}
     */
    async getBalances() {
        let query = `SELECT * from balances WHERE account_no IN (${parseInt(this.request['from'])},${parseInt(this.request['to'])})`;

        return await this.connection.query(query);
    }

    /**
     * Insert transactions
     * @param data
     * @return {Promise<number>}
     */
    async insertTransaction(data) {
        let query = 'INSERT INTO transactions (account_no, amount) VALUES ?';
        let result = await this.connection.query(query, [data]);

        return result.insertId;
    }

    /**
     * Get account details
     * @return {Promise<*>}
     */
    async getAccountDetails() {
        let data;
        try {
            data = await this.getBalances();
        } catch (e) {
            throw e;
        }

        return data;
    }

    /**
     * Check if amount is available
     * @param accountDetails
     * @return {boolean}
     */
    isAmountAvailable(accountDetails) {
        for (let account of accountDetails) {
            if (parseInt(account['account_no']) !== parseInt(this.request['from'])) {
                continue;
            }

            if (parseFloat(account['balance']) >= parseFloat(this.request['amount'])) {
                return true;
            }
        }

        return false;
    }

    /**
     * Transfer amount
     * @param accountDetails
     * @return {Promise<*[]>}
     */
    async transferAmount(accountDetails) {
        let data = [];

        for (let account of accountDetails) {
            if (parseFloat(account['account_no']) === parseFloat(this.request['from'])) {
                data.push([account['account_no'], -parseFloat(this.request['amount']).toFixed(2)]);
            }

            if (parseFloat(account['account_no']) === parseFloat(this.request['to'])) {
                data.push([account['account_no'], parseFloat(this.request['amount']).toFixed(2)]);
            }
        }

        let transactionId = await this.insertTransaction(data);

        accountDetails = await this.getBalances();

        return [accountDetails, transactionId];
    }
}

exports.default = Transaction;
//# sourceMappingURL=transaction.js.map