const { Builder, By, Key, until } = require('selenium-webdriver');

async function testSupplierProcedures() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('http://192.168.56.101/cgi-bin/badstore.cgi?action=supplierprocedures');

    // Verify the presence of the main heading
    const mainHeading = await driver.findElement(By.css('h1')).getText();
    if (mainHeading.includes('BadStore.net - Supplier Procedures')) {
      console.log('Main Heading Presence - Passed');
    } else {
      console.error('Main Heading Presence - Failed');
    }

    // Verify the presence of the procedure details
    const procedureDetails = await driver.findElement(By.css('p')).getText();
    if (procedureDetails.includes('To save our administrative staff some work')) {
      console.log('Procedure Details Presence - Passed');
    } else {
      console.error('Procedure Details Presence - Failed');
    }

    // Test the file upload functionality
    const fileInput = await driver.findElement(By.css('input[type="file"]'));
    const uploadButton = await driver.findElement(By.css('input[type="submit"]'));

    // Replace the path with the actual file path you want to upload
    const filePath = '/path/to/your/file.txt';
    await fileInput.sendKeys(filePath);
    await uploadButton.click();

    // Verify successful file upload
    const successMessage = await driver.findElement(By.css('p')).getText();
    if (successMessage.includes('File upload successful')) {
      console.log('File Upload - Passed');
    } else {
      console.error('File Upload - Failed');
    }

  } finally {
    await driver.quit();
  }
}

testSupplierProcedures();
