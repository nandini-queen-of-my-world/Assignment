const { Builder, By, Key, until } = require('selenium-webdriver');

async function signguestbook() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('http://192.168.56.101/cgi-bin/badstore.cgi');

    // Navigate to the Sign Our Guestbook page
    const guestbookLink = await driver.findElement(By.linkText('Sign Our Guestbook'));
    await guestbookLink.click();
    const pageTitle = await driver.getTitle();

    // Verify that the page title is correct
    if (pageTitle === 'BadStore.net - Sign Our Guestbook') {
      console.log(`Navigated to the Sign Our Guestbook page. Title is "${pageTitle}" - Passed`);
    } else {
      console.error('Incorrect page title - Failed');
    }

    // Fill out the guestbook form
    const nameInput = await driver.findElement(By.name('guestname'));
    const messageInput = await driver.findElement(By.name('guestmessage'));
    const submitButton = await driver.findElement(By.name('Submit'));

    await nameInput.sendKeys('John Doe');
    await messageInput.sendKeys('Hello from the test script!');
    await submitButton.click();

    // Wait for the success message
    await driver.wait(until.elementLocated(By.css('.normal b')), 5000);

    // Verify the success message
    const successMessage = await driver.findElement(By.css('.normal b')).getText();
    if (successMessage.includes('Thank you')) {
      console.log(`Guestbook entry submitted successfully - Passed`);
    } else {
      console.error('Submission failed - Failed');
    }
  } finally {
    await driver.quit();
  }
}

signguestbook();
