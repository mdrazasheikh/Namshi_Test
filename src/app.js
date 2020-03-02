import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import errorHandler from './middleware/errorHandler';
import router from './routes';

const app = new Koa();

// initialize body parser
app.use(
    bodyParser({
        enableTypes: ['json'],
        jsonLimit: '10kb'
    })
);

app.use(errorHandler);

app.use(router.routes());

export default app;