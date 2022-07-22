// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const licInfo = require('./assets/js/licenseInfo.js')



//Variables
var finalFileText = '';

//Functions ---------
function getLicenses(obj) {
  let x = [];
  for (let i = 0; i < obj.length; i++) {
    x += licInfo['GNU'][i].licenseName
  };
  return x
}

// TODO: Create an array of questions for user input
const questions = [
  // {
  //   type: 'input',
  //   name: 'fullName',
  //   message: 'What is your full name? (Name Surname)',
  // },
  {
    type: 'input',
    name: 'gitHubName',
    message: 'What is your GitHub ID?',
  },
  {
    type: 'input',
    name: 'projectName',
    message: 'What is your Project Name?',
  },
  // {
  //   type: 'checkbox',
  //   message: 'What languages are being used in this project?',
  //   name: 'languagesListed',
  //   choices: ['HTML', 'CSS', 'JavaScript', 'MySQL', 'Other'],
  // },
  {
    type: 'list',
    message: 'What license will be used for this project?',
    name: 'licenseOrg',
    choices: Object.keys(licInfo),
  },
  //Use a when statement https://stackoverflow.com/questions/56412516/conditional-prompt-rendering-in-inquirer
  {
    type: 'list',
    message: 'What license version would you prefer?',
    name: 'license',
    choices: Object.keys(getLicenses( licInfo[answers.licenseOrg])),
    when: (answers) => {
      let licOrgList = licInfo[answers.licenseOrg];
      if (licOrgList.length > 0) {
        return true
      } else { return false };
    }
  },
];

// TODO: Create a function to write README file
function writeToFile(data) {
  const filename = `ReadMe_${data.projectName.toLowerCase().split(' ').join('')}.json`;

  fs.writeFile(filename, JSON.stringify(data, null, '\t'), (err) =>
    err ? console.log(err) : console.log('Success!')
  );
}

// TODO: Create a function to initialize app
function init() {
  inquirer
    .prompt(questions)
    .then((data) => {

      writeToFile(data);
     
    });
}

// Function call to initialize app
init();




