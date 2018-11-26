const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const executeQueryDatabase = require('./config/config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});
app.listen(process.env.PORT || 3000, function () {
    console.log('Server running.');
});

app.get('/', function (req, res) {
    res.send('Web service running.');
});

app.get('/product', function (req, res) {
    executeQueryDatabase.select('SELECT PRODUCT.PRODUCT_CD, PRODUCT.NAME AS NAME, PRODUCT_TYPE.NAME AS TYPE FROM PRODUCT '
        + 'INNER JOIN PRODUCT_TYPE ON PRODUCT.PRODUCT_TYPE_CD = PRODUCT_TYPE.PRODUCT_TYPE_CD', res);
});
app.get('/product/:id', function (req, res) {
    const paramProductCd = req.params.id;
    const query = "SELECT ACCOUNT.ACCOUNT_ID, ACCOUNT.AVAIL_BALANCE, BUSINESS.NAME, INDIVIDUAL.FIRST_NAME, INDIVIDUAL.LAST_NAME FROM ACCOUNT "
        + "INNER JOIN CUSTOMER ON ACCOUNT.CUST_ID = CUSTOMER.CUST_ID "
        + "LEFT JOIN BUSINESS ON CUSTOMER.CUST_ID = BUSINESS.CUST_ID "
        + "LEFT JOIN INDIVIDUAL ON CUSTOMER.CUST_ID = INDIVIDUAL.CUST_ID "
        + "WHERE ACCOUNT.PRODUCT_CD = '" + paramProductCd + "'";
    executeQueryDatabase.select(query, res);
});

app.get('/account/:id', function (req, res) {
    const paramAccountId = req.params.id;
    const query = 'SELECT * FROM ACCOUNT WHERE ACCOUNT_ID = ' + paramAccountId;
    executeQueryDatabase.select(query, res);
});

app.get('*', function (req, res) {
    res.send('Route not found.');
});
