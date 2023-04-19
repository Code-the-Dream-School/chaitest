const puppeteer = require("puppeteer");
//require("dotenv").config();

(async () => {
  const browser = await puppeteer.launch({executablePath: '/path/to/Chrome'});
  const page = await browser.newPage();
  await page.goto("https://example.com");
  await page.screenshot({ path: "example.png" });

  await browser.close();
})();
