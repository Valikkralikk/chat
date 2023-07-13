const axios = require("axios");
const { getWildberriesSearchProductsUrl, getWildberriesCardUrl } = require("../../helpers/shopsUrls");

class Wildberries {

    static async getProductsByQuery(query) {
        const url = await getWildberriesSearchProductsUrl(query);
        const { data } = await axios.get(url);

        if (!data.data.products.length) {
            return;
        }
        const product = data.data.products[0];

        return { price: product.salePriceU * 0.01, link: getWildberriesCardUrl(product.id) }
    }
}

module.exports = { Wildberries };