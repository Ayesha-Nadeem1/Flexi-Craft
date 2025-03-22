const puppeteer = require("puppeteer");

async function joinRoom(roomid) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("http://localhost:3000");

  await page.type("input[placeholder='ROOM ID']", roomid);
  await page.type("input[placeholder='USERNAME']", "Testuser");
  await page.click("button:contains('Join')");

  await page.waitForSelector("text=Yahya");
  await page.waitForSelector("text=Testuser");

  await browser.close();
}

module.exports = { joinRoom };
