import { getRandomItems, highlightMatch } from "../../modules/functions"
import { displayRandomProductTitles } from "../../modules/header"
import { getData, postData } from "../../modules/http"
import { reload, reloadRandomSearch } from "../../modules/reloads"

let favourite_box = document.querySelector('.favourite_box')
let loved = JSON.parse(localStorage.getItem('liked')) || []
let close = document.querySelector('.close')
let modal_buy = document.querySelector('.modal_buy')

getData('/goods')
    .then(res => {
        let goods = res
        let liked = []

        for (let id of loved) {
            goods.filter(good => {
                if (good.id === id) {
                    liked.push(good)
                }
            })
        }
        reload(liked, favourite_box)
    })


close.onclick = () => {
    setTimeout(() => {
        modal_buy.style.display = 'none'
        modal_buy.classList.remove('show');
    }, 300);
}







let popular_search_modal_box = document.querySelector('.popular_search_modal_box')
let found_items_box = document.querySelector('.found_items_box')

let first_floor = document.querySelector('.first_floor')

getData('/goods')
    .then(res => {
        let random = getRandomItems(res, 4)
        reloadRandomSearch(random, popular_search_modal_box)
    })


let search_input = document.querySelector('.mobile_search_input')
let mobile_search_modal = document.querySelector('.mobile_search_modal')
let close_search_modal = document.querySelector('.close_search_modal')

let mobile_search_modal_h1 = document.querySelector('.mobile_search_modal h1')


search_input.onclick = () => {
    mobile_search_modal.classList.remove('hide')
    close_search_modal.classList.remove('hide')
    document.body.classList.add('modal-open');
    first_floor.style.display = 'none'
}

close_search_modal.onclick = () => {
    mobile_search_modal.classList.add('hide')
    close_search_modal.classList.add('hide')
    document.body.classList.remove('modal-open');
    first_floor.style.display = 'flex'
}

let delete_search_input = document.querySelector('.delete_search_input')

search_input.onkeyup = () => {
    let inputValue = search_input.value.trim().toLowerCase();
    popular_search_modal_box.style.display = 'none'
    found_items_box.style.display = 'flex'
    mobile_search_modal_h1.innerHTML = 'Найденные'

    if (inputValue.length > 0) {
        delete_search_input.style.display = 'flex'
        getData('/goods')
            .then(res => {
                let goods = res
                let found = goods.filter(good => good.title.toLowerCase().includes(inputValue))

                console.log(found);

                reload_founded_results(found, found_items_box)
            })
    } else {
        popular_search_modal_box.style.display = 'flex'
        found_items_box.style.display = 'none'
        mobile_search_modal_h1.innerHTML = 'Популярное'
        delete_search_input.style.display = 'none'

        getData('/goods')
            .then(res => {
                displayRandomProductTitles(res)
            })
    }
}

delete_search_input.onclick = () => {
    search_input.value = ''
    popular_search_modal_box.style.display = 'flex'
    found_items_box.style.display = 'none'
    mobile_search_modal_h1.innerHTML = 'Популярное'
    delete_search_input.style.display = 'none'

    getData('/goods')
        .then(res => {
            displayRandomProductTitles(res)
        })
}


function reload_founded_results(arr, place) {
    place.innerHTML = ''
    for (let item of arr) {
        let resultItem = document.createElement('div');
        let result = document.createElement('p');
        let icon = document.createElement('img');
        icon.src = '/public/search.svg'
        resultItem.classList.add('found')

        result.innerHTML = highlightMatch(item.title, search_input.value);

        place.appendChild(resultItem);
        resultItem.append(icon, result)
        resultItem.onclick = () => {
            location.assign('/pages/good_page/?id=' + item.id)
        }
    }
}






let menu_main_page = document.querySelector('.menu_main_page')
menu_main_page.onclick = () => {
    location.assign('/')
}

let menu_catalog = document.querySelector('.menu_catalog')

menu_catalog.onclick = () => {
    location.assign('/pages/catalog/')
}

let market = document.querySelector('.market')

market.onclick = () => {
    location.assign('/pages/cart_page/')
}

let nav_menu_loved = document.querySelector('.nav_menu_loved')

nav_menu_loved.onclick = () => {
    location.assign('/pages/loved_page/')
}


let registration_modal = document.querySelector('.registration_modal')
let bg = registration_modal.querySelector('.bg')
let close_reg = registration_modal.querySelector('.close')
let body = document.body
let menu_profile = document.querySelector('.menu_profile')

menu_profile.onclick = () => {
    registration_modal.classList.remove('hidden_reg_modal')
    body.style.overflow = 'hidden'
}

bg.onclick = () => {
    registration_modal.classList.add('hidden_reg_modal')
    body.style.overflowY = 'scroll'
}

close_reg.onclick = () => {
    registration_modal.classList.add('hidden_reg_modal')
    body.style.overflowY = 'scroll'
}