function processPhrase() {
    var input = readInput(); 
    var wordsArray = createArray(input);
    addListItems(wordsArray);
    var phrase = countAletters(input);
    alert(`There ${phrase.toBe} ${phrase.aLettersCount} 'a' letter${phrase.wordEnd}`);
};
function readInput() {
    var input = document.querySelector('input[type="text"]').value;
    return input;
};
function createArray(inputString) {
    var words = new Array();
    var spacesRegExp = /\s+/;
    // var spacesRegExp = new RegExp('\\s+');  //экранирование обратного слеша
    if (spacesRegExp.test(inputString)) {
        var words = inputString.split(spacesRegExp);
    };
    words[0] = words[0].toUpperCase();
    words[words.length - 1] = words[words.length - 1].substr(0, 1).toLowerCase().concat(words[words.length - 1].substr(1));
    words[words.length - 2] = words[words.length - 2].substr(0, 1).toLowerCase().concat(words[words.length - 2].substr(1));
    return words;
};
function addListItems(array) {
    var unorderedList = document.querySelector('ul');
    for (var i = 0; i < array.length; i++) {
        var newListItem = document.createElement('li');
        newListItem.innerHTML = array[i];
        unorderedList.appendChild(newListItem);
    };
};
function countAletters(inputString) {
    var phrase = new Object();
    var aRegExp = /a|а/g;
    var result;
    var aLetters = new Array();
    while ((result = aRegExp.exec(inputString)) != null) {
        aLetters.push(result);
        console.log("Найдено " + result + " в позиции " + result.index + ". Следующий поиск начнется с индекса " + aRegExp.lastIndex);
    };
    phrase.aLettersCount = aLetters.length;
    phrase.toBe = 'are';
    phrase.wordEnd = 's';
    if (phrase.aLettersCount == 1) {
        phrase.toBe = 'is';
        phrase.wordEnd = '';
    };
    if (phrase.aLetterCount == 0) {
        phrase.aLetterCount = 'no';
    };
    return phrase;
};