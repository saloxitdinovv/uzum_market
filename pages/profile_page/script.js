// import { get } from "firebase/database";
// import { getData, patchData } from "../../modules/http";

// let user_id = JSON.parse(localStorage.getItem('user_id')) || [];

// let surname_input = document.querySelector('.surname_input')
// let name_input = document.querySelector('.name_input')
// let sur_name_input = document.querySelector('.sur_name_input')
// let email_input = document.querySelector('.email_input')
// let number_input = document.querySelector('.number_input')
// let save_button = document.querySelector('.save')
// let quit = document.querySelector('.quit')


// let form = document.forms.user

// let inputs = document.querySelectorAll('.main_info_inputs')


// getData('/users')
//     .then(users => {
//         let user = Object.values(users).find(userData => userData.name === user_id);

//         console.log(user.id);

//         surname_input.value = user.surname || null
//         name_input.value = user.name || null
//         number_input.value = user.phone || null
//         email_input.value = user.email || null
//         sur_name_input.value = user.sur_name || null


//         form.onsubmit = (e) => {
//             e.preventDefault()
//             submit(user);
//         }
//     })


// function submit(userId) {
//     let updatedUserData = {
//         name: name_input.value,
//         phone: number_input.value,
//         surname: surname_input.value,
//         email: email_input.value,
//         sur_name: sur_name_input.value
//     };

//     patchData('/users/' + user.name, updatedUserData)
//         .then(res => {
//             console.log('Данные пользователя успешно обновлены:', res);
//         })
//         .catch(error => {
//             console.error('Ошибка при обновлении данных пользователя:', error);
//         });
// }


// quit.onclick = () => {
//     localStorage.removeItem('user_id')
//     location.assign('/')
// }




// import { getData, patchData } from "../../modules/http";

// let user_id = JSON.parse(localStorage.getItem('user_id')) || [];

// let surname_input = document.querySelector('.surname_input')
// let name_input = document.querySelector('.name_input')
// let sur_name_input = document.querySelector('.sur_name_input')
// let email_input = document.querySelector('.email_input')
// let number_input = document.querySelector('.number_input')
// let save_button = document.querySelector('.save')
// let quit = document.querySelector('.quit')

// let form = document.forms.user
// let inputs = document.querySelectorAll('.main_info_inputs')

// getData('/users')
//     .then(users => {
//         let userKeys = Object.keys(users);
//         let user_key = userKeys.find(key => users[key].name === user_id);
//         let user = users[user_key]

//         console.log(user);

//         surname_input.value = user.surname || null
//         name_input.value = user.name || null
//         number_input.value = user.phone || null
//         email_input.value = user.email || null
//         sur_name_input.value = user.sur_name || null

//         form.onsubmit = (e) => {
//             e.preventDefault();
//             submit(user_key);
//         }
//     })

// function submit(user_key) {
//     let user = {};

//     let fm = new FormData(form);

//     fm.forEach((value, key) => {
//         user[key] = value;
//     });

//     patchData('/users/' + user_key, user)
// }

// quit.onclick = () => {
//     localStorage.removeItem('user_id');
//     location.assign('/');
// }







// let menu_main_page = document.querySelector('.menu_main_page')
// menu_main_page.onclick = () => {
//     location.assign('/')
// }

// let menu_catalog = document.querySelector('.menu_catalog')

// menu_catalog.onclick = () => {
//     location.assign('/pages/catalog_page/')
// }

// let market = document.querySelector('.market')

// market.onclick = () => {
//     location.assign('/pages/cart_page/')
// }

// let nav_menu_loved = document.querySelector('.nav_menu_loved')

// nav_menu_loved.onclick = () => {
//     location.assign('/pages/loved_page/')
// }



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

getData('/users')
    .then(users => {
        let userKeys = Object.keys(users);
        let user_key = userKeys.find(key => users[key].name === user_id);
        let user = users[user_key]

        surname_input.value = user && user.surname || null
        name_input.value = user && user.name || null
        number_input.value = user && user.phone || null
        email_input.value = user && user.email || null
        sur_name_input.value = user && user.sur_name || null

        form.onsubmit = (e) => {
            e.preventDefault();
            submit(user_key);
        }
    })

function submit(user_key) {
    let user = {};

    let fm = new FormData(form);

    fm.forEach((value, key) => {
        user[key] = value;
    });

    patchData('/users/' + user_key, user)
    localStorage.setItem('user_id', JSON.stringify(user.name))
}

quit.onclick = () => {
    localStorage.removeItem('user_id');
    location.assign('/');
}

let menu_main_page = document.querySelector('.menu_main_page')
menu_main_page.onclick = () => {
    location.assign('/')
}

let menu_catalog = document.querySelector('.menu_catalog')

menu_catalog.onclick = () => {
    location.assign('/pages/catalog_page/')
}

let market = document.querySelector('.market')

market.onclick = () => {
    location.assign('/pages/cart_page/')
}

let nav_menu_loved = document.querySelector('.nav_menu_loved')

nav_menu_loved.onclick = () => {
    location.assign('/pages/loved_page/')
}
