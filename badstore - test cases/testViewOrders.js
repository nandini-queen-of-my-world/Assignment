const { Builder, By, Key, until } = require("selenium-webdriver");

async function viewprevOrders() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("http://192.168.56.101/cgi-bin/badstore.cgi");

    // Navigate to the View Previous Orders page
    const prevOrdersLink = await driver.findElement(
      By.linkText("View Previous Orders")
    );
    await prevOrdersLink.click();
    const pageTitle = await driver.getTitle();

    // Verify that the page title is correct
    if (pageTitle === "BadStore.net - View Previous Orders") {
      console.log(
        `Navigated to the View Previous Orders page. Title is "${pageTitle}" - Passed`
      );
    } else {
      console.error("Incorrect page title - Failed");
    }

    // Wait for the orders table to load
    await driver.wait(until.elementLocated(By.css(".normal table")), 5000);

    // Find the orders table and retrieve order information
    const ordersTable = await driver.findElement(By.css(".normal table"));
    const rows = await ordersTable.findElements(By.tagName("tr"));
    console.log(`Found ${rows.length} orders in the table`);

    // Iterate through each row to display order details
    for (let i = 1; i < rows.length; i++) {
      const columns = await rows[i].findElements(By.tagName("td"));
      const orderNumber = await columns[0].getText();
      const orderDate = await columns[1].getText();
      const orderStatus = await columns[2].getText();
      const orderTotal = await columns[3].getText();

      console.log(
        `Order ${orderNumber}: Date: ${orderDate}, Status: ${orderStatus}, Total: ${orderTotal}`
      );
    }

    // Verify that the table contains expected data

    // Example assertion: Check if there are at least 3 orders in the table
    if (rows.length > 3) {
      console.log("Table contains more than 3 orders - Passed");
    } else {
      console.error("Table does not contain enough orders - Failed");
    }
  } finally {
    await driver.quit();
  }
}

viewprevOrders();
