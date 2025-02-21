# Technical QA Assessment

An automation testing assignment for QA interview.

## 1. Pre-requires
### 1.1. Environment
- **Node.js**: v23.8.0 or newer: https://nodejs.org/en/download/current
- `Optional` in development environment only:
     - Microsoft Visual Studio Code (User): v1.89.1 or newer: https://code.visualstudio.com/download
          - `Playwright Test for VSCode` extension: v1.1.1 or newer: https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright

### 1.2. Prepare resources
  Clone the repository into a folder, rename to "playwright-assignment"
  ```bash
  cd .../playwright-assignment    //CMD to the project root directory
  npm install                     //Install the dependencies which are defined in package.json
  npx playwright install          //Install the playwright 
  ```
## 2. Execute test in command prompt
- Step 1. CMD to the project root directory
  > cd .../playwright-assignment 

- Step 2. Run the testing command:
  ```bash
  # To run all test cases 
  npx playwright test
  # To generate the report manually
  npx playwright show-report
  # For more detail
  https://playwright.dev/docs/running-tests
  ```

- Step 3. Check result report in `./playwright-report`
  - Visual comparisons: https://playwright.dev/docs/test-snapshots
    + Playwright Test includes the ability to produce and visually compare screenshots using `await expect(page).toHaveScreenshot()`. 
    + On first execution, Playwright test will generate reference screenshots. Subsequent runs will compare against the reference.
    + Browser rendering can vary based on the host OS, version, settings, hardware, power source (battery vs. power adapter), headless mode, and other factors. For consistent screenshots, run tests in the same environment where the baseline screenshots were generated.

    => If you encounter screenshot comparison errors, delete the `./tests/user-story-1.spec.ts-snapshots` and `./tests/user-story-2.spec.ts-snapshots` folders, then rerun the test to allow Playwright to generate reference screenshots suited to your environment.