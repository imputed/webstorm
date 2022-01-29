var express = require('express');
var router = express.Router();
var axios = require("axios").default;
var yahooFinance = require('yahoo-finance');
var stockService = require('../services/stock.database')
var stock = require('../models/stock.class')
const {response} = require("express");

/* GET users listing. */
router.get('/', async function (req, res, next) {

    let quotes = [];
    let service = new stockService();
    let symbols = await service.GetAll();
    for (let i = 0; i < symbols.length; i++) {
        await yahooFinance.quote({
            symbol: symbols[i].symbol,
            modules: ['price']
        }, function (err, quote) {
            quotes.push({
                "name": symbols[i].name,
                "symbol": symbols[i].symbol,
                "price": quote.price.regularMarketPrice.toString(),
                "quantity": symbols[i].quantity,
                "currency": quote.price.currency
            })

        })
    }
    res.send(quotes)

});

router.post('/', function (req, res, next) {
    stocks = [];
    for (let i = 0; i < req.body.length; i++) {
        var s = new stock(req.body[i].name, req.body[i].symbol, req.body[i].quantity);
        stocks.push(s)
    }
    console.log(stocks);
});


module.exports = router;
