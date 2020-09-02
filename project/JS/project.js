var positions = ['Junior developer', 'Middle developer', 'Senior developer', 'Junior QA', 'Middle QA', 'Senior QA', 'Project manager'];
var names = Array();
function getNames() {
    for (var i = 0; i < positions.length; i++) {
        var name = prompt('Введите имя ' + (i + 1) + ' из ' + positions.length);
        names[i] = name;
    }
}
var team = new Object();
function createTeam() {
    team.workers = Array();
    for (var i = 0; i < names.length; i++) {
        team.workers[i] = new Object();
        team.workers[i].name = names[i];
        team.workers[i].position = positions[i];
    }
}
function setSalary() {
    function calculateSalary(position) {
        var bottom, top;
        if (position.indexOf('Junior') != -1) {
            bottom = 500;
            top = 1000;
        } else if (position.indexOf('Middle') != -1) {
            bottom = 1500;
            top = 2000;
        } else if (position.indexOf('Senior') != -1) {
            bottom = 2500;
            top = 3000;
        } else {
            bottom = 4000;
            top = 4500;
        }
        return Math.round(Math.random() * (top - bottom) + bottom);
    }
    for (var i = 0; i < team.workers.length; i++) {
        team.workers[i].salary = calculateSalary(team.workers[i].position);
    }
}
getNames();
createTeam();
setSalary();
for (var i = 0; i < team.workers.length; i++) {
    team.workers[i].tellAboutYourself = function () {        
        console.log('Меня зовут ' + this.name + ' - ' + this.position + '. Зарплата - ' + this.salary + '$.');
    }
}
team.showTeam = function () {
    for (var i = 0; i < team.workers.length; i++) {
        team.workers[i].tellAboutYourself();
    }
}
team.showTeam();