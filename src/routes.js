import Router from "koa-router";
import Transaction from './service/transaction';
import _ from 'lodash';
import {validateTransferRequest} from "./service/validation";

const router = new Router();

router.post('/transfer', async (ctx, next) => {
    // validate input
    validateTransferRequest(ctx.request.body);

    let transactionId;
    let transactions = new Transaction(ctx.request.body);
    let accountDetails = await transactions.getAccountDetails();

    // check if accounts are valid
    if (_.isEmpty(accountDetails) || accountDetails.length !== 2) {
        ctx.throw(400, 'Accounts may not exist. Please check the accounts and try again');
    }

    // check if is balance available
    if (!transactions.isAmountAvailable(accountDetails)) {
        ctx.throw(400, 'The requested transfer amount is not available');
    }

    // if balance available initiate transfer
    [accountDetails, transactionId] = await transactions.transferAmount(accountDetails);

    let response = {id: transactionId};

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

export default router;
