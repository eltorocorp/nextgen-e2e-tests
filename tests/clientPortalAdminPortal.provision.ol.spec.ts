import { test, expect } from "@playwright/test";
import {
  ClientPortalLogin,
  NavigateToTestOrg,
  CreateCampaign,
  AddAudience,
  AddBanner,
  EditOlName,
  SubmitOLNavigateToBackstage,
} from "../utilities/clientPortalFunctions";

import {
  EditOLNameAdminPortal,
  EditCPMAdminPortal,
  XanderDeployCongfigLanguageAndDevice,
  ReviewAndDeployOL,
} from "../utilities/adminPortalFunctions";

test.use({ headless: false });

test.use({ browserName: "chromium" });

test.setTimeout(0);

const filePath =
  "/Users/martinkennedy/eltoro/nextgen-e2e-tests/assets/alan-homes-kind-tiny-clean.csv";

test("e2eXandrDeploy", async ({ page }) => {
  await ClientPortalLogin(page);
  await NavigateToTestOrg(page);
  await CreateCampaign(page);
  await AddAudience(page, filePath);
  await AddBanner(page);
  await EditOlName(page);

  await SubmitOLNavigateToBackstage(page);
  await EditOLNameAdminPortal(page);
  await EditCPMAdminPortal(page);
  await XanderDeployCongfigLanguageAndDevice(page);
  await ReviewAndDeployOL(page);
});
