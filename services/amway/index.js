const axios = require("axios");
const { getAmwayProductByNumber } = require("../../helpers/shopsUrls");
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
        const product = data.results[0];
        const kzt = await this.currency.getSetCurrencyByName('KZT');
        const oneValue = kzt.value.toFixed(6);

        return {
            name: product.name, text: `
${product.name}
${product.amwaySize ? `Объем: ${product.amwaySize}` : ''}
Цена: ${(product.price.value * oneValue).toFixed(2)} BYN (${product.price.value} KZT)
Ретеил цена: ${(product.retailPrice.value * oneValue).toFixed(2)} BYN (${product.retailPrice.value} KZT)
        `}
    }
}

module.exports = { Amway };