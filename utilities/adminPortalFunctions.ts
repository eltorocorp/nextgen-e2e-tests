export const EditOLNameAdminPortal = async (page) => {
  await page.locator('button:has-text("Edit")').first().click();

  const nameInput = await page
    .locator('div:has-text("Editing...") input')
    .first();
  const currentValue = await nameInput.inputValue();
  await nameInput.fill(`${currentValue}_edited`);

  const updatedValue = await nameInput.inputValue();

  console.log(updatedValue);

  await page.click('button:has-text("save")');
};

export const EditCPMAdminPortal = async (page) => {
  await page.locator('button:has-text("Edit")').last().click();

  const cpmInput = await page.locator(
    'td:has-text("Order Line CPM:") + td input'
  );
  const cpmValue = await cpmInput.inputValue();

  await cpmInput.fill((Number(cpmValue) + 1).toString());

  await page.click('button:has-text("Save")');
};

export const XanderDeployCongfigLanguageAndDevice = async (page) => {
  await page.click('button:has-text("Deployment Configs")');
  await page.click('label:has-text("Xandr Invest")');
  await page.click('button:has-text("Save")');

  await page.click('label:has-text("Desktop")');

  const inputWithValue15 = page.locator('input[value="15"]');
  await inputWithValue15.fill("13");

  await page.click('label:has-text("English")');

  await page.click('button:has-text("save")');
};

export const ReviewAndDeployOL = async (page) => {
  await page.click('button:has-text("Review / Deploy")');

  await page.click('button:has-text("Start Review")');

  await page.click('button:has-text("Approve")');

  await page.click('button:has-text("Review / Deploy")');

  await page.click('button:has(svg[data-testid="SendIcon"])');

  await page.waitForSelector('p:has-text("Status:") span:has-text("Deployed")');
};
