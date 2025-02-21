import { test, request, APIRequestContext } from "@playwright/test";
import { def } from "../utils/definition";
import { chk } from "../utils/check";

test.describe("User Story 2", () => {
  let context: APIRequestContext;

  test.beforeEach(async () => {
    test.setTimeout(60 * def.WAIT_SECOND);
    // Create a new Playwright request context
    context = await request.newContext();
  });

  test.afterEach(async () => {
    // Close the request context
    await context.dispose();
  });

  /** T001: URL: https://assessement.onrender.com/api/zip
   * Send post request using valid data
   * file : contains 1 file only, type = .zip, size <  50MB
   * Expected:
   * - status code : 200
   * - Body response : {"images": ["https://assessement.onrender.com/images/xxx.jpg"]}
   */
  test("T001-upload-valid-zip-file", async ({ page }) => {
    // Verify status code and body response
    let imageUrls = await chk.postZipResponseStatusBody(
      context,
      def.URL_ZIP,
      def.ZIP_VALID.JPG_MAX,
      200,
      ""
    );
    for (let imgUrl of imageUrls) {
      // Verify image url
      await chk.pageScreenshot(page, imgUrl);
    }
  });

  /** T002: URL: https://assessement.onrender.com/api/zip 
   * Send post request using valid data
   * file : contains multiple files, type = .zip, size < 50MB
   * Expected:
   * - status code : 200
   * - Body response : {
    "images": [
        "https://assessement.onrender.com/images/xxx.jpg",
        "https://assessement.onrender.com/images/xxx.jpg",
        "https://assessement.onrender.com/images/xxx.gif"
        ...]}
   */
  test("T002-upload-valid-zip-file-contains-multi-images", async ({ page }) => {
    // Verify status code and body response
    let imageUrls = await chk.postZipResponseStatusBody(
      context,
      def.URL_ZIP,
      def.ZIP_VALID.JPG_PNG_GIF,
      200,
      ""
    );
    for (let imgUrl of imageUrls) {
      // Verify image url
      await chk.pageScreenshot(page, imgUrl);
    }
  });

  /** T003: URL: https://assessement.onrender.com/api/zip
   * Send post request using invalid data
   * file : upload file # .zip, type = PNG, size < 10MB
   * Expected:
   * - status code : 403
   * - Body response : {"err":"File isn' a zip"}
   */
  test("T003-upload-invalid-not-zip-file", async () => {
    // Verify status code and body response
    await chk.postImageToZipEndpointResponseStatusBody(
      context,
      def.URL_ZIP,
      def.ZIP_INVALID.PNG,
      403,
      `{"err":"File isn't a zip"}`
    );
  });

  /** T004: URL: https://assessement.onrender.com/api/zip
   * Send post request using invalid data
   * file : upload zip file, type = .zip, zip file contains no image
   * Expected:
   * - status code : 403
   * - Body response :  {"err":"no image found in zip file"}
   */
  test("T004-upload-invalid-zip-file-contains-no-image", async () => {
    // Verify status code and body response
    await chk.postZipResponseStatusBody(
      context,
      def.URL_ZIP,
      def.ZIP_INVALID.XLS,
      403,
      `{"err":"no image found in zip file"}`
    );
  });

  /** T005: URL: https://assessement.onrender.com/api/zip
   * Send post request using invalid data
   * file : upload zip file, type = .zip, Upload multiple zip files
   * Expected:
   * - status code : 403
   * - Body response :  {"err":"Multiple file are not allowed"}
   */
  test("T005-upload-invalid-multi-zip-files", async () => {
    // Verify status code and body response
    await chk.postMultiZipsResponseStatusBody(
      context,
      def.URL_ZIP,
      [def.ZIP_VALID.JPG, def.ZIP_VALID.GIF],
      403,
      `{"err":"Multiple file are not allowed"}`
    );
  });
});
