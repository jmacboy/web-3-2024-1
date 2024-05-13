const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(cors({
    origin: ['http://127.0.0.1:5173',
        'http://localhost:5173'
    ],
    credentials: true,
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Accept',
        'X-Requested-With',
        'Access-Control-Allow-Origin',
        'Access-Control-Allow-Credentials',
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Methods',
    ]
}));

require('./routes/user.routes')(app);
const onProxyReq = async function (proxyReq, req, res) {
    // add new header to request
    console.log(`[HPM] [${req.method}] ${req.url}`); // outputs: [HPM] GET /users
    const token = req.cookies.session;
    console.log("Token: ", token);
    if (token) {
        proxyReq.setHeader('Authorization', `Bearer ${token}`);
    }
};
app.use(
    '/webproxy',
    createProxyMiddleware({
        target: 'http://127.0.0.1:8000/api/',
        changeOrigin: true,
        pathRewrite: (path, req) => {
            console.log(`[HPM] [${req.method}] ${req.url}`); // outputs: [HPM] GET /users
            return path.replace('/webproxy', '');
        },
        on: {
            proxyReq: onProxyReq
        }
    }),
);

app.listen(3000);
