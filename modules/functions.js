import { getData } from "./http";
import { reload, updateCart } from "./reloads";

let allItemsDisplayed = false;
let from_input = document.querySelector('.from')
let to_input = document.querySelector('.to')
let goods_place = document.querySelector('.goods_box')
let needed = []
let totalQuantities = JSON.parse(localStorage.getItem('quantity')) || {};



export function highlightMatch(title, inputValue) {
    return title.replace(new RegExp(`(${inputValue})`, 'gi'), '<span class="highlight">$1</span>');
}

export function getRandomItems(array, count) {
    return array.slice().sort(() => 0.5 - Math.random()).slice(0, count);
}

let container = document.querySelector('.container');

export function handleShowAll(container, button, count) {
    getData('/goods')
        .then((res) => {
            let goods = res;

            if (allItemsDisplayed) {
                reload(goods.slice(0, 10), container);
                button.innerHTML = 'Показать остальные товары';
            } else {
                button.innerHTML = 'Скрыть остальные товары';
                reload(goods.slice(0, count), container);
            }

            allItemsDisplayed = !allItemsDisplayed;
        });
};


export function createImage(src, className) {
    let img = document.createElement('img');
    img.src = src;
    img.alt = '';
    img.classList.add(className);
    return img;
}


export function initializeSlider(images) {
    let navigation = document.querySelector('.navigation');
    let mainImage = document.getElementById('mainImage');
    let nextButton = document.querySelector('.next');
    let prevButton = document.querySelector('.prev');

    for (let i = 0; i < images.length; i++) {
        let img = createImage(images[i], 'photo');
        img.onclick = function () {
            setMainImage(images[i]);
            updateActiveClass(img);
        };
        navigation.appendChild(img);
    }

    setMainImage(images[0]);

    nextButton.onclick = function () {
        let currentIndex = images.indexOf(mainImage.src);
        let nextIndex = (currentIndex + 1) % images.length;
        setMainImage(images[nextIndex]);
        updateActiveClass(navigation.children[nextIndex]);
    };

    prevButton.onclick = function () {
        let currentIndex = images.indexOf(mainImage.src);
        let prevIndex = (currentIndex - 1 + images.length) % images.length;
        setMainImage(images[prevIndex]);
        updateActiveClass(navigation.children[prevIndex]);
    };
}


function setMainImage(src) {
    let mainImage = document.getElementById('mainImage');
    mainImage.src = src;
}



function updateActiveClass(selectedImg) {
    let navigationImages = document.querySelectorAll('.navigation img');
    for (let img of navigationImages) {
        img.classList.remove('active');
    }
    selectedImg.classList.add('active');
}


export function addToCart(itemId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let modal_buy_info = document.querySelector('.modal_buy_info')

    let copies = cart.find(product => product.id === itemId);

    if (copies) {
        copies.quantity = (copies.quantity || 1) + 1;
    } else {
        cart.push(itemId);
        localStorage.setItem('cart', JSON.stringify(cart));
        modal_buy_info.innerHTML = 'Товар добавлен в корзину'
    }
    updateCart()
}

export function getRandomProducts(products, count) {
    let shuffledProducts = products.sort(() => Math.random() - 0.5);
    return shuffledProducts.slice(0, count);
}



export function updateGoods() {
    let category = location.href.split('=')[1];
    getData('/goods')
        .then(res => {
            let goods = res.filter(item => item.type === category);
            let minValue = parseFloat(from_input.value) || 0;
            let maxValue = parseFloat(to_input.value) || Infinity;
            let filteredByPrice = goods_prices(goods, minValue, maxValue);
            let selectedColors = getSelectedColors()

            let filteredByColor = filterByColor(filteredByPrice, selectedColors);

            needed = filteredByColor;

            reload(filteredByColor, goods_place);

        });
}

function getSelectedColors() {
    let selectedColors = Array.from(document.querySelectorAll('.color:not(.hidden_tick)')).map(color => color.lastChild.innerHTML);
    return selectedColors;
}

export function filterByColor(arr, selectedColors) {
    return arr.filter(item => {
        return selectedColors.every(color => item.colors.includes(color));
    });
}



export function goods_prices(arr, min_price, max_price) {
    return arr.filter(item => {
        let discount_amount = (item.price * item.salePercentage) / 100;
        let discounted_price = item.price - discount_amount;

        return discounted_price >= min_price && discounted_price <= max_price;
    });
}


export function updateProgressBar(total, place, price) {
    let percentage = (total / price) * 100

    if (percentage > 100) {
        place.style.width = '100%'
    } else {
        place.style.width = `${percentage}%`
    }
}
