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


let cart_main = JSON.parse(localStorage.getItem('cart')) || [];
let uniqueCart = new Set(cart_main.map(JSON.stringify));
let cart = Array.from(uniqueCart).map(JSON.parse);


let products_in_cart = document.querySelector('.products_in_cart')
products_in_cart.innerHTML = cart.length