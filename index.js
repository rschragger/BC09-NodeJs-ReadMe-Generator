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

// Try to make a series of alternate questions
function followUpQsLicense(){
  let whenQuestion;
for(let q = 0; q<licInfo.length; q++) {
 whenQuestion +=
  {
    type: 'list',
  message: 'What license version would you prefer?',
  name: 'license',
  choices: licInfo[q].licenseName,

  when(answers) {
    return answers.licenseOrg === licInfo[q]
  },
  
}
return whenQuestion
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
//   { 
//     for(let q = 0; q<licInfo.length; q++) {

//     type: 'list',
//     message: 'What license version would you prefer?',
//     name: 'license',
//     choices: licInfo[q].licenseName,
//     //choices: Object.keys(getLicenses(licInfo[await answers.licenseOrg])),

//     when(answers) {
//       return answers.licenseOrg === licInfo[q]
//     },
//   }

// },
followUpQsLicense()
}
];

// TODO: Create a function to write README file
function writeToFile(answers) {
  const filename = `ReadMe_${answers.projectName.toLowerCase().split(' ').join('')}.json`;

  fs.writeFile(filename, JSON.stringify(answers, null, '\t'), (err) =>
    err ? console.log(err) : console.log('Success!')
  );
}

// TODO: Create a function to initialize app
function init() {
  inquirer
    .prompt(questions)
    .then((answers) => {

      writeToFile(answers);

    })
    .catch((err => {
      console.log(err)
    }))
}

// Function call to initialize app
init();




