# Bank Transaction

API to perform money transfer between 2 registered accounts.
Build using Koa2 framework with babel to compile the code.

##### Pre-Requisite
  - Node v8.x or higher
  - NPM 5.x or higher
  - MySQL 5.x

### API
#### {host}:{port}/transfer
Method : POST
##### Sample Request
Request sample
```sh
  {
    "from" : {account_no},
    "to" : {account_no},
    "amount" : {amount}
  }
  ```
##### Sample Response
Response sample on successful transaction
```sh
  {
    "id": {reference_id},
    "from": {
        "account_no": {account_no},
        "balance": {balance_amount}
    },
    "to": {
        "account_no": {account_no},
        "balance": {balance_amount}
    },
    "transferred": {transferred_amount}
}
```

### Installation
 - Install dependencies
```sh
$ npm install
```
- Import SQL script from the root of the project (SQL includes triggers)
- Create sample accounts with balance in the database in the balances table
- DB credentials set to
    - host : local
    - username : root
    - password : root
    - port : 3306
    - database : bank
- to update db credentials update src/config/config.js for source code or dist/config/config.js for distribution build
- Start server
```sh
$ cd {project_name}
$ npm start
```
- By default runs on port 5555

#### From source
- Update src/config/config.js for database credentials
- Start the development server
```sh
$ npm run dev
```
- Generate distribution build
```sh
$ npm run build
```
