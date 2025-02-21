import dotenv from 'dotenv'; 
dotenv.config();

class Definition {
  // Wait time
  WAIT_SECOND = 1000;
  // Url and endpoint for image and zip
  static _BASEURL = process.env.BASE_URL!;
  URL_IMG = Definition._BASEURL + process.env.ENDPOINT_IMAGE;
  URL_ZIP = Definition._BASEURL + process.env.ENDPOINT_ZIP;
  // Test data path
  static _INPUT_IMAGES_FOLDER = process.env.INPUT_IMAGES_FOLDER!;
  //Image path
  static _INPUT_IMAGES_VALID_FOLDER = Definition._INPUT_IMAGES_FOLDER + process.env.VALID_FOLDER;
  IMG_VALID = {
    JPG: Definition._INPUT_IMAGES_VALID_FOLDER + process.env.IMAGE_VALID_JPG,
    JPG_MAX_SIZE: Definition._INPUT_IMAGES_VALID_FOLDER + process.env.IMAGE_VALID_MAX_SIZE_JPG,
    GIF: Definition._INPUT_IMAGES_VALID_FOLDER + process.env.IMAGE_VALID_GIF,
    GIF_MAX_SIZE: Definition._INPUT_IMAGES_VALID_FOLDER + process.env.IMAGE_VALID_MAX_SIZE_GIF
  }
  static _INPUT_IMAGES_INVALID_FOLDER = Definition._INPUT_IMAGES_FOLDER + process.env.INVALID_FOLDER;
  IMG_INVALID = {
    MP4_MAX_SIZE: Definition._INPUT_IMAGES_INVALID_FOLDER + process.env.IMAGE_INVALID_MAX_SIZE_MP4,
    // Use small files to save memory when uploading project
    PDF: Definition._INPUT_IMAGES_INVALID_FOLDER + process.env.IMAGE_INVALID_PDF,
    XLS: Definition._INPUT_IMAGES_INVALID_FOLDER + process.env.IMAGE_INVALID_XLS,
    DOC: Definition._INPUT_IMAGES_INVALID_FOLDER + process.env.IMAGE_INVALID_DOC
  }
  //Zip path
  static _INPUT_ZIPS_FOLDER = process.env.INPUT_ZIPS_FOLDER!;
  static _INPUT_ZIPS_VALID_FOLDER = Definition._INPUT_ZIPS_FOLDER + process.env.VALID_FOLDER;
  ZIP_VALID = {
    JPG: Definition._INPUT_ZIPS_VALID_FOLDER + process.env.ZIP_VALID_JPG,
    JPG_MAX: Definition._INPUT_ZIPS_VALID_FOLDER + process.env.ZIP_VALID_JPG_MAX,
    GIF: Definition._INPUT_ZIPS_VALID_FOLDER + process.env.ZIP_VALID_GIF,
    JPG_PNG_GIF: Definition._INPUT_ZIPS_VALID_FOLDER + process.env.ZIP_VALID_JPG_PNG_GIF
  }
  static _INPUT_ZIPS_INVALID_FOLDER = Definition._INPUT_ZIPS_FOLDER + process.env.INVALID_FOLDER;
  ZIP_INVALID = {
    PNG: Definition._INPUT_ZIPS_INVALID_FOLDER + process.env.ZIP_INVALID_PNG,
    XLS: Definition._INPUT_ZIPS_INVALID_FOLDER + process.env.ZIP_INVALID_XLS,
  }
  //Error message
  ERR_MSG = {
    POST_RESPONSE_STATUS: process.env.ERROR_MESSAGE_POST_RESPONSE_STATUS,
    POST_RESPONSE_BODY: process.env.ERROR_MESSAGE_POST_RESPONSE_BODY,
    GET_RESPONSE_STATUS: process.env.ERROR_MESSAGE_GET_RESPONSE_STATUS,
    PUT_RESPONSE_STATUS: process.env.ERROR_MESSAGE_PUT_RESPONSE_STATUS,
    DELETE_RESPONSE_STATUS: process.env.ERROR_MESSAGE_DELETE_RESPONSE_STATUS
  }
  // Response status
  RESPONSE_STATUS_OK = parseInt(process.env.RESPONSE_STATUS_OK!);
  // Regex
  IMAGE_LINK_REGEX = '^\{\"image\":\"https:\/\/assessement\.onrender\.com\/images\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\.';
  ZIP_LINK_REGEX = '"https:\\/\\/assessement\\.onrender\\.com\\/images\\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\\.';
  // An acceptable ratio of pixels that are different to the total amount of pixels
  MAX_ALLOW_DIFF_PIXEL_RATIO = parseInt(process.env.MAX_ALLOW_DIFF_PIXEL_RATIO!);
  //Browser resolution
  BROWSER_WIDTH = 1280;
  BROWSER_HEIGHT = 720;
}
export const def = new Definition()