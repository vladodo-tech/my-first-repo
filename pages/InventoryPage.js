export class InventoryPage {
    constructor(page) {
        this.page = page;
        this.title = '[data-test="title"]';
        this.cartIcon = '[data-test="shopping-cart-link"]';
        this.sortDropdown = '[data-test="product-sort-container"]';
        this.firstItemName = '[data-test="inventory-item-name"]';
        this.addToCartButton = '[data-test^="add-to-cart"]';
    }

    async getPageTitle() {
        return await this.page.textContent(this.title);
    }

    async sortHighToLow() {
        
        await this.page.selectOption(this.sortDropdown, 'hilo');
        
        await this.page.waitForTimeout(500);
    }

    async getFirstItemName() {
        return await this.page.textContent(this.firstItemName);
    }

    async addFirstItemToCart() {
        await this.page.click(this.addToCartButton);
    }

    async openCart() {
        await this.page.click(this.cartIcon);
    }
}