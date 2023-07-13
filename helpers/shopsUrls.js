const { AMWAY_SEARCH_URL, WILDBERRIES_SEARCH_URL, WILDBERRIES_CARD_URL } = require("../constants");

const getAmwayProductByNumber = (number) => {
    const url = new URL(AMWAY_SEARCH_URL);
    url.searchParams.append('q', number);
    return url.toString();
};

const getWildberriesSearchProductsUrl = async (string) => {
    const url = new URL(WILDBERRIES_SEARCH_URL);
    url.searchParams.append('query', string);
    url.searchParams.append('resultset', 'catalog');
    url.searchParams.append('limit', '1');
    url.searchParams.append('page', '1');
    url.searchParams.append('appType', '128');
    url.searchParams.append('curr', 'byn');
    url.searchParams.append('locale', 'by');
    url.searchParams.append('lang', 'ru');
    url.searchParams.append('dest', '-59208');
    url.searchParams.append('regions', '1,4,22,30,31,33,40,48,66,68,69,70,80,83,114');
    url.searchParams.append('reg', '1');
    url.searchParams.append('spp', '0');
    return url.toString();
};

const getWildberriesCardUrl = (number) => {
    const url = new URL(WILDBERRIES_CARD_URL);
    url.searchParams.append('card', number.toString());
    return url.toString();
};

module.exports = { getAmwayProductByNumber, getWildberriesSearchProductsUrl, getWildberriesCardUrl };