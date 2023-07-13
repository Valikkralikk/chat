const { AMWAY_SEARCH_URL } = require("../constants");

const getAmwayProductByNumber = (number) => {
    const url = new URL(AMWAY_SEARCH_URL);
    url.searchParams.append('q', number);
    return url.toString();
};

module.exports = { getAmwayProductByNumber }