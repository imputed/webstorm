var express = require('express');
var router = express.Router();
var axios = require("axios").default;
var yahooFinance = require('yahoo-finance');
var stockService = require('../services/stock.service')
var stock = require('../models/stock.class')
const {response} = require("express");
const mongoService = require("../services/mongo.service");


/* GET users listing. */
router.get('/', async function (req, res, next) {
    let quotes = [];

    let service = new stockService();
    let exchangeRate = await service.GetExchangeRate();
    let symbols = await service.GetAll();

    for (let i = 0; i < symbols.length; i++) {
        let item = new stock(symbols[i].stock.name, symbols[i].stock.symbol, symbols[i].stock.quantity)
        await yahooFinance.quote({
            symbol: item.symbol,
            modules: ['price']
        }, function (err, quote) {
            let price = quote.price.regularMarketPrice;

            if (quote.price.currency === "USD") {
                price = price / exchangeRate;
            }

            quotes.push({
                "name": item.name,
                "symbol": item.symbol,
                "price": price,
                "quantity": item.quantity,

            })

        })
    }
    res.send(quotes)

});

router.post('/', function (req, res, next) {
    let ms = new mongoService();
    let stocks = [];
    for (let i = 0; i < req.body.length; i++) {
        if (typeof (req.body[i].name) != undefined && typeof (req.body[i].symbol) != undefined && typeof (req.body[i].quantity != undefined)) {
            stocks.push({"stock": new stock(req.body[i].name, req.body[i].symbol, req.body[i].quantity)});
        }
        ms.insertStock(stocks)
    }

})

module.exports = router;
