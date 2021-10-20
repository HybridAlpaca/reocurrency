import { loadScript, PayPalNamespace } from '@paypal/paypal-js';
import ReoApi from './reoapi';

declare const reoapi: ReoApi;

const spawnButtons = (paypal: PayPalNamespace) => {
    paypal.Buttons!({
        createOrder(data, actions) {
            // paypal makes a useless popup when you click the button. close that shit
            reoapi.closePaypalLoginPopup();

            // make a payment or something
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: '5.99',
                    },
                }],
            });
        },
        async onApprove(data, actions) {
            // eslint-disable-next-line no-alert
            return actions.order.capture().then((details) => alert(`Transaction completed by ${details.payer.name.given_name}`));
        },
    }).render('#paypal-button');
};

loadScript({ 'client-id': 'test' })
    .then(spawnButtons)
    .catch((err) => {
        console.error('Failed to load the PayPal JS SDK', err);
    });
