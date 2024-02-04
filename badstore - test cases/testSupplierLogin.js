const { Builder, By, Key, until } = require("selenium-webdriver");

async function testSupplierLogin() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get(
      "http://192.168.56.101/cgi-bin/badstore.cgi?action=supplierlogin"
    );

    // Test Case 1: Attempt to login with valid credentials
    const validEmail = "supplier@example.com";
    const validPassword = "supp@ssword123";

    const emailInput = await driver.findElement(By.name("email"));
    const passwordInput = await driver.findElement(By.name("passwd"));
    const loginButton = await driver.findElement(
      By.xpath('//input[@value="Login"]')
    );

    await emailInput.sendKeys(validEmail);
    await passwordInput.sendKeys(validPassword);
    await loginButton.click();

    // Verify successful login redirection
    const pageTitle = await driver.getTitle();
    if (pageTitle === "Supplier Portal - BadStore.net") {
      console.log("Login with valid credentials - Passed");
    } else {
      console.error("Login with valid credentials - Failed");
    }

    // Test Case 2: Attempt to login with invalid credentials
    const invalidEmail = "invalidsupplier@example.com";
    const invalidPassword = "invalidpassword";

    await emailInput.clear();
    await passwordInput.clear();

    await emailInput.sendKeys(invalidEmail);
    await passwordInput.sendKeys(invalidPassword);
    await loginButton.click();

    // Verify error message for invalid credentials
    const errorMessage = await driver
      .findElement(By.className("error"))
      .getText();
    if (errorMessage.includes("Invalid login")) {
      console.log("Login with invalid credentials - Passed");
    } else {
      console.error("Login with invalid credentials - Failed");
    }
  } finally {
    await driver.quit();
  }
}

testSupplierLogin();
