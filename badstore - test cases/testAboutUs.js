const { Builder, By, Key, until } = require('selenium-webdriver');

async function testAboutUs() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('http://192.168.56.101/cgi-bin/badstore.cgi');

    // Navigate to the About Us page
    const aboutUsLink = await driver.findElement(By.linkText('About Us'));
    await aboutUsLink.click();
    const pageTitle = await driver.getTitle();

    // Verify that the page title is correct
    if (pageTitle === 'BadStore.net - About Us') {
      console.log(`Navigated to the About Us page. Title is "${pageTitle}" - Passed`);
    } else {
      console.error('Incorrect page title - Failed');
    }

    // Verify the content on the About Us page
    const pageContent = await driver.findElement(By.tagName('body')).getText();
    if (pageContent.includes('Welcome to BadStore.net')) {
      console.log('About Us content is present - Passed');
    } else {
      console.error('About Us content is missing - Failed');
    }

    // Interact with an element on the About Us page (Example: Click a link)
    const contactLink = await driver.findElement(By.linkText('Contact Us'));
    await contactLink.click();
    const contactPageTitle = await driver.getTitle();

    // Verify that the Contact Us page is opened
    if (contactPageTitle === 'BadStore.net - Contact Us') {
      console.log('Contact Us page opened successfully - Passed');
    } else {
      console.error('Failed to open Contact Us page - Failed');
    }

  } finally {
    await driver.quit();
  }
}

testAboutUs();
