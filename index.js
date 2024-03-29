// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const licInfo = require('./assets/js/licenseInfo.js')

const open = require('open');


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
  if (!commaText || commaText === undefined) { return '' };
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

  ${lister(answers.languagesListed.toString().replace('Other', '') + lister(answers.languagesListedOther,''), "Languages")}
  
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
  - Email: [${answers.email}](mailto:${answers.email})

  - GitHub: [${answers.gitHubID} GitHub page](https://github.com/${answers.gitHubID})

  
  <div class="footer" style="text-align:right; font-size:smaller"><hr>
  &copy; Copyright ${(new Date(Date.now())).getFullYear()} ${answers.fullName}
</div>  `

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
    message: 'What is your GitHub ID?\n\x1b[36m(just the ID only please)',
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is your contact email address?',
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
    message: 'What other languages are being used in this project?\n\x1b[36m(Please use commas between languages)',
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
    message: `What are the Project's installation instruction?\n\x1b[36m(Please use commas between steps)`,
  },
  {
    type: 'input',
    name: 'usage',
    message: `What are the Project's usage instruction?\n\x1b[36m(Please use commas between steps)`,
  },
  {
    type: 'input',
    name: 'collaborators',
    message: `Who else collaborated on this project?\n\x1b[36m(Please use commas between person)`,
  },
  {
    type: 'input',
    name: 'thirdPartyAssets',
    message: `What third party assets were used in this project?\n\x1b[36m(Please use commas between assets)`,
  },
  {
    type: 'input',
    name: 'tutorials',
    message: `What tutorials were referenced in this project?\n\x1b[36m(Please use commas between references)`,
  },
  {
    type: 'input',
    name: 'features',
    message: `Please list special features in this project\n\x1b[36m(Please use commas between features)`,
  },
  {
    type: 'input',
    name: 'contributions',
    message: `Please explain how other may make contributions to this project\n\x1b[36m(Please use commas between instructions)`,
  },
  {
    type: 'input',
    name: 'tests',
    message: `Please list tests for this project\n\x1b[36m(Please use commas between tests)`,
  },
  {
    type: 'input',
    name: 'projQuestions',
    message: `Please list questions for this project\n\x1b[36m(Please use commas between questions)`,
  }
  
];

// TODO: Create a function to write README file
function writeToFile(answers) {
  //console.log(answers)
  const filename = `ReadMe_${answers.projectName.toLowerCase().split(' ').join('')}.md`;
  const fileText = createFileText(answers);

  //  fs.writeFile(filename, JSON.stringify(answers, null, '\t'), (err) =>
  fs.writeFile(filename, fileText, (err) => err ? console.log(err) : openReadMe()
  )
  //open file
  function openReadMe(){
    // https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
    console.log('\x1b[31m','Your ReadMe file has been created.\n','\x1b[0m')
  inquirer
    .prompt({
      type: 'confirm',
      name: 'openFileYN',
      message: `Would you like to open your new ReadMe file?`,
      // default:'Y'
    })
    .then((confirm) => {
      open(filename);

      /* fs.open does not work as expected, 
      used npm 'open' from https://stackoverflow.com/questions/62150879/fs-open-does-not-open-desired-file-in-nodejs
      //console.log('openFileYN: ' + confirm.openFileYN)
      if (confirm.openFileYN === true) {
        fs.open(filename, 'rs+', function (err, f) { console.log('error: ' + err); });
      }
      */
    })}

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




