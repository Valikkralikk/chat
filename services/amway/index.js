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



        const kzt = product.price.value;
        const byn = (kzt * oneKZT_Byn).toFixed(2);
        const usd = (byn / oneUSD_Byn).toFixed(2);

        const kztR = product.retailPrice.value;
        const bynR = (kztR * oneKZT_Byn).toFixed(2);
        const usdR = (bynR / oneUSD_Byn).toFixed(2);

        return {
            name: product.name, text: `
${product.name}
${product.amwaySize ? `Объем: ${product.amwaySize}` : ''}
Цена: 
    ${usd} USD (${Number(usd) + Number(Amway.getPercent(usd, 20))} +20%)
    ${byn} BYN (${Number(byn) + Number(Amway.getPercent(byn, 20))} +20%)
    ${kzt} KZT (${Number(kzt) + Number(Amway.getPercent(kzt, 20))} +20%)
Ретеил цена: 
    ${usdR} USD (${Number(usdR) + Number(Amway.getPercent(usdR, 20))} +20%)
    ${bynR} BYN (${Number(bynR) + Number(Amway.getPercent(bynR, 20))} +20%)
    ${kztR} KZT (${Number(kztR) + Number(Amway.getPercent(kztR, 20))} +20%)
        `}
    }
}

module.exports = { Amway };