'use strict';

require('dotenv').config();
let githubhook = require('githubhook');
let gh = githubhook({secret: process.env.GITHUB_SECRET});
let fs = require('fs');

let allRules = require('./rules.json');

gh.listen();

gh.on('*', function(event, repo, ref, data) {
  console.log(event);
  console.log(repo);
  console.log(ref);
  data.request = undefined;
  fs.appendFileSync('dataLog.log', JSON.stringify(data) + '\r\n');
});

function checkRules(repo, branch, rules) {
  let matches = rules.filter(x => x.repo === repo && x.branch === branch);

}
