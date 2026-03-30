export class LoginPage {
    constructor(page) {
        this.page = page;  // сохраняем страницу, чтобы использовать дальше
        
        // Селекторы элементов (адреса элементов на странице)
        this.usernameInput = '[data-test="username"]';      // поле логина
        this.passwordInput = '[data-test="password"]';    // поле пароля
        this.loginButton = '[data-test="login-button"]';  // кнопка входа
    }

    
    async open() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    
    async login(username, password) {
        
        await this.page.fill(this.usernameInput, username);
        
        
        await this.page.fill(this.passwordInput, password);
        
        
        await this.page.click(this.loginButton);
    }
}