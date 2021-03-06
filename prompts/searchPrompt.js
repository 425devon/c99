const inquirer = require('inquirer');
const _ = require('lodash');
const fuzzy = require('fuzzy');
const Promise = require('promise');
const allItems = require('../static/allItems');
inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

function searchItem(answers, input) {
  input = input || '';
  return new Promise(function(resolve) {
    setTimeout(function() {
      var fuzzyResult = fuzzy.filter(input, allItems.itemNames);
      resolve(fuzzyResult.map(function(el) {
        return el.original;
      }));
    }, _.random(30, 500));
  });
}


function searchPrompt(){
  return new Promise((resolve, reject) => {
    inquirer.prompt([
  {
      type: 'autocomplete',
      name: 'item',
      suggestOnly: false,
      message: 'What are you searching for?',
      source: searchItem,
      pageSize: 3,
      validate: function(val) {
        return val
          ? true
          : 'Type something!';
      }
    }
    ])
    .then(function(answers) {
      resolve(answers)
    })
  })
} 

module.exports = searchPrompt;




  

