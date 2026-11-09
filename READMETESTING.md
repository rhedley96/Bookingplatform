## Prerequisites 
Make sure you have [Node.js](https://nodejs.org) installed.

### Install Dependencies
Run the following command at the root of the project to install Playwright and its dependencies:
```
npm install
npx playwright install 
```

### Initialise 
Install project and test dependencies:
```
npm install
```

Sync environment files:
```
npm run setup:env
```

Deploy migrations:
```
npm run db:setup
```

## Verification 
Ensure the local server is running before testing starts:
```
npm run dev
```
The platform should now be accessible locally at `http://localhost:3000`

## How to run the tests:
Use these explicit script configurations pulled straight from our workspace shortcuts:

* **Open Playwright Interactive UI Mode:**
  ``'
  npm run test:ui
  ```
* **Run High-Risk Smoke Tests Only:**
  ```
  npm run test:smoke
  ```
* **Run Known Defect Tests Only:**
  ```
  npx playwright test --grep @defect
  ```
* **Execute Full Regression Suite (Excluding Known Defects):**
  ```
  npx playwright test --grep-invert @defect
  ```
* **Execute tests in standard headed browser windows:**
  ```
  npm run test:headed
  ```
* **Target and retry only the tests that broke on the previous run:**
  ```
  npm run test:failed
  ```
* **Open the HTML dashboard report:**
  ```
  npx playwright show-report
  ```
  The report contains test steps, defect tags and annotations, and failure
  evidence (screenshots, traces, and video). In CI, download the
  `playwright-results` artifact for the HTML report and JUnit XML at
  `results/junit.xml`.

## Test Structure 

### 1. Global Setup (`auth.setup.ts`)
Logs into the system once before the testing begins to capture user credentials and authentication tokens.
* **Why we use it:** All subsequent member workflow tests reference this local configuration file instead of re-typing passwords on every run. This saves massive execution time across parallel test sweeps.

### 2. Fixtures 
Wraps custom Page Object Model (POM) classes (such as the login page or booking page). They handle setup logic in the background and activate automatically when called upon in a test argument.

### 3. R3.4 Tests for Known Defects
Document and track known application regressions via automated tests. This ensures that once developers resolve a bug, the corresponding test automatically transitions to passing without requiring changes.

#### CI/CD Approach
I used the **"Let them fail"** strategy for managing defect tests in the continuous integration pipeline:
* **Current CI Behavior:** Defect tests are written using standard Playwright assertions and tagged with `@defect`. They execute normally and **turn the CI build Red (Fail)**.
* **When Fixed:** Once the team deploys a fix, the test execution naturally turns **Green (Pass)** without requiring any modifications to the test code.
