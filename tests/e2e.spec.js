import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutStepOnePage } from "../pages/CheckoutStepOnePage";
import { CheckoutStepTwoPage } from "../pages/CheckoutStepTwoPage";
import { CheckoutCompletePage } from "../pages/CheckoutCompletePage";

test('Покупка на saucedemo.com', async ({ page }) => {
    
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutStepOne = new CheckoutStepOnePage(page);
    const checkoutStepTwo = new CheckoutStepTwoPage(page);
    const checkoutComplete = new CheckoutCompletePage(page);

    //Открыть страницу логина
    await loginPage.open();

    //Залогиниться
    await loginPage.login('standard_user', 'secret_sauce');

    //Проверить, что открылась страница товаров
    const title = await inventoryPage.getPageTitle();
    
    //Проверка: заголовок должен быть "Products"
    expect(title).toBe('Products');

    //Добавить самый дорогой товар
    await inventoryPage.sortHighToLow();
    
    const expensiveItemName = await inventoryPage.getFirstItemName();
    
    //Добавляем его в корзину
    await inventoryPage.addFirstItemToCart();

    //Перейти в корзину
    await inventoryPage.openCart();

    //Проверить, что в корзине правильный товар
    const cartItemName = await cartPage.getItemName();
    
    // Проверка: товар в корзине должен совпадать с тем, что добавляли
    expect(cartItemName).toBe(expensiveItemName);

    //Начать оформление заказа
    await cartPage.goToCheckout();

    //Заполнить данные покупателя
    await checkoutStepOne.fillUserInfo('Test', 'User', '12345');

    //Завершить покупку
    await checkoutStepTwo.finishCheckout();

    //Проверить сообщение об успехе
    const successMessage = await checkoutComplete.getCompletionMessage();
    
    expect(successMessage).toBe('Thank you for your order!');
    
});