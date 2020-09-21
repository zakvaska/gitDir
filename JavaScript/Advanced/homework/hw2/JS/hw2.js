var part1 = document.getElementById('part1');
var headers = part1.querySelector('#id1'); //part1.getElementById('id1'); не работает
headers.style.color = 'red';
var lorem = part1.getElementsByClassName('class1')[0];
lorem.style.color = 'blue';
lorem.style.fontSize = '14px';
lorem.style.textDecoration = 'underline';
lorem.classList.add('newClass');
console.log(`cssText: ${lorem.style.cssText}`);


var part2 = document.getElementById('part2');
var allElements = part2.querySelectorAll('*');
for (var i = 0; i < allElements.length; i++) {
    allElements[i].style.color = 'red';
}
var paragraphs = document.querySelectorAll('p');
for (var i = 0; i < paragraphs.length; i++) {
    paragraphs[i].style.color = 'brown';
}
var elementsWithClass = part2.querySelectorAll('.class');
for (var i = 0; i < elementsWithClass.length; i++) {
    elementsWithClass[i].style.color = 'green';
}
var links = part2.querySelectorAll('a');
for (var i = 0; i < links.length; i++) {
    links[i].style.fontWeight = 'bold';
    links[i].style.fontStyle = 'italic';
    links[i].style.textDecoration = 'underline';
}
var linksAndParagraphs = part2.querySelectorAll('p, a');
for (var i = 0; i < linksAndParagraphs.length; i++) {
    linksAndParagraphs[i].style.textTransform = 'uppercase';    
}


var part3 = document.getElementById('part3');
paragraphs = part3.querySelectorAll('p');
for (var i = 0; i < paragraphs.length; i++) {
    paragraphs[i].style.color = 'brown';
}
var spanInLinkInParagraphInDiv = part3.querySelectorAll('div p a span');
for (var i = 0; i < spanInLinkInParagraphInDiv.length; i++) {
    spanInLinkInParagraphInDiv[i].style.color = 'red';
}
spanInDiv = part3.querySelectorAll('div > span');
for (var i = 0; i < spanInDiv.length; i++) {
    spanInDiv[i].style.color = 'green';
}


var part4 = document.getElementById('part4');
var firstParagraphsAfterDivs = part4.querySelectorAll('div + p');
for (var i = 0; i < firstParagraphsAfterDivs.length; i++) {
    firstParagraphsAfterDivs[i].style.backgroundColor = 'yellow';
}
var allUnorderedListsAfterParagraphs = part4.querySelectorAll('p ~ ul');
for (var i = 0; i < allUnorderedListsAfterParagraphs.length; i++) {
    allUnorderedListsAfterParagraphs[i].style.background = '#ff0000';
}


var part5 = document.getElementById('part5');
var linksWithTarget = part5.querySelectorAll('a[target]');
for (var i = 0; i < linksWithTarget.length; i++) {
    linksWithTarget[i].style.backgroundColor = 'yellow';
}
var linksWithTargetBlank = part5.querySelectorAll('a[target="_blank"]');
for (var i = 0; i < linksWithTargetBlank.length; i++) {
    linksWithTargetBlank[i].style.backgroundColor = 'red';
}

var idOne = document.getElementById('one');
var newDiv = document.createElement('div');
newDiv.id = 'two';
newDiv.innerHTML = 'two';
idOne.insertAdjacentElement('afterEnd', newDiv);
newDiv.onclick = function () {    
    var anotherDiv = newDiv.cloneNode(true);
    anotherDiv.innerHTML = 'one and a half';
    anotherDiv.id = 'two_first';
    newDiv.id = 'two_second';
    newDiv.insertAdjacentElement('beforebegin', anotherDiv);
}