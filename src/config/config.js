/**
 * Database configuration
 * @type {{host: string, port: number, username: string, password: string, database: string, connection_limit: number}}
 */
export const db = {
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'bank',
    connection_limit: 100
};