import { getRandomItems, highlightMatch, updateGoods } from "../../modules/functions"
import { displayRandomProductTitles } from "../../modules/header"
import { getData } from "../../modules/http"
import { reload, reloadRandomSearch, reload_categories, reload_colors, reload_sizes } from "../../modules/reloads"


let category = location.href.split('=')[1]
let goods_place = document.querySelector('.goods_box')
let categories_box = document.querySelector('.aside_categories_box')
let categories = []
let cat_name = document.querySelector('.cat_name')
cat_name.innerHTML = category

let cat_amount = document.querySelector('.cat_amount')

let modal_buy = document.querySelector('.modal_buy')
let close = document.querySelector('.close_cart')

let colors_box = document.querySelector('.colors_box')
let diagonals_box = document.querySelector('.diagonals_box')
let dia = document.querySelector('.dia')



getData('/goods')
    .then(res => {
        let good = res.filter(item => item.type === category)

        let diogonals = [];

        good.forEach(item => {
            diogonals.push(item.dioganal)
        });


        if (diogonals[0] !== undefined) {
            let diagonals = diogonals.reduce((acc, item) => {
                item.forEach(d => {
                    let size = d.replace(/\D/g, '')
                    if (size !== '') {
                        acc.add(size)
                    }
                })
                return acc
            }, new Set())

            diagonals = [...diagonals].sort((a, b) => a - b)

            reload_sizes(diagonals, diagonals_box)

            dia.classList.remove('hide')
        }




        let colors = []
        good.filter(color => {
            colors.push(color.colors)
        })

        let filtered = Array.from(new Set([].concat(...colors)))

        reload_colors(filtered, colors_box)

        let goods = res
        goods.filter(good => {
            let category = good.type
            categories.push(category)
        })
        let counts = categories.reduce((acc, item) => {
            acc[item] = (acc[item] || 0) + 1;
            return acc;
        }, {});

        cat_amount.innerHTML = `${counts[category]} товаров`

        reload_categories(counts, categories_box)
        reload(good, goods_place)
    })


close.onclick = () => {
    modal_buy.style.display = 'none'
    modal_buy.classList.remove('show');
}


let from_input = document.querySelector('.from')
let to_input = document.querySelector('.to')
let needed = []

from_input.onkeyup = () => {
    updateGoods()
}
to_input.onkeyup = () => {
    updateGoods()
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

let aside = document.querySelector('aside')
let filters_button = document.querySelector('.filters')
let open = false


filters_button.onclick = () => {
    if(open) {
        aside.style.display = 'none'
        document.body.classList.remove('modal-open');
    } else {
        aside.style.display = 'block'
        document.body.classList.add('modal-open');
    }

    open = !open
}