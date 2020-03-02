'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _transaction = require('./service/transaction');

var _transaction2 = _interopRequireDefault(_transaction);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _validation = require('./service/validation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _koaRouter2.default();

router.post('/transfer', async (ctx, next) => {
    // validate input
    (0, _validation.validateTransferRequest)(ctx.request.body);

    let transactionId;
    let transactions = new _transaction2.default(ctx.request.body);
    let accountDetails = await transactions.getAccountDetails();

    // check if accounts are valid
    if (_lodash2.default.isEmpty(accountDetails) || accountDetails.length !== 2) {
        ctx.throw(400, 'Accounts may not exist. Please check the accounts and try again');
    }

    // check if is balance available
    if (!transactions.isAmountAvailable(accountDetails)) {
        ctx.throw(400, 'The requested transfer amount is not available');
    }

    // if balance available initiate transfer
    [accountDetails, transactionId] = await transactions.transferAmount(accountDetails);

    let response = { id: transactionId };

    // prepare response
    for (let account of accountDetails) {
        if (parseFloat(account['account_no']) === parseFloat(ctx.request.body['from'])) {
            response['from'] = account;
        }

        if (parseFloat(account['account_no']) === parseFloat(ctx.request.body['to'])) {
            response['to'] = account;
        }
    }

    response['transferred'] = parseFloat(ctx.request.body['amount']).toFixed(2);

    ctx.body = response;

    await next();
});

exports.default = router;
//# sourceMappingURL=routes.js.map