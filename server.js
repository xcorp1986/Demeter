import Express from "express";
import Favicon from "serve-favicon";
import ExpressSession from "express-session";
import CookieParser from "cookie-parser";
import BodyParser from "body-parser";
import Path from "path";
import FS from "fs";
import Logger from "morgan";
import JWT from "express-jwt";

import * as Config from "./config";
import api_v1 from "./api/api_v1";
import {RES_FAILED_TOKEN, RES_MSG_TOKEN} from "./util/status";
import {connectDB} from "./util/dbUtil";

const app = Express();

// view engine setup
app.set('views', Path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(Favicon(Path.join(__dirname, 'public', 'logo.ico')));
app.use(Logger('dev'));
app.use(JWT({secret: Config.env.JWT.secret}).unless({path: Config.env.JWT.whiteList}));
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: false}));
app.use(CookieParser('sessionSecret'));
app.use(ExpressSession({
    secret: 'sessionSecret',
    resave: true,
    saveUninitialized: true
}));

app.use(Express.static(Path.join(__dirname, 'public')));

app.use('/api/v1', api_v1);

// catch 404 and forward to error handler
// 重定向到/public/index.html页面
app.use(function (req, res) {
    FS.readFile(__dirname + '/public/index.html', function (err, data) {
        if (err) {
            console.log(err);
            res.send('500 error' + err);
        } else {
            res.writeHead(200, {
                'Content-type': 'text/html',
                'Connection': 'keep-alive'
            });
            res.end(data);
        }
    })
});

/**
 * 处理express 接口错误信息
 * 拦截token, 包装token失效response. api时返回json 页面时重定向到登录页面
 */
app.use(function (err, req, res) {
    if (err.name !== 'UnauthorizedError') {
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.send(err.status + ' ' + err.message);
    } else if (req.originalUrl.startsWith('/api')) {
        res.status(200).send({status: RES_FAILED_TOKEN, msg: RES_MSG_TOKEN});
    } else {
        res.redirect('/')
    }

});

connectDB();

export default app;