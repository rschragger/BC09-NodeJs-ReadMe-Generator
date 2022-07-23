// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const licInfo = require('./assets/js/licenseInfo.js')



//Variables
var finalFileText = '';
var projectTitle = [];
var features = [];
var contributions = [];
var tests = [];
var projQuestions = [];
var gitHubID = [];

/* --- List of variables in the ReadMe doc -----
${projectTitle}
${description}
${installationInst}
${usage}
${collaborators}
${thirdPartyAssets}
${tutorials}
${licenseBadge}
${licenseOrg}
${licenseName}
${features}
${contributions}
${tests}
${questions}
${gitHubID}
 ----- ----- ----- ----- */

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
  {
    type: 'input',
    name: 'fullName',
    message: 'What is your full name? (Name Surname)',
  },
  {
    type: 'input',
    name: 'gitHubID',
    message: 'What is your GitHub ID?',
  },
  {
    type: 'input',
    name: 'projectName',
    message: `What is your Project's Name?`,
  },
  {
    type: 'checkbox',
    message: 'What languages are being used in this project?',
    name: 'languagesListed',
    choices: ['HTML', 'CSS', 'JavaScript', 'MySQL', 'Other'],
  },
  {
    type: 'input',
    message: 'What other languages are being used in this project?(Please use commas between languages)',
    name: 'languagesListedOther',
    when(answers) {
      return answers.languagesListed.includes('Other')
    },
  },
  {
    type: 'list',
    message: 'What license will be used for this project?',
    name: 'licenseOrg',
    choices: Object.keys(licInfo),
  },
  {
    type: 'input',
    name: 'installationInst',
    message: `What are the Project's installation instruction?(Please use commas between steps)`,
  },
  {
    type: 'input',
    name: 'usage',
    message: `What are the Project's usage instruction?(Please use commas between steps)`,
  },
  {
    type: 'input',
    name: 'collaborators',
    message: `Who else collaborated on this project?(Please use commas between person)`,
  },
  {
    type: 'input',
    name: 'thirdPartyAssets',
    message: `What third party assets were used in this project?(Please use commas between assets)`,
  },
  {
    type: 'input',
    name: 'tutorials',
    message: `What tutorials were referenced in this project?(Please use commas between references)`,
  },
  {
    type: 'input',
    name: 'features',
    message: `Please list special features in this project?(Please use commas between features)`,
  },
  {
    type: 'input',
    name: 'contributions',
    message: `Please list special features in this project?(Please use commas between features)`,
  },
  {
    type: 'input',
    name: 'tests',
    message: `Please list tests for this project?(Please use commas between tests)`,
  },
  {
    type: 'input',
    name: 'projQuestions',
    message: `Please list questions for this project?(Please use commas between questions)`,
  },

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




