import { getData } from "../../modules/http"
import { reload_categories } from "../../modules/reloads"

let categories = []
let catalog_box = document.querySelector('.catalog_box')

getData('/goods')
    .then(res => {
        let goods = res
        goods.filter(good => {
            let category = good.type
            categories.push(category)
        })
        let counts = categories.reduce((acc, item) => {
            acc[item] = (acc[item] || 0) + 1;
            return acc;
        }, {});
        reload_categories(counts, catalog_box)
    })





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


let registration_modal = document.querySelector('.registration_modal')
let bg = registration_modal.querySelector('.bg')
let close_reg = registration_modal.querySelector('.close')
let body = document.body
let menu_profile = document.querySelector('.menu_profile')

let user_id = JSON.parse(localStorage.getItem('user_id')) || null;

menu_profile.onclick = () => {
    if (user_id === null) {
        registration_modal.classList.remove('hidden_reg_modal')
        body.style.overflow = 'hidden'
    } else {
        location.assign('/pages/profile_page/')
    }
}

bg.onclick = () => {
    registration_modal.classList.add('hidden_reg_modal')
    body.style.overflowY = 'scroll'
}

close_reg.onclick = () => {
    registration_modal.classList.add('hidden_reg_modal')
    body.style.overflowY = 'scroll'
}



let cart_main = JSON.parse(localStorage.getItem('cart')) || [];
let uniqueCart = new Set(cart_main.map(JSON.stringify));
let cart = Array.from(uniqueCart).map(JSON.parse);


let products_in_cart = document.querySelector('.products_in_cart')
products_in_cart.innerHTML = cart.length