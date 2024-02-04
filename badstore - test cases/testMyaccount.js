const { Builder, By, Key, until } = require('selenium-webdriver');

async function testMyaccount() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('http://192.168.56.101/cgi-bin/badstore.cgi');

    // Log in with valid credentials
    await login(driver, 'testuser@example.com', 'password123');

    // Navigate to the My Account page
    const myAccountLink = await driver.findElement(By.linkText('My Account'));
    await myAccountLink.click();
    const pageTitle = await driver.getTitle();

    // Verify that the page title is correct
    if (pageTitle === 'BadStore.net - My Account') {
      console.log(`Navigated to the My Account page. Title is "${pageTitle}" - Passed`);
    } else {
      console.error('Incorrect page title - Failed');
    }

    // Retrieve current account information
    const currentName = await driver.findElement(By.name('fullname')).getAttribute('value');
    const currentEmail = await driver.findElement(By.name('email')).getAttribute('value');
    console.log(`Current Account Information: Name - ${currentName}, Email - ${currentEmail}`);

    // Update account information
    await updateAccountInfo(driver, 'Updated User', 'updateduser@example.com');

    // Verify that the account information is updated
    const updatedName = await driver.findElement(By.name('fullname')).getAttribute('value');
    const updatedEmail = await driver.findElement(By.name('email')).getAttribute('value');

    if (updatedName === 'Updated User' && updatedEmail === 'updateduser@example.com') {
      console.log('Account information successfully updated - Passed');
    } else {
      console.error('Failed to update account information - Failed');
    }

  } finally {
    await driver.quit();
  }
}

async function login(driver, email, password) {
  // Navigate to the login page
  const loginRegisterLink = await driver.findElement(By.linkText('Login / Register'));
  await loginRegisterLink.click();

  // Enter login credentials
  await driver.findElement(By.name('email')).sendKeys(email);
  await driver.findElement(By.name('passwd')).sendKeys(password, Key.RETURN);

  // Wait for login to complete
  await driver.wait(until.titleIs('BadStore.net - My Account'), 5000);
}

async function updateAccountInfo(driver, newName, newEmail) {
  // Update account information
  await driver.findElement(By.name('fullname')).clear();
  await driver.findElement(By.name('fullname')).sendKeys(newName);
  await driver.findElement(By.name('email')).clear();
  await driver.findElement(By.name('email')).sendKeys(newEmail);

  // Submit the form to save changes
  await driver.findElement(By.name('Update')).click();
}

testMyaccount();
