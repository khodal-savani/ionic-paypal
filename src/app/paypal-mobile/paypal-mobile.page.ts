import { Component, OnInit } from '@angular/core';
import { ICreateOrderRequest } from 'ngx-paypal';

@Component({
    selector: 'app-paypal-mobile',
    templateUrl: './paypal-mobile.page.html',
    styleUrls: ['./paypal-mobile.page.scss'],
})
export class PaypalMobilePage implements OnInit {

    public payPalConfig: any;
    public showPaypalButtons: boolean;

    constructor() { }


    ngOnInit() {
        this.payPalConfig = {
            currency: "USD",
            clientId: "CLIENT_ID_HERE",
            createOrder: data =>
                <ICreateOrderRequest>{
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            amount: {
                                currency_code: "USD",
                                value: "9.99",
                                breakdown: {
                                    item_total: {
                                        currency_code: "USD",
                                        value: "9.99"
                                    }
                                }
                            },
                            items: [
                                {
                                    name: "Enterprise Subscription",
                                    quantity: "1",
                                    category: "DIGITAL_GOODS",
                                    unit_amount: {
                                        currency_code: "USD",
                                        value: "9.99"
                                    }
                                }
                            ]
                        }
                    ]
                },
            advanced: {
                commit: "true"
            },
            style: {
                label: "paypal",
                layout: "vertical"
            },
            onApprove: (data, actions) => {
                console.log(
                    "onApprove - transaction was approved, but not authorized",
                    data,
                    actions
                );
                actions.order.get().then(details => {
                    console.log(
                        "onApprove - you can get full order details inside onApprove: ",
                        details
                    );
                });
            },
            onClientAuthorization: data => {
                console.log(
                    "onClientAuthorization - you should probably inform your server about completed transaction at this point",
                    data
                );
            },
            onCancel: (data, actions) => {
                console.log("OnCancel", data, actions);
            },
            onError: err => {
                console.log("OnError", err);
            },
            onClick: (data, actions) => {
                console.log("onClick", data, actions);
            }
        };

        setTimeout(() => {
            this.pay();
        }, 1000);
    }

    pay() {
        this.showPaypalButtons = true;
    }

    back() {
        this.showPaypalButtons = false;
    }

}
