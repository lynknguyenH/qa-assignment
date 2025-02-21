import AdmZip from 'adm-zip';

class Utilities {
  /**
   * Extracts the file extension from a given filename.
   * Returns an empty string if no extension is found.
   *
   * @param {string} filename - The name of the file.
   * @returns {string} - The file extension (without the dot) or an empty string if none exists.
   */
  getExtension(filename: string): string {
    let i = filename.lastIndexOf('.');
    return (i < 0) ? '' : filename.substring(i + 1);
  }

  /**
   * Get a list of file names inside a ZIP file.
   * @param {string} zipPath - Path to the ZIP file.
   * @returns {string[]} List of file names inside the ZIP.
   */
  getFileNamesFromZip(zipPath: string): string[] {
    try {
        const zip = new AdmZip(zipPath);
        return zip.getEntries().map((entry: { entryName: any; }) => entry.entryName);
    } catch (error) {
        console.error("Error reading ZIP file:", error);
        return [];
    }
  }
}

export const uti = new Utilities()