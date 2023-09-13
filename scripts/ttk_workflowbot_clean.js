// delete all files in the uploads directory
const fs = require('fs');
const path = require('path');

// clear directories
const adaptiveCards = path.join(__dirname, '../bot/src/adaptiveCards');
const cardActions = path.join(__dirname, '../bot/src/cardActions');
const comamnds = path.join(__dirname, '../bot/src/commands');

[adaptiveCards, cardActions, comamnds].forEach((dir) => {
  fs.readdir(dir, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      fs.unlink(path.join(dir, file), err => {
        if (err) throw err;
      });
    }
  })
});

// clear card models
const cardModels = path.join(__dirname, '../bot/src/cardModels.ts');
fs.readFile(cardModels, 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  var result = '';

  fs.writeFile(cardModels, result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
})

// clear commands and actions from bot
const initialize = path.join(__dirname, '../bot/src/internal/initialize.ts');
fs.readFile(initialize, 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  var result = data
    .replace(/commands: \[new HelloWorldCommandHandler\(\)\],/g, 'commands: [],') // clear commands
    .replace(/import \{ HelloWorldCommandHandler \} from \"..\/commands\/helloworldCommandHandler\";/g, '') // remove command import
    .replace(/actions: \[new DoStuffActionHandler\(\)\],/g, 'actions: [],') // clear actions
    .replace(/import \{ DoStuffActionHandler \} from \"..\/cardActions\/doStuffActionHandler\";/g, '') // remove action import
    .split('\n')
    // remove empty lines from beginning of file
    .filter((line, index, array) => {
      if (line.trim() === '') {
        if (index === 0) {
          return false;
        }
        return array[index - 1].trim() !== '';
      }
      return true;
    })
    .join('\n');

  fs.writeFile(initialize, result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
})

// clear commands from manifest
const manifest = path.join(__dirname, '../templates/appPackage/manifest.template.json');
fs.readFile(manifest, 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  var result = data
    .replace(/"commands": \[([\s\S]*?)\]/gm, '"commands": []') // clear commands

  fs.writeFile(manifest, result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
})