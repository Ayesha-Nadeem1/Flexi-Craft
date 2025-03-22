import { test, expect } from "@playwright/test";

test("Real-Time Multi-User Test with Two Tabs", async ({ browser }) => {
  let roomid;
  const context1 = await browser.newContext();
  const userOne = await context1.newPage();
  await userOne.goto("http://localhost:3000");
  await userOne.locator("text=new room").click();
  await userOne.fill("input[placeholder='USERNAME']", "User1");
  await userOne.locator("text=Join").click();
  roomid = await userOne.url().split("/").pop();

  const context2 = await browser.newContext();
  const userTwo = await context2.newPage();
  await userTwo.goto("http://localhost:3000");
  await userTwo.fill("input[placeholder='ROOM ID']", roomid);
  await userTwo.fill("input[placeholder='USERNAME']", "User2");
  await userTwo.click("text=Join");

  await expect(userOne.locator("text=User1")).toBeVisible();
  await expect(userTwo.locator("text=User2")).toBeVisible();

  // Function to drag, drop, and delete elements
  async function DragnDropnDel(page, element) {
    const draggable = page.locator(element).locator("xpath=ancestor::div[@draggable='true']");
    const dropZone = page.locator("div[draggable='false']");

    // Drag and drop
    await draggable.dragTo(dropZone);
    
    // Verify drop was successful
    await expect(dropZone.locator("*")).not.toBeEmpty();

    // Click the dropped element
    await dropZone.locator("*").click({ force: true });

    // Click trash icon to delete
    await page.locator("svg.lucide-trash").first().click({ force: true });

    // Verify element is removed
    await expect(dropZone.locator("*")).not.toBeVisible();
  }

  // Define element sets
  const elements = [
    "svg.lucide-type",
    "svg.lucide-square-pen",
    "svg.lucide-mouse-pointer-click",
    "svg.lucide-youtube",
    "svg.lucide-contact-round",
    "svg.lucide-check-check",
  ];

  for (const element of elements) {
    await DragnDropnDel(userOne, element);
  }
});
