const axios = require('axios');

class Currency {
    cashCurrency = {};
    url = 'https://api.nbrb.by/exrates/rates/';

    static async getCurrencyFromNBRB(name, url) {
        const response = await axios(`${url}${name}?parammode=2`);
        const { Cur_OfficialRate, Cur_Scale } = response.data;
        const currency = Cur_OfficialRate / Cur_Scale;
        
        return currency;
    }

    static checkDate(date) {
        const tommorow = new Date().setDate(new Date().getDate() + 1);
        return date < new Date(tommorow);
    }

    async getSetCurrencyByName(name) {
        const inCash = this.cashCurrency[name];

        if (inCash && Currency.checkDate(inCash.date)) {
            return inCash;
        } else {
            const value = await Currency.getCurrencyFromNBRB(name, this.url);
            this.cashCurrency[name] = { name, value, date: new Date() }
            return this.cashCurrency[name];
        }
    }
}

module.exports = { Currency };