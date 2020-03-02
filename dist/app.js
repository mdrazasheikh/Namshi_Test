'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _errorHandler = require('./middleware/errorHandler');

var _errorHandler2 = _interopRequireDefault(_errorHandler);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = new _koa2.default();

// initialize body parser
app.use((0, _koaBodyparser2.default)({
    enableTypes: ['json'],
    jsonLimit: '10kb'
}));

app.use(_errorHandler2.default);

app.use(_routes2.default.routes());

exports.default = app;
//# sourceMappingURL=app.js.map