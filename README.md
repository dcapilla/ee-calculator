
## Equal Experts Calculator

EE Calculator is a small [AngularJS](http://angularjs.org/) application that displays a basic calculator on your browser. The code has been divided into different components to make the code maintainable and easy to understand.

### How to start EE Calculator

First, you need [Node.js](https://nodejs.org/) to be installed in your dev environment as this project depends on it. Next, you should clone EE calculator project to your dev environment:
    
    git clone https://github.com/dcapilla/ee-calculator.git
    
Once the project is cloned you need to run **npm install** to install the dependencies needed. Now you are ready to use the following commands to run and test the project:

- **npm run start** (will start the local web server on localhost:8000)
- **npm run test** (will start karma for countinous testing once code changes are detected)
- **npm run test-single-run** (will start karma for one single test run)

Above commands are defined in the **package.json** configuration file in the root of the project. Check it out to understand what is exactly executed once above commands are run.

### Application structure

The project has been divided into different components to make it easy to understand:
- Calculator: this is the main wrapper component
- Button: Calculator button component
- Screen: Calculator screen component

### Testing
    
We use Karma + Jasmine to test the application. In order to run tests, just run **npm run test-single-run**, this will run tests and will produce a Test coverage report under the /coverage folder on the root of the project.
