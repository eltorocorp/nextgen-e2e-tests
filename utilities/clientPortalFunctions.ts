const fs = require("fs");

export const ClientPortalLogin = async (page) => {
  await page.goto("https://eltoro-ui.api.dev.eltoro.com/");

  await page.waitForURL((url) =>
    url
      .toString()
      .includes(
        "https://auth.api.dev.eltoro.com/auth/realms/eltoro/protocol/openid-connect/auth"
      )
  );

  await page.waitForLoadState("load");

  await page.fill("#username", "kennedym103@gmail.com");
  await page.fill("#password", "Bridget618!");

  await page.click("#kc-login");
  await page.waitForURL((url) =>
    url.toString().includes("https://eltoro-ui.api.dev.eltoro.com/")
  );
};

export const NavigateToTestOrg = async (page) => {
  await page.click('[aria-label="Click to see settings"]');

  await page.click('button:has-text("Change org")');

  await page.fill(".OrgSelect input", "ET Pizza");

  await page.click('button:has-text("ET Pizza")');
  await page.waitForURL((url) =>
    url.toString().includes("org_id=586fc97d1829051225a4662d")
  );
};

export const CreateCampaign = async (page) => {
  await page.click('a:has-text("create")');

  await page.waitForURL((url) =>
    url
      .toString()
      .includes("https://eltoro-ui.api.dev.eltoro.com/campaigns/create")
  );

  const uniqueNumber = Date.now();
  await page.fill("#campaignName", `${uniqueNumber}-E2E-TEST`);

  await page.waitForSelector('button:has-text("continue"):not([disabled])');

  await page.click('button:has-text("continue")');
};

export const AddAudience = async (page, filePath) => {
  await page.click('button:has-text("IP Targeting")');
  await page.click('li:has-text("Upload new file")');
  await page.click(
    'label:has-text("B2C: Target your audience at their residences")'
  );
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  const fileInput = await page.locator(
    'input[type="file"][accept=".csv, text/csv"]'
  );
  await fileInput.setInputFiles(filePath);

  await page.click('button:has-text("save")');

  await page.click('button:has-text("Add selected Audiences")');
  await page.click('button:has-text("Next")');
};

export const AddBanner = async (page) => {
  await page.click('button:has-text("banner")');
  await page.click('li:has-text("Select from Creative Library")');
  await page.click(
    '#tw .TableCell.TableCell--right .Button:has-text("select"):first-of-type'
  );
  await page.fill("#BannerURL", "https://google.com");
  await page.click('button:has-text("Save to Cart")');
  await page.click('button:has-text("Next")');
};

export const EditOlName = async (page) => {
  await page.click("button:has(i.fa-pencil)");
  const olnameInput = await page.locator("#name");
  const nameValue = await olnameInput.inputValue();
  await olnameInput.fill(`${nameValue}_test`);
  await page.click("button:has(i.fa-save)");
};

export const SubmitOLNavigateToBackstage = async (page) => {
  await page.click(".Toggle");
  await page.click('button:has-text("Submit")');

  await page.waitForURL((url) => url.toString().includes("success"));
  const clientURL = page.url();

  const orgIdMatch = clientURL.match(/org_id=([^&]*)/);
  const orgId = orgIdMatch ? orgIdMatch[1] : null;

  try {
    await page.goto(
      `https://eltoro-ui.api.dev.eltoro.com/campaigns/dashboard?org_id=${orgId}`
    );
  } catch (error) {
    console.error(`Failed to navigate to the URL: ${error}`);
  }

  await page.click(".CollapseButton:first-of-type");

  await page.waitForURL((url) => url.toString().includes("order-lines"));

  const orderLineURL = page.url();
  const orderLineIdMatch = orderLineURL.match(/order-lines\/([^?]*)/);
  const orderLineId = orderLineIdMatch ? orderLineIdMatch[1] : null;

  await page.goto(
    `https://eltoro-backstage.api.dev.eltoro.com/order-line-management/org/${orgId}/orderLine/${orderLineId}`
  );
  await page.click('button:has-text("Sign In")');

  const [newPage] = await Promise.all([
    page.waitForEvent("popup"),
    page.click('button:has-text("Sign In")'),
  ]);

  await newPage.waitForLoadState("load");

  await page.goto(
    `https://eltoro-backstage.api.dev.eltoro.com/order-line-management/org/${orgId}/orderLine/${orderLineId}`
  );

  console.log(
    `https://eltoro-backstage.api.dev.eltoro.com/order-line-management/org/${orgId}/orderLine/${orderLineId}`
  );
};
