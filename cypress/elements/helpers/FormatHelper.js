class FormatHelper {

    /**
     * Removes all non-digit and non-separator characters from string and converts it to float value
     * @param {string} text - text to parse
     * @returns {number} - float value of price from string. 0 if string doesn't contain a number.
     */
    getPriceFormattedValue(text) {
        const value = parseFloat(
            text.replace(/[^-0-9,.]+/g, '').replace(/^\./g, '').replace(/[,. ](\d{3})/g, '$1').replace(/,/, '.')
        );
        return isNaN(value) ? 0 : value;
    }
}

module.exports = FormatHelper;
