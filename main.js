var button = document.getElementsByClassName('button')[0];
var section = document.getElementsByClassName('section')[0];

button.addEventListener('click', putInfo, false);

var loaded = false;

function putInfo() {
    section.style.visibility = 'visible';
    if (loaded) return;
    var users = JSON.parse(localStorage.getItem('users'));
    if (users) {
        fillTabs(users);
    } else {
        var newRequest = new XMLHttpRequest();
        newRequest.open('GET', 'https://reqres.in/api/users?page=2', true);
        newRequest.send();
        newRequest.onreadystatechange = function () {
            if (newRequest.readyState !== 4) return;
            if (newRequest.status !== 200) {
                alert('ошибка: ' + (newRequest.status ? newRequest.statusText : 'запрос не удался'));
            } else {
                try {
                    var users = JSON.parse(newRequest.response).data;
                    if (users.length) {
                        localStorage.setItem('users', JSON.stringify(users));
                        fillTabs(users);
                    }
                } catch {
                    showError();
                }
            }
        };
    }
    loaded = true;
}

function fillTabs(users) {
    for (var i = 0; i < users.length; i++) {
        var obj = users[i];
        if (obj) {
            section.insertAdjacentHTML('beforeEnd',
                '<input id="' + i + '" type="radio" name="name">' +
                '<label for="' + i + '" class="label">User ' + (i + 1) + '</label>'
                + '<div class="content"></div>');
        }
    }
    var input = section.getElementsByTagName('input')[0];
    input.setAttribute('checked', 'checked');
    var cont = section.getElementsByTagName('div');
    for (var j = 0; j < cont.length; j++) {
        cont[j].innerHTML = '<img src ="' + users[j].avatar + '">' + '</br>' + 'Last Name: '
            + users[j].last_name + '</br>' + 'First Name: ' + users[j].first_name;
    }
}

function showError() {
    section.insertAdjacentHTML('beforeBegin',
        '<p class="error">Произошло что-то не очень хорошее. Сочувствую</p>');
}










