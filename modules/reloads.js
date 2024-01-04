import { addToCart, updateGoods } from "./functions";
import { getData } from "./http";

let modal_buy = document.querySelector('.modal_buy')

export function reload(arr, place) {
    let likedArray = JSON.parse(localStorage.getItem('liked')) || [];


    place.innerHTML = ''

    for (let item of arr) {
        let product = document.createElement('div')
        let product_info = document.createElement('div')
        let product_image = document.createElement('div')
        let product_img = document.createElement('img')
        let heart_img = document.createElement('img')
        let product_name = document.createElement('p')
        let rate_box = document.createElement('div')
        let star = document.createElement('img')
        let rating = document.createElement('p')
        let discounted = document.createElement('p')
        let buy = document.createElement('button')
        let buy_icon = document.createElement('img')
        let buy_price = document.createElement('div')
        let price = document.createElement('p')
        let blackFriday = document.createElement('div')
        let credit = document.createElement('div')

        product.classList.add('product')
        product_info.classList.add('product_info')
        product_image.classList.add('product_image')
        product_img.classList.add('product_img')
        heart_img.classList.add('heart_img')
        product_name.classList.add('product_name')
        star.classList.add('star')
        rating.classList.add('rating')
        discounted.classList.add('discounted')
        buy.classList.add('buy')
        buy_icon.classList.add('buy_icon')
        buy_price.classList.add('buy_price')
        price.classList.add('price')
        rate_box.classList.add('rate_box')
        blackFriday.classList.add('black_friday')
        credit.classList.add('credit')

        product_name.innerHTML = `${item.title.substring(0, 35)}...`
        rating.innerHTML = item.rating

        let discount_amount = (item.price * item.salePercentage) / 100
        let discounted_price = item.price - discount_amount

        discounted.innerHTML = `${Math.floor(discounted_price)} сум`

        price.innerHTML = `${item.price} сум`
        if (!item.salePercentage > 0) {
            price.innerHTML = ''
        }

        let credit_price = item.price / 12
        credit.innerHTML = `${credit_price.toFixed(0)} сум/мес`

        product_img.src = item.media[0]

        heart_img.src = '/heart.svg'
        star.src = '/star.svg'
        buy_icon.src = '/buy.svg'

        blackFriday.innerHTML = 'Черная пятница'

        let span = document.createElement('span')

        span.append(price, discounted)

        place.append(product)
        product.append(product_image, product_info, heart_img, buy)
        product_image.append(product_img, blackFriday)
        product_info.append(product_name, rate_box, credit, buy_price)
        rate_box.append(star, rating)
        buy_price.append(span)
        buy.append(buy_icon)


        heart_img.onclick = () => {
            let itemIndex = likedArray.indexOf(item.id);
            if (itemIndex === -1) {
                likedArray.push(item.id);

                heart_img.src = '/heart_filled.svg';
                heart_img.style.width = '25px'
                heart_img.style.height = '25x'
                heart_img.style.scale = '1.2'
                setTimeout(() => {
                    heart_img.style.scale = '1'
                }, 300);
            } else {
                likedArray.splice(itemIndex, 1);

                heart_img.src = '/heart.svg';
            }

            localStorage.setItem('liked', JSON.stringify(likedArray));
        }

        if (likedArray.includes(item.id)) {
            heart_img.src = '/heart_filled.svg';
            heart_img.style.width = '25px'
            heart_img.style.height = '25x'
        }

        if (item.isBlackFriday === true) {
            blackFriday.style.display = 'flex'
        } else {
            blackFriday.style.display = 'none'
        }

        buy.onclick = () => {
            modal_buy.style.display = 'flex'
            addToCart(item)
            setTimeout(() => {
                modal_buy.classList.add('show');
            }, 500);

            let product_img = document.querySelector('.modal_img')
            product_img.src = item.media[0]
            product_img.alt = item.title

            let modal_name = document.querySelector('.modal_name')
            modal_name.innerHTML = item.title


            setTimeout(() => {
                modal_buy.classList.remove('show');
            }, 3500);
            setTimeout(() => {
                modal_buy.style.display = 'none'
            }, 3800);
            updateCart()
        }

        product.onmouseenter = () => {
            product.style.transition = 'box-shadow 0.3s ease';
            product.style.webkitBoxShadow = '0 12px 8px -4px #dddddd';
            product.style.mozBoxShadow = '0 12px 8px -4px #dddddd';
            product.style.boxShadow = '0 12px 8px -4px #dddddd';
        }

        product.onmouseleave = () => {
            product.style.transition = 'box-shadow 0.3s ease';
            product.style.boxShadow = 'none';
        }

        product_image.onclick = () => {
            location.assign('/pages/good_page/?id=' + item.id)
        }
        product_info.onclick = () => {
            location.assign('/pages/good_page/?id=' + item.id)
        }
    }
}


export function updateCart() {
    let amount_cart = document.querySelector('.amount_cart')
    let cart_main = JSON.parse(localStorage.getItem('cart')) || []
    let cart = [...new Set(cart_main.map(item => item.id))];
    if (cart.length > 0) {
        amount_cart.style.display = 'block'
        amount_cart.innerHTML = cart.length
    } else {
        amount_cart.style.display = 'none'
    }
}

export function hoverCart(modal) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length > 0) {
        modal.style.display = 'flex'
    } else {
        modal.style.style = 'none'
    }
}


export function reload_cart_products(arr, place) {
    updateCart()
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalQuantities = JSON.parse(localStorage.getItem('quantity')) || {};

    place.innerHTML = ''
    for (let item of arr) {
        let product = document.createElement('div')
        product.classList.add('cart_product')

        let product_img = document.createElement('img')
        product_img.classList.add('cart_product_image')

        product_img.src = item.media[0]
        product_img.alt = item.title.substring(0, 10)

        let cart_product_info = document.createElement('div')
        cart_product_info.classList.add('cart_product_info')

        let product_cart_name = document.createElement('p')
        product_cart_name.classList.add('product_cart_name')

        product_cart_name.innerText = `${item.title.substring(0, 43)}...`

        let product_cart_price = document.createElement('p')
        product_cart_price.classList.add('product_cart_price')

        let quantity = document.createElement('p')
        quantity.classList.add('quantity')

        let productId = item.id;
        let productQuantity = totalQuantities[productId] || 1;

        quantity.innerText = `Количество: ${productQuantity}`

        let q_p_span = document.createElement('span')

        q_p_span.append(product_cart_price, quantity)
        q_p_span.classList.add('q_p_span')

        let discount_amount = (item.price * item.salePercentage) / 100
        let discounted_price = item.price - discount_amount

        product_cart_price.innerHTML = `${Math.floor(discounted_price * productQuantity)} сум`


        let delete_from_cart = document.createElement('button')
        delete_from_cart.classList.add('delete_from_cart')

        let delete_cart_img = document.createElement('img')
        delete_cart_img.classList.add('delete_cart_img')
        delete_cart_img.src = '/bin.png'
        delete_cart_img.alt = 'bin'

        delete_from_cart.append(delete_cart_img)

        let cart_span = document.createElement('span')

        cart_span.append(product_img, cart_product_info)
        cart_product_info.append(product_cart_name, q_p_span)
        product.append(cart_span, delete_from_cart)
        place.append(product)

        cart_span.onclick = () => {
            location.assign('/pages/good_page/?id=' + item.id)
        }

        delete_from_cart.onclick = () => {
            product.remove();

            cart = cart.filter(product => product.id !== item.id);

            delete totalQuantities[productId];

            localStorage.setItem('cart', JSON.stringify(cart));
            localStorage.setItem('quantity', JSON.stringify(totalQuantities));

            updateCart();
        }


    }
}


export function reload_categories(obj, place) {
    place.innerHTML = ''
    let category_page = location.href.split('=')[1]

    for (let item in obj) {
        let category = document.createElement('div')
        category.classList.add('category')
        let category_name = document.createElement('span')
        category_name.classList.add('category_name')
        let amount_span = document.createElement('span')
        amount_span.classList.add('amount_span')

        category_name.innerHTML = item
        amount_span.innerHTML = `${obj[item]} товаров`

        category.append(category_name, amount_span)

        if (item === category_page) {
            category_name.style.fontWeight = 'bold'
            category_name.style.color = 'black'
            category_name.classList.add('active_link')
        }


        category.onclick = () => {
            location.assign('/pages/category_page/?category=' + item)
        }

        place.append(category)
    }
}


export function reload_links(obj, place) {
    let links = []
    let category = location.href.split('=')[1]
    for (let link in obj) {
        let a = document.createElement('a')
        a.href = '#'

        links.push(a)

        a.innerHTML = link
        place.append(a)

        if (link === category) {
            a.classList.add('active_link')
            a.style.fontWeight = 'bold'
            a.style.color = 'black'
        }

        a.onclick = () => {
            location.assign('/pages/category_page/?category=' + link)
        }
    }
}

let goods_place = document.querySelector('.goods_box')

export function reload_colors(arr, place) {
    place.innerHTML = '';

    for (let item of arr) {
        let color = document.createElement('div');
        color.classList.add('color');
        color.classList.add('hidden_tick');

        let color_round = document.createElement('div');
        color_round.classList.add('color_round');

        let color_active = document.createElement('img');
        color_active.classList.add('color_active');
        color_active.src = '/tick.png';

        color_round.append(color_active);

        color_round.style.backgroundColor = item;

        let color_name = document.createElement('h1');
        color_name.classList.add('color_name');
        color_name.innerHTML = item;

        color.append(color_round, color_name);

        place.append(color);

        color.onclick = () => {
            color.classList.toggle('hidden_tick');
            updateGoods();
        };
    }
}



export function reload_sizes(arr, place) {
    place.innerHTML = ''

    for (let diagonal of arr) {
        let size = document.createElement('p')
        size.classList.add('size')
        size.innerText = diagonal
        place.append(size)

    }
}


export function reloadRandomSearch(arr, place) {
    place.innerHTML = ''

    for (let item of arr) {
        let popular_item = document.createElement('div')
        popular_item.classList.add('popular_item')

        let img = document.createElement('img')
        img.src = "/search.svg"
        img.alt = 'search_icon'

        let item_name = document.createElement('p')
        item_name.innerHTML = item.title


        popular_item.append(img, item_name)

        place.append(popular_item)

        popular_item.onclick = () => {
            location.assign('/pages/good_page/?id=' + item.id)
        }
    }
}