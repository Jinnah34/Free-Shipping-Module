define([
    'uiComponent',
    'ko',
    'Magento_Customer/js/customer-data',
    'Magento_Catalog/js/price-utils',
    'mage/translate'
], function (Component, ko, customerData, priceUtils, $t) {
    "use strict"
    return Component.extend({
        _config: '',
        _element: '',

        /**
         *Initialize Function
         * @param config
         * @param element
         */
        initialize: function (config, element) {
            this._super();
            this.cart = customerData.get('cart');
            this._config = config;
            this._element = element;

        },

        /**
         *Function to get the Free Shipping Message
         * @returns string
         */
        getMessage: function () {
            let self = this;
            let subtotalAmount = self.cart().subtotalAmount;

            console.log(self._config.current_currency_symbol);
            let currency_symbol = self._config.current_currency_symbol;

            subtotalAmount === undefined ? subtotalAmount = 0 : subtotalAmount = Number(subtotalAmount);

            let amount = self._config.min_price - subtotalAmount;

            // let priceFormat = {
            //     decimalSymbol: '.',
            //     groupLength: 3,
            //     groupSymbol: ",",
            //     integerRequired: false,
            //     pattern: "$%s",
            //     precision: 2,
            //     requiredPrecision: 2
            // };

            // let temp = priceUtils.formatPrice(amount);

            let temp = currency_symbol.concat(amount);


            // let temp = priceUtils.formatPriceLocale(amount);

            console.log(subtotalAmount);
            console.log(amount);
            console.log(self._config.min_price);

            console.log(typeof subtotalAmount);
            console.log(typeof amount);
            console.log(typeof self._config.min_price);

            return ko.computed(function() {


                if(amount === self._config.min_price){

                    return $t(self._config.initial_message).replace('%1', temp);
                }
                else if(self._config.min_price <= subtotalAmount){
                    return $t(self._config.success_message);
                }

                else{
                    console.log(temp);
                    return $t(self._config.intermediate_message).replace('%1', temp);
                }
            });
        },

    });
});
