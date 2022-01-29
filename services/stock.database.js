class StockService{
    GetAll = function (){
        const stocks = [{"name":"Siemens","symbol":"SIE.DE", "quantity":50},{"name":"BMW","symbol":"BMW.DE","quantity":60},
            {"name":"Allianz SE","symbol":"ALV.DE","quantity":10,}, {"name":"AT & T Inc.","symbol":"T","quantity":80}];
        return stocks;
    }
}



module.exports = StockService;
