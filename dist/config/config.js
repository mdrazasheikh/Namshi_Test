'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Database configuration
 * @type {{host: string, port: number, username: string, password: string, database: string, connection_limit: number}}
 */
const db = exports.db = {
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'bank',
    connection_limit: 100
};
//# sourceMappingURL=config.js.map