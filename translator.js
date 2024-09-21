const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

// Extract keys and values for replacements
const american = Object.keys(americanToBritishSpelling);
const british = Object.values(americanToBritishSpelling);
const onlyFromAmerican = Object.keys(americanOnly);
const onlyToBritish = Object.values(americanOnly);
const onlyFromBritish = Object.keys(britishOnly);
const onlyToAmerican = Object.values(britishOnly);
const americanTitles = Object.keys(americanToBritishTitles);
const britishTitles = Object.values(americanToBritishTitles);

// Helper function to create regex patterns for word replacements
const createRegex = (word) =>
  new RegExp(`(?<=^|[.'"\\s])${word}(?=[.'"\\s]|$)`, "gi");

// Helper function to replace words based on provided lists
const replaceWords = (str, words, replacements, isTitle = false) => {
  words.forEach((word, i) => {
    // Create a regex for the current word
    const regex = createRegex(word);
    // Determine the replacement text, capitalizing if necessary
    const replacement = isTitle
      ? replacements[i].replace(
          replacements[i][0],
          replacements[i][0].toUpperCase()
        )
      : replacements[i];
    // Replace the word in the string with highlighted version
    str = str.replace(regex, `<span class="highlight">${replacement}</span>`);
  });
  return str;
};

// Helper function to replace time formats (clock symbols)
const replaceClock = (str, symbol, replacement) => {
  const regex = new RegExp(`(\\d{1,2})${symbol}(\\d{1,2})`, "g");
  return str.replace(
    regex,
    `<span class="highlight">$1${replacement}$2</span>`
  );
};

class Translator {
  // Translate text based on the locale
  translate(str, locale) {
    let translatedStr = str;

    if (locale === "american-to-british") {
      // Replace American words with British equivalents
      translatedStr = replaceWords(translatedStr, american, british);
      // Replace words that are only in American English with British equivalents
      translatedStr = replaceWords(
        translatedStr,
        onlyFromAmerican,
        onlyToBritish
      );
      // Replace American titles with British titles
      translatedStr = replaceWords(
        translatedStr,
        americanTitles,
        britishTitles,
        true
      );
      // Replace American clock formats with British clock formats
      translatedStr = replaceClock(translatedStr, ":", ".");
    } else if (locale === "british-to-american") {
      // Replace British words with American equivalents
      translatedStr = replaceWords(translatedStr, british, american);
      // Replace words that are only in British English with American equivalents
      translatedStr = replaceWords(
        translatedStr,
        onlyFromBritish,
        onlyToAmerican
      );
      // Replace British titles with American titles
      translatedStr = replaceWords(
        translatedStr,
        britishTitles,
        americanTitles,
        true
      );
      // Replace British clock formats with American clock formats
      translatedStr = replaceClock(translatedStr, ".", ":");
    }

    // Return the translated string or a message if no changes were made
    return translatedStr !== str
      ? translatedStr
      : "Everything looks good to me!";
  }
}

module.exports = Translator;
