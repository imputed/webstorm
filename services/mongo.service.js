const {MongoClient} = require('mongodb')
const stockService = require("./stock.service");
const stock = require("../models/stock.class");
const yahooFinance = require("yahoo-finance");
const stockDatabase = "financedb"
const stockDocument = "stocks"

const uri = "mongodb://finadmin:CTqRE9tJrMrQnIzByliyWMHFGMrBPjaY445GRglAa1hqeyNeCU9FQlWrg976yI5wVMUFjF2U817KYDZ49vMLuA==@finadmin.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@finadmin@";
const client = new MongoClient(uri);

class mongoService {
    async insertStock(stocks) {
        try {
            await client.connect();
            const database = client.db(stockDatabase);
            const document = database.collection(stockDocument);
            const result = await document.insertMany(stocks);
        } finally {
            await client.close();
        }
    }

    async getStocks() {
        let stocks = []
        try {
            await client.connect();
            const database = client.db(stockDatabase);
            const document = database.collection(stockDocument);

            const cursor = document.find({}, {});
            // print a message if no documents were found
            if ((await cursor.count()) === 0) {
                console.log("No documents found!");
            }

                await cursor.forEach(stock => {
                stocks.push(stock)
            });
            stocks.sort(function(a, b) {
                if (a.stock.name.toLowerCase() > b.stock.name.toLowerCase()) {
                    return 1;
                }
                if (a.stock.name.toLowerCase()<b.stock.name.toLowerCase()) {
                    return -1;
                }
                // a must be equal to b
                return 0;
            })
            return stocks;
        } finally {
            await client.close();
        }
    }

    async getExchangeRateEURUSD() {
        return 1.1457;
    }


}

module.exports = mongoService;