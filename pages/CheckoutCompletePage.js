export class CheckoutCompletePage {
    constructor(page) {
        this.page = page;
        
        this.completeHeader = '[data-test="complete-header"]';
    }

    async getCompletionMessage() {
        return await this.page.textContent(this.completeHeader);
    }
}