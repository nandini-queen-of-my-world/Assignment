const { Builder, By, Key, until } = require("selenium-webdriver");

async function TestHomePage() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("http://192.168.56.101/cgi-bin/badstore.cgi");

    // Verify the presence of the BadStore logo
    const logoElement = await driver.findElement(
      By.css('IMG[alt="BadStore.net"]')
    );
    if (logoElement) {
      console.log("Logo is present - Passed");
    } else {
      console.error("Logo is not present - Failed");
    }

    // Search for an item and submit the search form
    const searchInput = await driver.findElement(By.name("searchquery"));
    await searchInput.sendKeys("test item");
    await searchInput.sendKeys(Key.RETURN);

    // Verify that search results are displayed
    const searchResults = await driver.findElement(By.css("DIV.searchResults"));
    if (searchResults) {
      console.log("Search results are displayed - Passed");
    } else {
      console.error("Search results are not displayed - Failed");
    }

    // Navigate to the What's New page
    const whatsNewLink = await driver.findElement(By.linkText("What's New"));
    await whatsNewLink.click();
    const newPageTitle = await driver.getTitle();
    console.log(
      `Navigated to the What's New page. Title is "${newPageTitle}" - Passed`
    );
  } finally {
    await driver.quit();
  }
}

TestHomePage();
