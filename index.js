'use strict';

require('dotenv').config();
let githubhook = require('githubhook');
let gh = githubhook({secret: process.env.GITHUB_SECRET});
let fs = require('fs');
let shell = require('shelljs');
let jsonfile = require('jsonfile');

let rulesExists = fs.existsSync('./rules.json');

let allRules = rulesExists ? jsonfile.readFileSync('./rules.json') : jsonfile.readFileSync('./rules.example.json');

gh.listen();

gh.on('*', function(event, repo, ref, data) {
  console.log(event);
  console.log(repo);
  console.log(ref);
  data.request = undefined;
  fs.appendFileSync('dataLog.log', JSON.stringify(data) + '\r\n');
  checkRules(repo, ref, allRules);
});

function checkRules(repo, branch, rules) {
  branch = branch.replace('refs/heads/', '');

  let matches = rules.filter(x => x.enabled && x.repo === repo && x.branch === branch);

  matches.forEach(x => {
    let proc = x.run;
    shell.exec(proc);
  });
}
