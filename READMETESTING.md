## Prerequisites 
Make sure you have [Node.js](https://nodejs.org/) installed.

### Install Dependencies
Run the following command at the root of the project to install Playwright and its dependencies:
npm install
npx playwright install 

### Initialise 
Install project and test dependences 
npm install

Sync environment files 
npm run detup:env

deploy migrations
npm run de: setup 

## Verifiticaiton 
Ensure local browser is running before testing starts 
npm run dev
The platform should now be accessible locally at `http://localhost:3000`

## How to run the tests:
Use these explicit script configurations pulled straight from our workspace shortcuts:

Open Playwright Interactive UI Mode 

    npm run test:ui
    
Run High-Risk Smoke Tests 

    npm run test:smoke

  Execute tests in standard headed browser windows:

    npm run test:headed

 Target and retry only the tests that broke on the previous run:
    npm run test:failed

 Open the HTML dashboard report:
    npx playwright show-report

## Test Structure 

1. Golbal key ('auth.setup.ts)
Logs into the system once before the testing begins. Captures user credentials & tokens 
***Why we use it:** All subsequent member workflow tests look at this local configuration file instead of re-typing passwords on every run. This saves massive execution time across parallel test sweeps.

Fixtures 
Wraps custom page object model callses (like login page or booking page )
works in the background and activates when called upon

