const { Builder, By, Key, until } = require('selenium-webdriver');

async function test2() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('http://192.168.56.101/cgi-bin/badstore.cgi');

    // Navigate to the What's New page
    const whatsNewLink = await driver.findElement(By.linkText("What's New"));
    await whatsNewLink.click();
    const pageTitle = await driver.getTitle();

    // Verify that the page title is correct
    if (pageTitle === "BadStore.net - What's New") {
      console.log(`Navigated to the What's New page. Title is "${pageTitle}" - Passed`);
    } else {
      console.error('Incorrect page title - Failed');
    }

    // Check if there are any new items displayed
    const newItems = await driver.findElements(By.css('.newItem'));
    if (newItems.length > 0) {
      console.log(`Found ${newItems.length} new items - Passed`);
    } else {
      console.error('No new items found - Failed');
    }

    // Click on a specific new item
    if (newItems.length > 0) {
      const firstNewItem = newItems[0];
      await firstNewItem.click();
      const newItemTitle = await driver.getTitle();
      console.log(`Clicked on a new item. Title is "${newItemTitle}" - Passed`);
    } else {
      console.error('No new items to click - Failed');
    }
  } finally {
    await driver.quit();
  }
}

test2();
