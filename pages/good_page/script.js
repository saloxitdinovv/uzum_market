import { addToCart, getRandomItems, highlightMatch, initializeSlider } from "../../modules/functions"
import { displayRandomProductTitles } from "../../modules/header"
import { getData } from "../../modules/http"
import { reloadRandomSearch, updateCart } from "../../modules/reloads"

let id = location.href.split('=')[1]

let product_name = document.querySelector('.product_name')
let rating = document.querySelector('.rate')
let price = document.querySelector('.price')
let discounted = document.querySelector('.discounted')
let skidka = document.querySelector('.skidka')
let main_photo = document.querySelector('.main')
let add = document.querySelector('.plus')
let remove = document.querySelector('.minus')
let amount = document.querySelector('.amount')
let buy_button = document.querySelector('.add_to_cart')
let modal_buy = document.querySelector('.modal_buy')

let title = document.querySelector('title')

let description = document.querySelector('.desc')


let add_love = document.querySelector('.add_love')
let heart_img = add_love.querySelector('img')

let likedArray = JSON.parse(localStorage.getItem('liked')) || [];
let product_id = Number(id)


add_love.onclick = () => {
    let itemIndex = likedArray.indexOf(product_id);

    if (itemIndex === -1) {
        likedArray.push(product_id);

        heart_img.src = '/public/heart_filled.svg';
        heart_img.style.width = '25px'
        heart_img.style.height = '25x'
        heart_img.style.scale = '1.2'
        setTimeout(() => {
            heart_img.style.scale = '1'
        }, 300);
    } else {
        likedArray.splice(itemIndex, 1);

        heart_img.src = '/public/heart.svg';
    }


    localStorage.setItem('liked', JSON.stringify(likedArray));
}

if (likedArray.includes(product_id)) {
    heart_img.src = '/public/heart_filled.svg';
    heart_img.style.width = '25px'
    heart_img.style.height = '25x'
}

let quantity = 1

getData('/goods/' + id)
    .then(res => {
        let good = res

        product_name.innerHTML = good.title
        description.innerHTML = good.description
        title.innerHTML = good.title
        rating.innerText = good.rating
        price.innerHTML = `${good.price} сум`

        let discount_amount = (good.price * good.salePercentage) / 100
        let discounted_price = good.price - discount_amount

        discounted.innerHTML = `${Math.floor(discounted_price)} сум`

        price.innerHTML = `${good.price} сум`
        if (!good.salePercentage > 0) {
            price.innerHTML = ''
        }

        let credit_price = good.price / 12
        skidka.innerHTML = `От ${credit_price.toFixed(0)} сум/мес`

        main_photo.src = good.media[0]


        let media = good.media

        initializeSlider(media)



        let navigationImages = document.querySelectorAll('.navigation img');
        navigationImages[0].classList.add('active');


        function updateUI() {
            amount.innerHTML = quantity;

            let totalDiscountedPrice = Math.floor(discounted_price * quantity);
            discounted.innerHTML = `${totalDiscountedPrice} сум`;

            remove.style.opacity = (quantity > 1) ? 1 : 0.5;
        }

        remove.onclick = () => {
            if (quantity > 1) {
                quantity--;
                updateUI();
                good.quantity = quantity;
            }
        };

        add.onclick = () => {
            quantity++;
            good.quantity = quantity;
            updateUI();
            remove.style.opacity = (quantity > 1) ? 1 : 0.5;
        };

        buy_button.onclick = () => {
            modal_buy.style.display = 'flex'
            addToCart(good)
            setTimeout(() => {
                modal_buy.classList.add('show');
            }, 500);

            let product_img = document.querySelector('.modal_img')
            product_img.src = good.media[0]
            product_img.alt = good.title

            let modal_name = document.querySelector('.modal_name')
            modal_name.innerHTML = good.title

            setTimeout(() => {
                modal_buy.classList.remove('show');
            }, 3500);
            setTimeout(() => {
                modal_buy.style.display = 'none'
            }, 3800);
            updateCart()
        }
    })

let close = document.querySelector('.close')

close.onclick = () => {
    modal_buy.style.display = 'none'
    modal_buy.classList.remove('show');
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