import { test, request, APIRequestContext } from "@playwright/test";
import { def } from "../utils/definition";
import { chk } from "../utils/check";

test.describe("User Story 1", () => {
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

  /** T001: URL: https://assessement.onrender.com/api/image
   * Send post request using valid data
   * file : upload valid image, type = jpeg, size < 10MB
   * Expected:
   * - status code : 200
   * - Body response : {""image"":""https://assessement.onrender.com/images/xxxxxxxxxxxxxxxxxxxxxxx.jpg""}
   */
  test("T001-upload-valid-jpeg-image", async ({ page }) => {
    // Verify status code and body response
    let imageUrl = await chk.postImgResponseStatusBody(
      context,
      def.URL_IMG,
      def.IMG_VALID.JPG_MAX_SIZE,
      200,
      ""
    );
    // Verify image url
    await chk.pageScreenshot(page, imageUrl);
  });

  /** T002: URL: https://assessement.onrender.com/api/image
   * Send post request using valid data
   * file : upload valid image, type = gif, size < 10MB
   * Expected:
   * - status code : 200
   * - Body response : {""image"":""https://assessement.onrender.com/images/xxxxxxxxxxxxxxxxxxxxxxx.gif""}
   */
  test("T002-upload-valid-gif-image", async ({ page }) => {
    // Verify status code and body response
    let imageUrl = await chk.postImgResponseStatusBody(
      context,
      def.URL_IMG,
      def.IMG_VALID.GIF,
      200,
      ""
    );
    // Verify image url
    await chk.pageScreenshot(page, imageUrl);
  });

  /** T003: URL: https://assessement.onrender.com/api/image
   * Send post request using invalid data
   * file : upload invalid image, type = MP4/ PDF / Xls / doc..., size < 10MB
   * Expected:
   * - status code : 403
   * - Body response : {"err":"File isn't an image"}
   */
  test("T003-upload-invalid-images", async () => {
    let imageType = ["MP4_MAX_SIZE", "PDF", "XLS", "DOC"];
    for (let type of imageType) {
      // Verify status code and body response
      await chk.postImgResponseStatusBody(
        context,
        def.URL_IMG,
        def.IMG_INVALID[type],
        403,
        `{"err":"File isn't an image"}`
      );
    }
  });

  /** T004: URL: https://assessement.onrender.com/api/image
   * Send API without correct methods
   * file : upload valid image, type = JPEG, Method = GET / PUT/ DELETE/ ...
   * Expected:
   * - status code : 404
   */
  test("T004-send-API-without-correct-methods", async () => {
    let epxectedCode = 404;
    // Verify status code
    await chk.getResponseStatus(context, def.URL_IMG, epxectedCode);
    await chk.putImgResponseStatus(
      context,
      def.URL_IMG,
      def.IMG_VALID.JPG,
      epxectedCode
    );
    await chk.deleteResponseStatus(context, def.URL_IMG, epxectedCode);
  });
});
