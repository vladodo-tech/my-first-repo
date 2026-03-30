export class CartPage {
    constructor(page) {
        this.page = page;
        this.itemName = '[data-test="inventory-item-name"]';
        this.checkoutButton = '[data-test="checkout"]';
    }

    async getItemName() {
        return await this.page.textContent(this.itemName);
    }

    async goToCheckout() {
        await this.page.click(this.checkoutButton);
    }
}