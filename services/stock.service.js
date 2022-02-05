const mongoService = require("./mongo.service");

class StockService{

    GetAll = async function (){
        let ms = new mongoService();
        const stocks = await ms.getStocks();
        return stocks;
    }

    GetExchangeRate = async function () {
        let ms = new mongoService();
        const exchangeRate = await ms.getExchangeRateEURUSD();
        return exchangeRate;
    }
}

module.exports = StockService;
