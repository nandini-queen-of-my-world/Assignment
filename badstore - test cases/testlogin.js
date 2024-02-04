const { Builder, By, Key, until } = require('selenium-webdriver');

async function testLogin() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('http://192.168.56.101/cgi-bin/badstore.cgi?action=loginregister');

    // Test Case 1: Login with valid credentials
    const emailInput = await driver.findElement(By.name('email'));
    const passwordInput = await driver.findElement(By.name('passwd'));
    const loginButton = await driver.findElement(By.name('Login'));

    await emailInput.sendKeys('valid_email@example.com');
    await passwordInput.sendKeys('valid_password');
    await loginButton.click();

    // Verify that the user is redirected to the home page after successful login
    const homePageTitle = await driver.getTitle();
    if (homePageTitle === 'BadStore.net - Home') {
      console.log('Login with valid credentials - Passed');
    } else {
      console.error('Login with valid credentials - Failed');
    }

    // Test Case 2: Register a new account
    const registerButton = await driver.findElement(By.name('Register'));
    await registerButton.click();

    // Fill in the registration form
    const fullNameInput = await driver.findElement(By.name('fullname'));
    const registerEmailInput = await driver.findElement(By.name('email'));
    const registerPasswordInput = await driver.findElement(By.name('passwd'));
    const pwdHintInput = await driver.findElement(By.name('pwdhint'));
    const registerSubmitButton = await driver.findElement(By.name('Register'));

    await fullNameInput.sendKeys('John Doe');
    await registerEmailInput.sendKeys('new_user@example.com');
    await registerPasswordInput.sendKeys('new_password');
    await pwdHintInput.sendKeys('blue'); // Choosing a password hint
    await registerSubmitButton.click();

    // Verify that the registration is successful and user is redirected to the home page
    const registeredHomePageTitle = await driver.getTitle();
    if (registeredHomePageTitle === 'BadStore.net - Home') {
      console.log('Registration of a new account - Passed');
    } else {
      console.error('Registration of a new account - Failed');
    }

    // Test Case 3: Attempt to login with incorrect credentials
    await driver.get('http://192.168.56.101/cgi-bin/badstore.cgi?action=loginregister');
    await emailInput.sendKeys('invalid_email@example.com');
    await passwordInput.sendKeys('invalid_password');
    await loginButton.click();

    // Verify that the login fails and shows an error message
    const errorMessage = await driver.findElement(By.className('error')).getText();
    if (errorMessage.includes('Invalid email address or password')) {
      console.log('Login with incorrect credentials - Passed');
    } else {
      console.error('Login with incorrect credentials - Failed');
    }

  } finally {
    await driver.quit();
  }
}

testLogin();
