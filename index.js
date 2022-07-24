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

function lister(commaText, preMessage) {
  if (!commaText) { return '' };
  if (commaText.includes(',')) {
    //Need to end the list https://stackoverflow.com/questions/18313462/github-markdown-wont-end-a-list
    return preMessage + "\n- " + commaText.split(',').join('\n- ').replace('  ', ' ') + "\n</p>"
  } else { return preMessage + ' ' + commaText }
}


function createFileText(answers) {
  return '' +
    `# ${answers.projectName}

  ## Description
  
  ${licInfo[answers.licenseOrg][0].licenseBadge}
  
  ${answers.description}
  
  ## Table of Contents
  
  - [Installation](#installation)
  - [Usage](#usage)
  - [Credits](#credits)
  - [License](#license)
  - [Features](#features)
      - [Contributions](#contributions)
  - [Tests](#tests)
  - [Questions](#questions)
      - [Contacts](#contacts)
  
  ## Installation
  
  ${lister(answers.installationInst, "Installation Instructions:")}
  
  ## Usage
  
  ${lister(answers.usage, "Usage Instructions:")}
  
  ## Credits
  
  ${lister(answers.collaborators, "Collaborators")}

  ${lister(answers.languagesListed.toString().replace('Other', '') + answers.languagesListedOther, "Languages")}
  
  ${lister(answers.thirdPartyAssets, "Third Party Assets")}
  
  ${lister(answers.tutorials, "Tutorials")}
  
  ## License
  
  This application is licensed under ${answers.licenseOrg}\n
  ${licInfo[answers.licenseOrg][0].licenseName}
  
  ## Features
  ${lister(answers.features, '')}
  
  ### Contributions
  
  ${lister(answers.contributions, "Contribution guidelines:")}
  
  ## Tests
  ${lister(answers.tests, '')}
  
  ## Questions
  ${lister(answers.projQuestions, '')}
  
  ### Contacts
  
  You can reach me for additional questions at:
  [${answers.gitHubID} GitHub page](https://github.com/${answers.gitHubID})
`
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
    message: 'What is your GitHub ID?\n(just the ID only please)',
  },
  {
    type: 'input',
    name: 'projectName',
    message: `What is your Project's Name?`,
  },
  {
    type: 'input',
    name: 'description',
    message: `Please describe your Project`,
  },
  {
    type: 'checkbox',
    message: 'What languages are being used in this project?',
    name: 'languagesListed',
    choices: ['HTML', 'CSS', 'JavaScript', 'MySQL', 'Other'],
  },
  {
    type: 'input',
    message: 'What other languages are being used in this project?\n(Please use commas between languages)',
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
    message: `What are the Project's installation instruction?\n(Please use commas between steps)`,
  },
  /* */
  {
    type: 'input',
    name: 'usage',
    message: `What are the Project's usage instruction?\n(Please use commas between steps)`,
  },
  {
    type: 'input',
    name: 'collaborators',
    message: `Who else collaborated on this project?\n(Please use commas between person)`,
  },
  {
    type: 'input',
    name: 'thirdPartyAssets',
    message: `What third party assets were used in this project?\n(Please use commas between assets)`,
  },
  {
    type: 'input',
    name: 'tutorials',
    message: `What tutorials were referenced in this project?\n(Please use commas between references)`,
  },
  {
    type: 'input',
    name: 'features',
    message: `Please list special features in this project?\n(Please use commas between features)`,
  },
  {
    type: 'input',
    name: 'contributions',
    message: `Please explain how other may make contributions to this project?\n(Please use commas between instructions)`,
  },
  {
    type: 'input',
    name: 'tests',
    message: `Please list tests for this project?\n(Please use commas between tests)`,
  },
  {
    type: 'input',
    name: 'projQuestions',
    message: `Please list questions for this project?\n(Please use commas between questions)`,
  },
  /**/
];

// TODO: Create a function to write README file
function writeToFile(answers) {
  //console.log(answers)
  const filename = `ReadMe_${answers.projectName.toLowerCase().split(' ').join('')}.md`;
  const fileText = createFileText(answers);

  //  fs.writeFile(filename, JSON.stringify(answers, null, '\t'), (err) =>
  fs.writeFile(filename, fileText, (err) => err ? console.log(err) : console.log('Success!')
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




