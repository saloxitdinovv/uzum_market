import { getRandomProducts, highlightMatch } from "./functions"
import { getData, postData } from "./http"
import { reload_cart_products, reload_categories, reload_links, updateCart } from "./reloads"

let cart_main = JSON.parse(localStorage.getItem('cart')) || [];
let uniqueCart = new Set(cart_main.map(JSON.stringify));
let cart = Array.from(uniqueCart).map(JSON.parse);
let goods = []
let quantity = 0

const header = document.querySelector('header')

const first_header = document.createElement('div')
first_header.classList.add('first_header')
header.prepend(first_header)


let first_head_container = document.createElement('div')
first_head_container.classList.add('container')
first_header.append(first_head_container)

let first_head = document.createElement('div')
first_head.classList.add('first_head')
first_head_container.append(first_head)

let first_head_box_a = document.createElement('div')
let first_head_box_b = document.createElement('div')
let first_head_box_c = document.createElement('div')
first_head_box_a.classList.add('first_head_box')
first_head_box_b.classList.add('first_head_box')
first_head_box_c.classList.add('first_head_box')

first_head.append(first_head_box_a, first_head_box_b, first_head_box_c)

let location_box = document.createElement('div')
location_box.classList.add('location')
let location_box_img = document.createElement('img')
location_box_img.alt = 'Location'
location_box_img.src = '/location.svg'
location_box.innerText = 'Город:'
let location_span = document.createElement('span')
location_span.innerHTML = 'Ташкент'

location_box.prepend(location_box_img)
location_box.append(location_span)

first_head.prepend(first_head_box_a)


let first_head_box_p = document.createElement('p')
first_head_box_p.innerHTML = 'Пункты выдачи'

first_head_box_a.append(location_box, first_head_box_p)

let first_head_box_b_p = document.createElement('p')
first_head_box_b_p.innerHTML = 'Доставим ваш заказ бесплатно — всего за 1 день!'
first_head_box_b.append(first_head_box_b_p)


let first_head_box_c_p_a = document.createElement('p')
first_head_box_c_p_a.innerHTML = 'Вопрос-ответ'

let first_head_box_c_p_b = document.createElement('p')
first_head_box_c_p_b.innerHTML = 'Мои заказы'

let language_box = document.createElement('div')
language_box.classList.add('language')
let language_img = document.createElement('img')
language_img.alt = 'language'
language_img.src = '/public/language.svg'
language_box.innerHTML = 'Русский'
language_box.prepend(language_img)

first_head_box_c.append(first_head_box_c_p_a, first_head_box_c_p_b, language_box)





const middle_header = document.createElement('div')
middle_header.classList.add('middle_header')
header.append(middle_header)

let middle_header_container = document.createElement('div')
middle_header_container.classList.add('container')
middle_header.appendChild(middle_header_container)

let main_head = document.createElement('div')
main_head.classList.add('main_head')
middle_header_container.appendChild(main_head)




let main_logo = document.createElement('div')
main_logo.classList.add('main_logo')

main_logo.onclick = () => {
    location.assign('/')
}

let logo_img = document.createElement('img')
logo_img.alt = 'main_logo'
logo_img.src = '/public/uzum_logo.png'
main_logo.append(logo_img)


let catalog = document.createElement('button')
catalog.classList.add('catalog')
let hamburger = document.createElement('div')
hamburger.classList.add('hamburger')

let ham_up = document.createElement('div')
ham_up.classList.add('ham_up')

let ham_middle = document.createElement('div')
ham_middle.classList.add('ham_middle')

let ham_bottom = document.createElement('div')
ham_bottom.classList.add('ham_bottom')

hamburger.append(ham_up, ham_middle, ham_bottom)
let span = document.createElement('span')
span.innerHTML = 'Каталог'

catalog.append(hamburger, span)

let search_modal_box = document.createElement('div')
search_modal_box.classList.add('search_modal_box')

let search = document.createElement('div')
search.classList.add('search')

let search_input = document.createElement('input')
search_input.classList.add('search_input')
search_input.type = 'text'
search_input.placeholder = 'Искать товары и категории'

let btn_del = document.createElement('button')
btn_del.classList.add('del_all')
let del_img = document.createElement('img')
del_img.alt = 'delete'
del_img.src = '/public/close.png'

btn_del.append(del_img)

let search_btn = document.createElement('button')
search_btn.classList.add('search_btn')
let search_img = document.createElement('img')
search_img.alt = 'search'
search_img.src = '/public/search.svg'

search_btn.append(search_img)

search.append(search_input, btn_del, search_btn)

let search_modal = document.createElement('div')
search_modal.classList.add('search_modal')

let search_modal_h1 = document.createElement('h1')
search_modal_h1.innerHTML = 'Популярное'

search_modal.append(search_modal_h1)


search_modal_box.append(search, search_modal)

let local_user = JSON.parse(localStorage.getItem('user_id')) || []


let main_head_buttons = document.createElement('div')
main_head_buttons.classList.add('main_head_buttons')

let btn_1 = document.createElement('button')
btn_1.classList.add('log_in')
let btn_1_img = document.createElement('img')
btn_1_img.src = '/public/log.svg'
btn_1_img.alt = 'log_in'
let btn_1_span = document.createElement('span')
if (local_user.length === 0) {
    btn_1_span.innerHTML = 'Войти'
} else {
    btn_1_span.innerHTML = `${local_user.substring(0, 6)}...`
}
btn_1_span.classList.add('profile_name')
btn_1.append(btn_1_img, btn_1_span)

let registration_modal = document.querySelector('.registration_modal')
let bg = registration_modal.querySelector('.bg')
let close = registration_modal.querySelector('.close')
let body = document.body


btn_1.onclick = () => {
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


let btn_2 = document.createElement('button')
btn_2.classList.add('log_in')
let btn_2_img = document.createElement('img')
btn_2_img.src = '/public/loved.svg'
btn_2_img.alt = 'log_in'
let btn_2_span = document.createElement('span')
btn_2_span.innerHTML = 'Избранное'
btn_2.append(btn_2_img, btn_2_span)

btn_2.onclick = () => {
    location.assign('/pages/loved_page/')
}


let btn_3 = document.createElement('button')
btn_3.classList.add('log_in')
let btn_3_img = document.createElement('img')
btn_3_img.src = '/public/korzina.svg'
btn_3_img.alt = 'log_in'
let btn_3_span = document.createElement('span')
btn_3_span.innerHTML = 'Корзина'
let amount_cart = document.createElement('span')
amount_cart.classList.add('amount_cart')

btn_3.append(btn_3_img, btn_3_span, amount_cart)

btn_3.onclick = () => {
    location.assign('/pages/cart_page/')
}


let cart_modal = document.createElement('div')
cart_modal.classList.add('cart_modal')

let cart_products = document.createElement('div')
cart_products.classList.add('cart_products')
cart_modal.append(cart_products)

let checkout_btn = document.createElement('button')
checkout_btn.classList.add('checkout')
checkout_btn.innerHTML = 'Оформить заказ'

let cart_bottom = document.createElement('div')
cart_bottom.classList.add('cart_bottom')
cart_bottom.append(checkout_btn)

cart_modal.append(cart_bottom)

cart_modal.style.display = 'none'


btn_3.onmouseleave = () => {
    cart_modal.style.display = 'none'
}

cart_modal.onmouseenter = () => {
    cart_modal.style.display = 'flex'
}

cart_modal.onmouseleave = () => {
    cart_modal.style.display = 'none'
}

main_head_buttons.append(btn_1, btn_2, btn_3, cart_modal)

main_head.append(main_logo, catalog, search_modal_box, main_head_buttons)

let catalog_modal = document.createElement('div')
catalog_modal.classList.add('catalog_modal')
catalog_modal.classList.add('show_catalog')

let catalog_head = document.createElement('p')
catalog_head.classList.add('catalog_head')

catalog_head.innerText = 'Категории товаров'

let categories_box = document.createElement('div')
categories_box.classList.add('categories_box')

catalog_modal.append(catalog_head, categories_box)

let categories = []



main_head.append(main_logo, catalog, search_modal_box, main_head_buttons, catalog_modal)

const bottom_header = document.createElement('div')
bottom_header.classList.add('bottom_header')
header.append(bottom_header)

let bottom_header_container = document.createElement('div')
bottom_header_container.classList.add('container')
bottom_header.appendChild(bottom_header_container)

let bottom_head = document.createElement('div')
bottom_head.classList.add('bottom_head')
bottom_header_container.appendChild(bottom_head)

let union = document.createElement('div')
union.classList.add('union')

let union_img = document.createElement('img')
union_img.alt = 'union'
union_img.src = '/public/union.png'

let union_span = document.createElement('span')
union_span.innerHTML = 'Рассрочка'

union.append(union_img, union_span)


let nav = document.createElement('nav')

bottom_head.append(union, nav)




export function displayRandomProductTitles(products) {
    let randomProducts = getRandomProducts(products, 4);
    if (search_modal.style.display === 'none') {
        search_modal.style.display = 'block';
    }
    reload_results(randomProducts, search_modal);
}


export function reload_results(arr, place) { 
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





search_input.onclick = (e) => {
    search_modal.style.display = 'block'
    search.classList.add('search-box-rounded-top')
    e.stopPropagation()
}

document.body.onclick = () => {
    search_modal.style.display = 'none'
    search.classList.remove('search-box-rounded-top')
    btn_del.style.display = search_input.value.length > 0 ? 'flex' : 'none'
}


search_input.onkeyup = () => {
    let inputValue = search_input.value.trim().toLowerCase();
    search.classList.add('search-box-rounded-top')
    btn_del.style.display = 'flex'

    search_modal.innerHTML = ''

    if (inputValue.length > 0) {
        search.classList.add('search-box-rounded-top')
        getData('/goods')
            .then(res => {
                let goods = res
                let found = goods.filter(good => good.title.toLowerCase().includes(inputValue))

                if (found.length > 0) {
                    reload_results(found, search_modal)
                    search_modal.style.display = 'block'
                } else {
                    search_modal.style.display = 'none'
                    search.classList.remove('search-box-rounded-top')
                }
            })
    } else {
        search.classList.remove('search-box-rounded-top')
        btn_del.style.display = 'none'

        let h1 = document.createElement('h1')
        h1.innerHTML = 'Популярное'

        search_modal.prepend(h1)

        getData('/goods')
            .then(res => {
                displayRandomProductTitles(res)
            })
    }
}

btn_del.onclick = () => {
    search_input.value = ''
}

catalog.onclick = () => {
    catalog.classList.toggle('active')
    catalog_modal.classList.toggle('show_catalog')
}



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
        reload_categories(counts, categories_box)
        reload_links(counts, nav)
    })


updateCart()


let totalQuantities = {}
btn_3.onmouseenter = () => {
    cart_products.innerHTML = ''
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    let uniqueProducts = Array.from(new Map(cart.map(product => [product.id, product])).values());

    if (cart.length === 0) {
        cart_modal.style.display = 'none'
    } else {
        cart_modal.style.display = 'flex'
    }

    cart.forEach(product => {
        let productId = product.id;
        let quantity = product.quantity || 1;

        totalQuantities[productId] = (totalQuantities[productId] || 0) + quantity;
    });

    localStorage.setItem('quantity', JSON.stringify(totalQuantities))

    totalQuantities = {}

    reload_cart_products(uniqueProducts, cart_products)
}


let profile_form = document.forms.profile
let profile_inputs = document.querySelectorAll('.profile_inputs')
let profile_button = document.querySelector('.profile_btn')
let num_ready = document.querySelector('.num_ready')
let reged_number = document.querySelector('.reged_number')



let form = document.forms.reg
let form_input = form.querySelector('input')
let form_button = form.querySelector('button')
let regex = /^\+998([- ])?(90|91|93|94|95|98|99|33|97|71)?(\d{3})([- ])?(\d{2})([- ])?(\d{2})$/

let name_regex = /^[A-Za-z\s]+$/

let sign_in = document.querySelector('.sign_in')
let sign_up = document.querySelector('.sign_up')
let profile = document.querySelector('.profile')

let check_code = 12345
let code_check_input = document.querySelector('.code_check')

let number

let profile_name = document.querySelector('.profile_name')

form.onsubmit = (e) => {
    e.preventDefault()

    let error = false
    let correct = regex.test(form_input.value)

    if (form_input.value.length === 0 || correct === false) {
        error = true
        form_input.style.border = '2px solid red'
        form_input.style.color = 'red'
        form_button.style.background = 'red'
    } else {
        form_input.style.border = 'none'
        form_input.style.color = 'black'
        form_button.style.background = '#7000FF'
    }

    if (error) {
        return error
    } else {
        firstStep()
        number = form_input.value
        reged_number.innerHTML = number
    }
}

function firstStep() {
    sign_up.classList.add('hidden_reg_modal')
    sign_in.classList.remove('hidden_reg_modal')
}


code_check_input.onkeyup = () => {
    let value = code_check_input.value
    if (+value === check_code) {
        getData('/users')
            .then(res => {
                let users = res
                console.log(users);
                if (users.length > 0) {
                    users.forEach(user => {
                        if (user.phone === number.toString()) {
                            registration_modal.classList.add('hidden_reg_modal')
                            sign_in.classList.add('hidden_reg_modal')
                            profile_name.innerHTML = user.name
                            let local_user = JSON.parse(localStorage.getItem('user_id')) || []

                            local_user = user.name

                            localStorage.setItem('user_id', JSON.stringify(user.name));
                        } else {
                            secondStep()
                        }
                    })
                } else {
                    secondStep()
                }
            })
    }
}

function secondStep() {
    sign_in.classList.add('hidden_reg_modal')
    profile.classList.remove('hidden_reg_modal')
    num_ready.value = number
}


let user_input = document.querySelectorAll('.user_input')

let names_regex = /^[a-z ,.'-]+$/i


profile_form.onsubmit = (e) => {
    e.preventDefault()

    let error = false

    profile_inputs.forEach(input => {
        if (input.value.length === 0) {
            error = true
            input.style.border = '2px solid red'
            input.style.color = 'red'
            profile_button.style.background = 'red'
        } else {
            input.style.border = 'none'
            input.style.color = 'black'
            profile_button.style.background = '#7000FF'
        }
    })

    user_input.forEach(input => {
        let correct = names_regex.test(input.value)
        if (input.value.length === 0 || correct === false) {
            error = true
            input.style.border = '2px solid red'
            input.style.color = 'red'
            profile_button.style.background = 'red'
        } else {
            input.style.border = 'none'
            input.style.color = 'black'
            profile_button.style.background = '#7000FF'
        }
    })



    if (error) {
        return error
    } else {
        submit()
    }
}



function submit() {
    let user = {};

    let fm = new FormData(profile_form);

    fm.forEach((value, key) => {
        user[key] = value;
    });


    postData('/users', user)

    registration_modal.classList.add('hidden_reg_modal')
    sign_in.classList.add('hidden_reg_modal')

    profile_name.innerHTML = user.name

    let local_user = JSON.parse(localStorage.getItem('user_id')) || []

    local_user = user.name

    localStorage.setItem('user_id', JSON.stringify(user.name));
}

let products_in_cart = document.querySelector('.products_in_cart')
products_in_cart.innerHTML = cart.length