const axios = require("axios");
const { getAmwayProductByNumber } = require("../../helpers/getAmwayProductByNumber");
const { Currency } = require("../currency");

class Amway {
    currency = new Currency();

    getProductUrlById(number) {
        return getAmwayProductByNumber(number);
    }

    async getProduct(url) {
        const { data } = await axios.get(url);
        if (!data.results.length) {
            return;
        }
        const product = await data.results[0];
        const kzt = await this.currency.getSetCurrencyByName('KZT');
        const oneValue = kzt.value.toFixed(6);

        return `
${product.name}
${product.amwaySize ? `Объем: ${product.amwaySize}` : ''}
Цена: ${(data.statsInfo[1].max * oneValue).toFixed(2)} BYN (${data.statsInfo[1].max} KZT)
Ретеил цена: ${(product.retailPrice.value * oneValue).toFixed(2)} BYN (${product.retailPrice.value} KZT)
        `
    }
}

module.exports = { Amway };