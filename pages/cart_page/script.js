import { getRandomItems, highlightMatch, updateProgressBar } from "../../modules/functions";
import { displayRandomProductTitles } from "../../modules/header";
import { getData } from "../../modules/http"
import { reloadRandomSearch, updateCart } from "../../modules/reloads";

let cart_main = JSON.parse(localStorage.getItem('cart')) || []
let totalQuantities = JSON.parse(localStorage.getItem('quantity')) || {};
let cart = [...new Set(cart_main.map(item => item))];

let total_price_with_discount = document.querySelector('.total')
let total_price_without_discount = document.querySelector('.total_price')
let economy_p = document.querySelector('.economy')

let uniqueProducts = {}

let progress_bar_twenty = document.querySelector('.progress_bar_twenty')
let progress_bar_milion = document.querySelector('.progress_bar_milion')

let buy = document.querySelector('.buy')

cart.forEach(item => {
    let key = item.id
    let copy = uniqueProducts[key]

    if (copy) {
        if (item.quantity) {
            copy.quantity += item.quantity
        } else {
            copy.quantity += 1
        }
    } else {
        uniqueProducts[key] = { ...item }
    }
})

let uniqueCart = Object.values(uniqueProducts)

let box = document.querySelector('.box')
let no_goods = document.querySelector('.no_goods')

if (cart.length === 0) {
    box.classList.add('hidden_box')
    no_goods.classList.remove('hidden_box')
} else {
    box.classList.remove('hidden_box')
    no_goods.classList.add('hidden_box')
}

let to_main = document.querySelector('.to_main')

to_main.onclick = () => {
    location.assign('/')
}

let items_box = document.querySelector('.items')

let cart_amount = document.querySelector('.cart_amount')
cart_amount.innerHTML = `${uniqueCart.length} товаров`

let cart_amount_sum = document.querySelector('.cart_amount_sum')
cart_amount_sum.innerHTML = ` (${uniqueCart.length})`


let total = 0
let total_price = 0


function reload_cart_items(arr, place) {
    place.innerHTML = ''

    let first_total = 0
    let second_total = 0

    for (let item of arr) {
        let product = document.createElement('div')
        product.classList.add('item')

        let select_box = document.createElement('div')
        select_box.classList.add('select')

        let item_check = document.createElement('input')
        item_check.type = 'checkbox'
        item_check.classList.add('item_check')

        select_box.append(item_check)

        let photo_box = document.createElement('div')
        photo_box.classList.add('item_photo')

        let item_img = document.createElement('img')
        item_img.src = item.media[0]
        item_img.alt = item.title.substring(10)

        photo_box.append(item_img)

        let item_info = document.createElement('div')
        item_info.classList.add('item_info')

        let item_name_del_item = document.createElement('div')
        item_name_del_item.classList.add('item_name_del_item')


        let item_name = document.createElement('p')
        item_name.classList.add('item_name')

        item_name.innerText = item.title

        let del_item = document.createElement('button')
        del_item.classList.add('del_item')

        let del_img = document.createElement('img')
        del_img.src = '/public/bin.svg'
        del_img.alt = 'delete'

        let del_span = document.createElement('span')
        del_span.innerHTML = 'Удалить'

        del_item.append(del_img, del_span)

        item_name_del_item.append(item_name, del_item)



        let item_price_counter = document.createElement('div')
        item_price_counter.classList.add('item_price_counter')

        let options = document.createElement('div')
        options.classList.add('options')

        let seller = document.createElement('p')
        seller.innerText = 'Продавец: '

        let seller_span = document.createElement('span')
        seller_span.innerHTML = 'UZUM MARKET'

        seller.append(seller_span)

        let color = document.createElement('p')
        color.innerText = 'Цвет: '

        let color_span = document.createElement('span')
        color_span.classList.add('item_color')

        color_span.innerHTML = item.colors[0]

        color.append(color_span)

        options.append(seller, color)


        let counter_price = document.createElement('div')
        counter_price.classList.add('counter_price')

        let counter_box = document.createElement('div')
        counter_box.classList.add('counter_box')

        let amount_counter = document.createElement('div')
        amount_counter.classList.add('amount_counter')

        counter_box.append(amount_counter)

        let minus = document.createElement('button')
        minus.classList.add('minus')
        minus.classList.add('opacity')


        let minus_img = document.createElement('img')
        minus_img.src = '/public/minus.png'

        minus.append(minus_img)

        let amount = document.createElement('p')
        amount.classList.add('amount')

        amount.innerText = totalQuantities[item.id] || 1;


        let plus = document.createElement('button')
        plus.classList.add('plus')


        let plus_img = document.createElement('img')
        plus_img.src = '/public/plus.png'

        plus.append(plus_img)

        amount_counter.append(minus, amount, plus)

        if (+amount.innerHTML > 1) {
            minus.classList.remove('opacity')
        }


        let prices_box = document.createElement('div')
        prices_box.classList.add('prices')

        counter_price.append(prices_box)

        let item_discounted_price = document.createElement('p')
        item_discounted_price.classList.add('item_discounted_price')


        let discount_amount = (item.price * item.salePercentage) / 100
        let discounted_price = item.price - discount_amount

        discounted_price = totalQuantities[item.id] * discounted_price


        if (item.quantity) {
            item_discounted_price.innerText = `${Math.floor(discounted_price * totalQuantities[item.id])} сум`
        } else {
            item_discounted_price.innerText = `${Math.floor(discounted_price)} сум`
        }

        let item_price = document.createElement('p')
        item_price.classList.add('item_price')


        item_price.innerText = `${totalQuantities[item.id] * item.price} сум`
        if (!item.salePercentage > 0) {
            item_price.innerHTML = ''
        }

        prices_box.append(item_discounted_price, item_price)

        item_price_counter.append(options, counter_price)

        counter_box.append(amount_counter)

        counter_price.prepend(counter_box)

        item_info.append(item_name_del_item, item_price_counter)


        product.append(select_box, photo_box, item_info)

        place.append(product)

        item_check.checked = true

        item_check.addEventListener('change', () => {
            if (item_check.checked) {
                first_total += calculateDiscountedPrice(item);
                second_total += calculatePrice(item);
            } else {
                first_total -= calculateDiscountedPrice(item);
                second_total -= calculatePrice(item);
            }

            total = first_total;
            total_price = second_total;

            total_price_without_discount.innerHTML = `${Math.floor(total_price)} сум`;
            total_price_with_discount.innerHTML = `${Math.floor(total)} сум`;

            updateEconomy(second_total, first_total);
            updateProgressBar(total, progress_bar_twenty, 20000);

            if (progress_bar_twenty.style.width === '100%') {
                updateProgressBar(total, progress_bar_milion, 1000000);
            } else {
                progress_bar_milion.style.width = '0%';
            }

            updateButton(total, buy);
        });


        item_name.onclick = () => {
            location.assign('/pages/good_page/?id=' + item.id)
        }

        plus.onclick = () => {
            updateQuantity(item.id, 1);
            reload_cart_items(uniqueCart, items_box)
            first_total += calculateDiscountedPrice(item);
            second_total += calculatePrice(item)
        };

        minus.onclick = () => {
            if (totalQuantities[item.id] > 1) {
                updateQuantity(item.id, -1);
                reload_cart_items(uniqueCart, items_box)
                first_total -= calculateDiscountedPrice(item);
                second_total -= calculatePrice(item)
            }
        };

        first_total += calculateDiscountedPrice(item);
        second_total += calculatePrice(item)

        del_item.onclick = () => {
            uniqueCart = uniqueCart.filter(cartItem => cartItem.id !== item.id);
            localStorage.setItem('cart', JSON.stringify(uniqueCart));
            reload_cart_items(uniqueCart, items_box);

            first_total -= calculateDiscountedPrice(item);
            second_total -= calculatePrice(item);
            total = first_total;
            total_price = second_total;
            total_price_without_discount.innerHTML = `${Math.floor(total_price)} сум`;
            total_price_with_discount.innerHTML = `${Math.floor(total)} сум`;
            updateEconomy(second_total, first_total);
            updateProgressBar(total, progress_bar_twenty, 20000);

            if (progress_bar_twenty.style.width === '100%') {
                updateProgressBar(total, progress_bar_milion, 1000000);
            } else {
                progress_bar_milion.style.width = '0%';
            }

            updateButton(total, buy);

            if (uniqueCart.length === 0) {
                box.classList.add('hidden_box')
                no_goods.classList.remove('hidden_box')
            } else {
                box.classList.remove('hidden_box')
                no_goods.classList.add('hidden_box')
            }

            updateCart()
        }
    }



    total = first_total
    total_price = second_total
    total_price_without_discount.innerHTML = `${Math.floor(total_price)} сум`
    total_price_with_discount.innerHTML = `${Math.floor(total)} сум`

    updateEconomy(second_total, first_total);

    updateProgressBar(total, progress_bar_twenty, 20000)
    if (progress_bar_twenty.style.width === '100%') {
        updateProgressBar(total, progress_bar_milion, 1000000)
    } else {
        progress_bar_milion.style.width = '0%'
    }

    updateButton(total, buy)
}


function updateEconomy(second_total, first_total) {
    let economy = Math.round(second_total - first_total);
    economy_p.innerHTML = `Вы экономите: ${economy} сум`;
}

function updateButton(total, button) {
    if (total > 1) {
        button.style.background = '#7000FF'
        button.style.color = 'white'
    }
}

function updateQuantity(itemId, amount) {
    totalQuantities[itemId] = (totalQuantities[itemId] || 0) + amount;
    localStorage.setItem('quantity', JSON.stringify(totalQuantities));
}

function calculateDiscountedPrice(item) {
    let discount_amount = (item.price * item.salePercentage) / 100;
    let discounted_price = item.price - discount_amount;
    let total = totalQuantities[item.id] * discounted_price;
    return total
}

function calculatePrice(item) {
    return totalQuantities[item.id] * item.price;
}


reload_cart_items(uniqueCart, items_box)


buy.onclick = () => {
    alert('Товар едет к вам')
    location.assign('/')
}


function tomorrow(text) {
    let today = new Date()
    let tomorrow = new Date(today)

    tomorrow.setDate(today.getDate() + 1)

    let months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
    let month = months[tomorrow.getMonth()]

    let tomorrow_day = tomorrow.getDate()

    text.innerHTML = `${tomorrow_day}  ${month}   (Завтра)`
}

let dost = document.querySelector('.dost')
let dostavka_info = document.querySelector('.dostavka_info span')
tomorrow(dostavka_info)
tomorrow(dost)







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
let close = registration_modal.querySelector('.close')
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

close.onclick = () => {
    registration_modal.classList.add('hidden_reg_modal')
    body.style.overflowY = 'scroll'
}