import { APIRequestContext, APIResponse } from 'playwright';
import fs from 'fs';
import { uti } from './utilities';

export class CommonAPI {
  /**
   * Sends a GET request to the given URL and returns the API response.
   *
   * @param {APIRequestContext} context - API request context to trigger API endpoints.
   * @param {string} url - The endpoint to send the GET request to.
   * @returns {Promise<APIResponse>} - The response from the API.
   */
  async doGet(context: APIRequestContext, url: string): Promise<APIResponse> {
    const response = await context.get(url);
    return response;
  }

  /**
   * Sends a POST request with an image file and returns the API response.
   * Reads the image file from the specified path and includes it as a multipart form-data request.
   *
   * @param {APIRequestContext} context - API request context to trigger API endpoints.
   * @param {string} url - The endpoint to send the POST request to.
   * @param {string} imagePath - The local file path of the image to be uploaded.
   * @returns {Promise<APIResponse>} - The response from the API.
   */
  async doPostImg(context: APIRequestContext, url: string, imagePath: string): Promise<APIResponse>{
    // Read the image file
    let fileType = uti.getExtension(imagePath);
    const imageBuffer = fs.readFileSync(imagePath);

    // Send a POST request with the image
    const response = await context.post(url, {
        multipart: {
            file: {
                name: 'image.' + fileType,
                mimeType: 'image/' + fileType,
                buffer: imageBuffer
            }
        }
    });
    return response;
  }
  /**
   * Sends a POST request with a single ZIP file and returns the API response.
   * Reads the ZIP file from the specified path and includes it as a multipart form-data request.
   *
   * @param {APIRequestContext} context - API request context to trigger API endpoints.
   * @param {string} url - The endpoint to send the POST request to.
   * @param {string} zipPath - The local file path of the ZIP file to be uploaded.
   * @returns {Promise<APIResponse>} - The response from the API.
   */
  async doPostZip(context: APIRequestContext, url: string, zipPath: string): Promise<APIResponse> {
    const zipBuffer = fs.readFileSync(zipPath);

    const response = await context.post(url, {
        multipart: {
            file: {
                name: 'archive.zip',
                mimeType: 'application/zip',
                buffer: zipBuffer
            }
        }
    });
    return response;
  }

  /**
   * Sends a POST request with multiple ZIP files and returns the API response.
   * Reads each ZIP file from the specified paths and includes them as a multipart form-data request.
   *
   * @param {APIRequestContext} context - API request context to trigger API endpoints.
   * @param {string} url - The endpoint to send the POST request to.
   * @param {string[]} zipPaths - An array of file paths for the ZIP files to be uploaded.
   * @returns {Promise<APIResponse>} - The response from the API.
   */
  async doPostMultiZips(context: APIRequestContext, url: string, zipPaths: string[]): Promise<APIResponse> {
    const files = zipPaths.reduce((acc, zipPath, index) => {
      acc[`file${index}`] = {
        name: `archive${index}.zip`,
        mimeType: 'application/zip',
        buffer: fs.readFileSync(zipPath)
      };
      return acc;
    }, {});
    const response = await context.post(url, {
        multipart: files
    });
    return response;
}

  /**
   * Sends a PUT request with an image file and returns the API response.
   * Reads the image file from the specified path and includes it as a multipart form-data request.
   *
   * @param {APIRequestContext} context - API request context to trigger API endpoints.
   * @param {string} url - The endpoint to send the PUT request to.
   * @param {string} imagePath - The local file path of the image to be uploaded.
   * @returns {Promise<APIResponse>} - The response from the API.
   */
  async doPutImg(context: APIRequestContext, url: string, imagePath: string): Promise<APIResponse> {
    let fileType = uti.getExtension(imagePath);
    const imageBuffer = fs.readFileSync(imagePath);

    const response = await context.put(url, {
        multipart: {
            file: {
                name: 'image.' + fileType,
                mimeType: 'image/' + fileType,
                buffer: imageBuffer
            }
        }
    });
    return response;
  }

  /**
   * Sends a DELETE request to the given URL and returns the API response.
   *
   * @param {APIRequestContext} context - API request context to trigger API endpoints.
   * @param {string} url - The endpoint to send the DELETE request to.
   * @returns {Promise<APIResponse>} - The response from the API.
   */
  async doDelete(context: APIRequestContext, url: string): Promise<APIResponse> {
    const response = await context.delete(url);
    return response;
  }
}
export const commonAPI = new CommonAPI()