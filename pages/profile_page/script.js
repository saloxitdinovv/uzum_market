import { getData, patchData } from "../../modules/http";

let user_id = JSON.parse(localStorage.getItem('user_id')) || [];

let surname_input = document.querySelector('.surname_input')
let name_input = document.querySelector('.name_input')
let sur_name_input = document.querySelector('.sur_name_input')
let email_input = document.querySelector('.email_input')
let number_input = document.querySelector('.number_input')
let save_button = document.querySelector('.save')
let quit = document.querySelector('.quit')


let form = document.forms.user

let inputs = document.querySelectorAll('.main_info_inputs')

let users_id

getData('/users')
    .then(res => {
        let users = res
        let user_main = users.filter(user => user.name === user_id);
        let user = user_main[0]

        users_id = user.id

        surname_input.value = user.surname || null
        name_input.value = user.name || null
        number_input.value = user.phone || null
        email_input.value = user.email || null
        sur_name_input.value = user.sur_name || null


        form.onsubmit = (e) => {
            e.preventDefault()
            submit(users_id)
        }
    })



function submit(id) {
    let user = {};

    let fm = new FormData(form);

    fm.forEach((value, key) => {
        user[key] = value;
    });

    patchData('/users/' + id, user)
        .then((res) => {
            console.log('Данные пользователя успешно обновлены:', res);
        })
}


quit.onclick = () => {
    localStorage.removeItem('user_id')
    location.assign('/')
}