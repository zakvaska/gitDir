var choosenIndex = -1;
var unorderedList = document.getElementById('list');
var handler;
var functions = new Object();
var htmlNodes = unorderedList.children;
var inputs = document.getElementsByTagName('input');
var chooseFirstBtn = document.getElementById('First');
var chooseLastBtn = document.getElementById('Last');
var goPrevBtn = document.getElementById('Prev');
var goNextBtn = document.getElementById('Next');
var addBegin = document.getElementById('AddBegin');
var addEnd = document.getElementById('AddEnd');
var deleteBtn = document.getElementById('Delete');
var buttons = {
    isEmptyList: 0,
    areActive1stChooseBtns: 1,
    areActive2ndChooseBtns: 0,
    firstChooseButtons: [chooseFirstBtn, chooseLastBtn],
    secondChooseButtons: [goPrevBtn, goNextBtn, deleteBtn]
};
document.onload = (function () {
    saveFunctions();
    toggleButtons('off', buttons.secondChooseButtons);
    updateIndexes();
})();
for (var i = 0; i < unorderedList.children.length; i++) {
    unorderedList.children[i].style.cursor = 'pointer';
};
function updateIndexes() {//запись индексов элементов в эти же элементы, чтобы при клике на элемент узнать его индекс
    for (var i = 0; i < htmlNodes.length; i++) {
        htmlNodes[i].num = i;
    };
};
function clickOnListItem(listItem) {
    unchooseElement(choosenIndex);
    choosenIndex = listItem.num;
    chooseElement(listItem.num);
};
function saveFunctions() {//сохраняю обработчики для последующего возобновления или копирования 
    //в новые элементы списка. Другого способа задать обработчик не через html-атрибут не нашел    
    for (var i = 0; i < inputs.length; i++) {
        functions[inputs[i].id] = inputs[i].onclick;
    };
    handler = unorderedList.children[0].onclick;
};
function toggleButtons(action, btnArray) {
    if (action == 'off') {
        for (var i = 0; i < btnArray.length; i++) {
            btnArray[i].style.opacity = '0.1';
            btnArray[i].onclick = '';
        }
    } else if (action == 'on') {
        for (var i = 0; i < btnArray.length; i++) {
            btnArray[i].style.opacity = '1';
            btnArray[i].onclick = functions[btnArray[i].id];
        }
    };
};
function manageButtonsAvailability() {
    if (unorderedList.children.length == 0) {
        buttons.isEmptyList = 1;
        buttons.areActive1stChooseBtns = 0;
        buttons.areActive2ndChooseBtns = 0;
        toggleButtons('off', buttons.firstChooseButtons);
        toggleButtons('off', buttons.secondChooseButtons);
    } else if (buttons.isEmptyList == 1) {
        buttons.isEmptyList = 0;
        buttons.areActive1stChooseBtns = 1;
        toggleButtons('on', buttons.firstChooseButtons);
    };
    if (choosenIndex >= 0 && buttons.areActive2ndChooseBtns == 0 && unorderedList.children.length > 1) {
        buttons.areActive2ndChooseBtns = 1;
        toggleButtons('on', buttons.secondChooseButtons);
    };

};
function chooseElement(index) { //выбор элемента с указанным индексом
    if (htmlNodes.length > 0) {
        var choosenListItem = htmlNodes[index];
        choosenListItem.style.color = 'green';
        choosenListItem.style.backgroundColor = 'yellow';
    };
    manageButtonsAvailability();
};
function unchooseElement(index) { //снятие выделения для перемещения выбора
    if (choosenIndex >= 0) {
        var choosenListItem = htmlNodes[index];
        choosenListItem.removeAttribute('style');
    }
};
function chooseFirst() { //выбор первого элемента
    console.log(`choosenIndex = ${choosenIndex}`);
    unchooseElement(choosenIndex);
    choosenIndex = 0;
    console.log(`choosenIndex = ${choosenIndex}`);
    chooseElement(choosenIndex);
};
function chooseLast() { //выбор последнего элемента
    unchooseElement(choosenIndex);
    var lastIndex = htmlNodes.length - 1;
    choosenIndex = lastIndex;
    chooseElement(choosenIndex);
};
function goPrev() { //выбор следующего элемента
    unchooseElement(choosenIndex);
    choosenIndex--;
    if (choosenIndex < 0) {
        choosenIndex = htmlNodes.length - 1;
    };
    chooseElement(choosenIndex);
};
function goNext() { //выбор предыдущего элемента
    unchooseElement(choosenIndex);
    choosenIndex++;
    if (choosenIndex > htmlNodes.length - 1) {
        choosenIndex = 0;
    };
    chooseElement(choosenIndex);
};
function addToBegin(form) { //добавление нового элемента в начало списка
    if (form.input.value) {
        var newListItem = document.createElement('li');
        newListItem.innerHTML = form.input.value;
        newListItem.style.cursor = 'pointer';
        newListItem.onclick = handler;
        var firstListItem = htmlNodes[0];
        unorderedList.insertBefore(newListItem, firstListItem);
        if (choosenIndex >= 0) {
            choosenIndex++; /*Добавление нового элемента в начало списка сдвигает индекс всех остальных элементов на 1*/
        };
        manageButtonsAvailability();
        updateIndexes();
    };
};
function addToEnd(form) { //добавление нового элемента в конец списка
    if (form.input.value) {
        var newListItem = document.createElement('li');
        newListItem.innerHTML = form.input.value;
        newListItem.style.cursor = 'pointer';
        newListItem.onclick = handler;
        unorderedList.appendChild(newListItem);
        manageButtonsAvailability();
        updateIndexes();
    };
};
function deleteElement() {
    if (choosenIndex >= 0) {
        var itemToDelete = htmlNodes[choosenIndex];
        unorderedList.removeChild(itemToDelete);
        if (choosenIndex == htmlNodes.length) { //Например из массива с длинной 5 и индексом последнего элемента 4 сразу после удаления соответствующего
            //html-узла из DOM-дерева удаляется последний элемент. Обновляется массив, длинна теперь на 1 меньше, то есть 4.
            //В choosenIndex все еще старый индекс. Он сравнивается с новой длинной массива
            //Если они совпадают - значит удаленный элемент был последним в списке и нужно выделить новый последний элемент
            chooseElement(--choosenIndex); //выделяем новый последний элемент после удаления последнего 
        } else {
            chooseElement(choosenIndex);
        };
        updateIndexes();
    };
};


