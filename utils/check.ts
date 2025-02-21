import { APIRequestContext, expect, Page } from '@playwright/test';
import { def} from './definition';
import { commonAPI } from './common-api';
import { uti } from './utilities';

export class Check {
    /**
   * Asynchronously fetches the response status of a given URL and verifies it against an expected status.
   * Uses a soft assertion to ensure the test continues even if the status does not match.
   *
   * @param {APIRequestContext} context - API request context to trigger API endpoints.
   * @param {string} url - The endpoint to send the GET request to.
   * @param {number} expectedStatus - The expected HTTP status code.
   */
  async getResponseStatus(context: APIRequestContext, url: string, expectedStatus: number) {
    const response = await commonAPI.doGet(context, url);
    expect.soft(response.status(), def.ERR_MSG.GET_RESPONSE_STATUS).toBe(expectedStatus);
  }

    /**
   * Sends a POST request with an image and validates the response status and body.
   * Uses a soft assertion for the response status to allow test continuation.
   * If the expected status is OK, verifies that the response body matches the expected image URL format.
   * Otherwise, checks if the response body matches the expected response body.
   *
   * @param {APIRequestContext} context - API request context to trigger API endpoints.
   * @param {string} url - The endpoint to send the POST request to.
   * @param {string} imagePath - The path of the image to be uploaded.
   * @param {number} expectedStatus - The expected HTTP status code.
   * @param {string} expectedBody - The expected response body when the status is not OK.
   * @returns {string} - The image URL from the response body.
   */
  async postImgResponseStatusBody(context: APIRequestContext, url: string, imagePath: string, expectedStatus: number, expectedBody: string) {
    const response = await commonAPI.doPostImg(context, url, imagePath);
    // Soft assertion the response status
    expect.soft(response.status(), def.ERR_MSG.POST_RESPONSE_STATUS + imagePath).toBe(expectedStatus);
    // Assertion the response body
    let actualResponseBody = await response.text();
    if(expectedStatus==def.RESPONSE_STATUS_OK){
      // Make RegExp to fit the response body
      let fileType = uti.getExtension(imagePath);
      // If actual image is 'jpeg', change expected to 'jpg'
      fileType = fileType === 'jpeg' ? 'jpg' : fileType;
      let expectedRegExp = new RegExp(def.IMAGE_LINK_REGEX + fileType + '\"\}$');
      expect(actualResponseBody, def.ERR_MSG.POST_RESPONSE_BODY + imagePath).toMatch(expectedRegExp);  
    }
    else{
      expect(actualResponseBody, def.ERR_MSG.POST_RESPONSE_BODY + imagePath).toBe(expectedBody);
    }
    // Only verify the image URL when response body is OK
    let responseJson = JSON.parse(actualResponseBody);
    // Return the image URL
    return responseJson.image;
  }

  /**
   * Sends a POST request with a ZIP file and validates the response status and body.
   * Uses a soft assertion for the response status to allow test continuation.
   * If the expected status is OK, extracts file types from the ZIP contents and verifies that the response body matches the expected format.
   * Otherwise, checks if the response body matches the expected response body.
   *
   * @param {APIRequestContext} context - API request context to trigger API endpoints.
   * @param {string} url - The endpoint to send the POST request to.
   * @param {string} zipPath - The path of the ZIP file to be uploaded.
   * @param {number} expectedStatus - The expected HTTP status code.
   * @param {string} expectedBody - The expected response body when the status is not OK.
   * @returns {string[]} - The list of image URLs from the response body.
   */
  async postZipResponseStatusBody(context: APIRequestContext, url: string, zipPath: string, expectedStatus: number, expectedBody: string) {
    const response = await commonAPI.doPostZip(context, url, zipPath);
    // Soft assertion the response status
    expect.soft(response.status(), def.ERR_MSG.POST_RESPONSE_STATUS + zipPath).toBe(expectedStatus);
    // Assertion the response body
    let actualResponseBody = await response.text();
    if(expectedStatus==def.RESPONSE_STATUS_OK){
      // Make RegExp to fit the dynamic number of images inside a zip file
      let typeArray : string[] = [];
      let zipFileList = uti.getFileNamesFromZip(zipPath);
      for (let fileName of zipFileList){
        let fileType = uti.getExtension(fileName);
        typeArray.push(fileType);
      }
      let body = typeArray.map(type => 
        `${def.ZIP_LINK_REGEX}${type}"`
      ).join(',');
      let ZIP_LINK_REGEX = `^\\{"images":\\[${body}\\]\\}$`;
      let expectedRegExp = new RegExp(ZIP_LINK_REGEX);
      expect.soft(actualResponseBody, def.ERR_MSG.POST_RESPONSE_BODY + zipPath).toMatch(expectedRegExp);  
    }
    else{
      expect.soft(actualResponseBody, def.ERR_MSG.POST_RESPONSE_BODY + zipPath).toBe(expectedBody);
    }
    // Only verify the image URL when response body is OK
    let responseJson = JSON.parse(actualResponseBody);
    // Return the image URL
    return responseJson.images;
  }

  /**
   * Sends a POST request with a image file to Zip endpoint and validates the response status and body.
   * Uses a soft assertion for the response status to allow test continuation.
   *
   * @param {APIRequestContext} context - API request context to trigger API endpoints.
   * @param {string} url - The endpoint to send the POST request to.
   * @param {string} imagePath - The path of the image file to be uploaded.
   * @param {number} expectedStatus - The expected HTTP status code.
   * @param {string} expectedBody - The expected response body when the status is not OK.
   */
  async postImageToZipEndpointResponseStatusBody(context: APIRequestContext, url: string, imagePath: string, expectedStatus: number, expectedBody: string) {
    const response = await commonAPI.doPostImg(context, url, imagePath);
    // Soft assertion the response status
    expect.soft(response.status(), def.ERR_MSG.POST_RESPONSE_STATUS + imagePath).toBe(expectedStatus);
    // Assertion the response body
    expect.soft(await response.text(), def.ERR_MSG.POST_RESPONSE_BODY + imagePath).toBe(expectedBody);
  }

  /**
   * Sends a POST request with multiple ZIP files and validates the response status and body.
   * Uses soft assertions to verify the response status and body, allowing the test to continue on failure.
   *
   * @param {APIRequestContext} context - API request context to trigger API endpoints.
   * @param {string} url - The endpoint to send the POST request to.
   * @param {string[]} zipPaths - The paths of the ZIP files to be uploaded.
   * @param {number} expectedStatus - The expected HTTP status code.
   * @param {string} expectedBody - The expected response body.
   */
  async postMultiZipsResponseStatusBody(context: APIRequestContext, url: string, zipPaths: string[], expectedStatus: number, expectedBody: string) {
    const response = await commonAPI.doPostMultiZips(context, url, zipPaths);
    // Soft assertion the response status
    expect.soft(response.status(), def.ERR_MSG.POST_RESPONSE_STATUS + zipPaths.toString()).toBe(expectedStatus);
    // Soft assertion the response body
    expect.soft(await response.text(), def.ERR_MSG.POST_RESPONSE_BODY + zipPaths.toString()).toBe(expectedBody);
  }

  /**
   * Sends a PUT request with an image and validates the response status.
   * Uses a soft assertion for the response status to allow test continuation.
   *
   * @param {APIRequestContext} context - API request context to trigger API endpoints.
   * @param {string} url - The endpoint to send the PUT request to.
   * @param {string} imagePath - The path of the image to be uploaded.
   * @param {number} expectedStatus - The expected HTTP status code.
   */
  async putImgResponseStatus(context: APIRequestContext, url: string, imagePath: string, expectedStatus: number) {
    const response = await commonAPI.doPutImg(context, url, imagePath);
    expect.soft(response.status(), def.ERR_MSG.PUT_RESPONSE_STATUS + imagePath).toBe(expectedStatus);
  }

  /**
   * Sends a DELETE request to the given URL and validates the response status.
   * Uses a soft assertion for the response status to allow test continuation.
   *
   * @param {APIRequestContext} context - API request context to trigger API endpoints.
   * @param {string} url - The endpoint to send the DELETE request to.
   * @param {number} expectedStatus - The expected HTTP status code.
   */
  async deleteResponseStatus(context: APIRequestContext, url: string, expectedStatus: number) {
    const response = await commonAPI.doDelete(context, url);
    expect.soft(response.status(), def.ERR_MSG.DELETE_RESPONSE_STATUS).toBe(expectedStatus);
  }

  /**
   * Captures a screenshot of a given web page at a specified URL.
   * 
   * - Sets the viewport size before taking the screenshot.
   * - Navigates to the given image URL and waits for the 'load' event is fired (defaults).
   * - If the image is a GIF, replaces it with its first frame to prevent animation.
   * - Uses soft assertion to compare the screenshot with an expected baseline image.
   *
   * @param {Page} page - The Playwright page instance.
   * @param {string} imageUrl - The URL of the image or page to capture.
   */
  async pageScreenshot(page: Page, imageUrl: string){
    // Set resolution before taking a screenshot
    await page.setViewportSize({width: def.BROWSER_WIDTH, height: def.BROWSER_HEIGHT});
    await page.goto(imageUrl);
    if(uti.getExtension(imageUrl) == 'gif'){
      // Freeze GIFs by replacing them with the first frame of the GIF on it
      await page.evaluate(() => {
        document.querySelectorAll('img').forEach(img => {
          if (img.src.endsWith('.gif')) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const newImg = new Image();
            newImg.crossOrigin = "anonymous"; // Handle cross-origin issues
            newImg.src = img.src;
            newImg.onload = () => {
              canvas.width = newImg.width;
              canvas.height = newImg.height;
              ctx!.drawImage(newImg, 0, 0);
              img.src = canvas.toDataURL('image/png'); // Replace GIF with the first frame
            };
          }
        });
      });
    }
    await expect.soft(page).toHaveScreenshot({maxDiffPixelRatio: def.MAX_ALLOW_DIFF_PIXEL_RATIO}); 
  }
}
export const chk = new Check()