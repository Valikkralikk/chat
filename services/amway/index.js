const axios = require("axios");
const { getAmwayProductByNumber } = require("../../helpers/shopsUrls");
const { Currency } = require("../currency");

class Amway {
    currency = new Currency();

    static getPercent(value, percent) {
        return (Number(value) / 100 * Number(percent)).toFixed(2);
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

        
        
        const kzt = product.retailPrice.value;
        const byn = (kzt * oneKZT_Byn).toFixed(2);
        const usd = (byn / oneUSD_Byn).toFixed(2);

        const kztR = product.price.value;
        const bynR = (kzt * oneKZT_Byn).toFixed(2);
        const usdR = (byn / oneUSD_Byn).toFixed(2);
        
        return {
            name: product.name, text: `
${product.name}
${product.amwaySize ? `Объем: ${product.amwaySize}` : ''}
Цена: 
    ${usd} USD (${usd + Amway.getPercent(Number(usd), 20)} +20%)
    ${byn} BYN (${byn + Amway.getPercent(Number(byn), 20)} +20%)
    ${kzt} KZT (${kzt + Amway.getPercent(Number(kzt), 20)} +20%)
Ретеил цена: 
    ${usdR} USD (${usdR + Amway.getPercent(Number(usdR), 20)} +20%)
    ${bynR} BYN (${bynR + Amway.getPercent(Number(bynR), 20)} +20%)
    ${kztR} KZT (${kztR + Amway.getPercent(Number(kztR), 20)} +20%)
        `}
    }
}

module.exports = { Amway };