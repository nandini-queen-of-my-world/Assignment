const { Builder, By, Key, until } = require('selenium-webdriver');

async function testViewCart() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('http://192.168.56.101/cgi-bin/badstore.cgi?action=cartview');

    // Test Case 1: Add items to the cart
    const addItemButton1 = await driver.findElement(By.xpath('//button[contains(text(), "Add to Cart")]'));
    const addItemButton2 = await driver.findElement(By.xpath('(//button[contains(text(), "Add to Cart")])[2]'));

    await addItemButton1.click();
    await addItemButton2.click();

    // Test Case 2: View Cart
    const viewCartButton = await driver.findElement(By.xpath('//a[contains(text(), "View Cart")]'));
    await viewCartButton.click();

    // Verify that the items added to the cart are displayed
    const cartItems = await driver.findElements(By.className('cart_item'));
    if (cartItems.length === 2) {
      console.log('Adding items to the cart and viewing cart - Passed');
    } else {
      console.error('Adding items to the cart and viewing cart - Failed');
    }

    // Test Case 3: Proceed to checkout
    const checkoutButton = await driver.findElement(By.xpath('//a[contains(text(), "Proceed to Checkout")]'));
    await checkoutButton.click();

    // Verify that the user is redirected to the checkout page
    const checkoutPageTitle = await driver.getTitle();
    if (checkoutPageTitle === 'BadStore.net - Checkout') {
      console.log('Proceeding to checkout - Passed');
    } else {
      console.error('Proceeding to checkout - Failed');
    }

  } finally {
    await driver.quit();
  }
}

testViewCart();
