var choosenIndex = 0;
var unorderedList = document.getElementById('list');
var htmlNodes = new Array();
(function () {
    var nodes = unorderedList.childNodes;
    var counter = 0;
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].nodeType === 1) {
            htmlNodes[counter] = nodes[i];
            counter++;
        }
    };
})();
function resetHTMLNodes() { //обновление массива html-элементов после изменения DOM-дерева
    var nodes = unorderedList.childNodes;
    var counter = 0;
    htmlNodes = new Array(); //пересоздние массива для обновления длинны массива на случай удаления элементов
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].nodeType === 1) {
            htmlNodes[counter] = nodes[i];
            counter++;
        }
    };
    // console.log(htmlNodes);
};
function chooseElement(index) { //выбор элемента с указанным индексом
    var choosenListItem = htmlNodes[index];
    choosenListItem.style.color = 'green';
    choosenListItem.style.backgroundColor = 'yellow';
    // console.log(`index = ${index}`);
};
function unchooseElement(index) { //снятие выделения для перемещения выбора
    var choosenListItem = htmlNodes[index];
    choosenListItem.removeAttribute('style');
};
function chooseFirst() { //выбор первого элемента
    console.log(`choosenIndex = ${choosenIndex}`);
    unchooseElement(choosenIndex);
    choosenIndex = 0;
    chooseElement(choosenIndex);
};
function chooseLast() { //выбор последнео элемента
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
        var firstListItem = htmlNodes[0];
        unorderedList.insertBefore(newListItem, firstListItem);
        resetHTMLNodes();   
        choosenIndex++; /*Добавление нового элемента в начало списка сдвигает индекс всех остальных элементов на 1*/      
    };
};
function addToEnd(form) { //добавление нового элемента в конец списка
    if (form.input.value) {
        var newListItem = document.createElement('li');
        newListItem.innerHTML = form.input.value;
        unorderedList.appendChild(newListItem);
        resetHTMLNodes();
    };
};
function deleteElement() {
    var itemToDelete = htmlNodes[choosenIndex];
    unorderedList.removeChild(itemToDelete);
    resetHTMLNodes();
    // console.log(`choosenIndex = ${choosenIndex}`);
    // console.log(`htmlNodes.length = ${htmlNodes.length}`);    
    if (choosenIndex == htmlNodes.length) { //Например из массива с длинной 5 и индексом последнего элемента 4 сразу после удаления соответствующего
                                            //html-узла из DOM-дерева удаляется последний элемент. Обновляется массив, длинна теперь на 1 меньше, то есть 4.
                                            //В choosenIndex все еще старый индекс. Он сравнивается с новой длинной массива
                                            //Если они совпадают - значит удаленный элемент был последним в списке и нужно выделить новый последний элемент
        chooseElement(--choosenIndex); //выделяем новый последний элемент после удаления последнего 
    } else {
        chooseElement(choosenIndex); 
    }       
    // console.log(`choosenIndex = ${choosenIndex}`);
};


