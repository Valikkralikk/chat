const axios = require("axios");
const { getAmwayProductByNumber } = require("../../helpers/shopsUrls");
const { Currency } = require("../currency");

class Amway {
    currency = new Currency();

    static getPercent(value, percent) {
        return value / 100 * percent;
    }

    getProductUrlById(number) {
        return getAmwayProductByNumber(number);
    }

    async getProduct(url) {
        const { data } = await axios.get(url);
        if (!data.results.length) {
            return;
        }
        const product = data.results[0];
        const KZT = await this.currency.getSetCurrencyByName('KZT');
        const USD = await this.currency.getSetCurrencyByName('USD');
        const oneKZT_Byn = KZT.value.toFixed(6);
        const oneUSD_Byn = USD.value.toFixed(6);

        
        
        const kzt = product.price.value;
        const byn = (kzt * oneKZT_Byn).toFixed(2);
        const usd = (byn / oneUSD_Byn).toFixed(2);
        
        console.log(oneKZT_Byn);
        console.log('byn',Amway.getPercent(Number(byn), 20));
        console.log('usd',Amway.getPercent(Number(usd), 20));
        console.log('kzt',Amway.getPercent(Number(kzt), 20));
        
        return {
            name: product.name, text: `
${product.name}
${product.amwaySize ? `Объем: ${product.amwaySize}` : ''}
Цена: 
    ${usd} USD (${usd + Amway.getPercent(Number(usd), 20)} +20%)
    ${byn} BYN (${byn + Amway.getPercent(Number(byn), 20)} +20%)
    ${kzt} KZT (${kzt + Amway.getPercent(Number(kzt), 20)} +20%)
Ретеил цена: ${(product.retailPrice.value * oneKZT_Byn).toFixed(2)} BYN (${product.retailPrice.value} KZT)
        `}
    }
}

module.exports = { Amway };