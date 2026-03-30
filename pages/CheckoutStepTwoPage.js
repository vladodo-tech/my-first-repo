export class CheckoutStepTwoPage {
    constructor(page) {
        this.page = page;
        
        this.finishButton = '[data-test="finish"]'; // кнопка Finish
    }

    async finishCheckout() {
        await this.page.click(this.finishButton);
    }
}