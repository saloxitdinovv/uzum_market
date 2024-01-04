const footer = document.querySelector('footer .container')

const footer_head = document.createElement('div')
footer_head.classList.add('footer_head')

const footer_body = document.createElement('div')
footer_body.classList.add('footer_body')

const footer_foot = document.createElement('div')
footer_foot.classList.add('footer_foot')

footer.append(footer_head, footer_body, footer_foot)

let foot_head_boxes = []
let column_heads = []
let column_bodies = []
let links = []


// let links_text = ['', '', '', '', '', '']

for (let i = 0; i < 4; i++) {
    let foot_head_box = document.createElement('div')
    foot_head_box.classList.add(`foot_head_box`)
    foot_head_boxes.push(foot_head_box)
    footer_head.append(foot_head_box)

    let column_head = document.createElement('p')
    column_head.classList.add('column_head')
    foot_head_box.append(column_head)
    column_heads.push(column_head)

    let column_body = document.createElement('div')
    column_body.classList.add('column-body')
    foot_head_box.append(column_body)
    column_bodies.push(column_body)

    for (let i = 0; i < 2; i++) {
        let link = document.createElement('a')
        link.href = '#'
        column_body.append(link)
        links.push(link)
    }
}

column_heads[0].innerHTML = 'О нас'
column_heads[1].innerHTML = 'Пользователям'
column_heads[2].innerHTML = 'Для предпринимателей'
column_heads[3].innerHTML = 'Скачать приложение'

links[0].innerHTML = 'Пункты выдачи'
links[1].innerHTML = 'Вакансии'
links[2].innerHTML = 'Связаться с нами'
links[3].innerHTML = 'Вопрос - Ответ'
links[4].innerHTML = 'Продавайте на Uzum'
links[5].innerHTML = 'Вход для продавцов'
links[6].innerText = 'AppStore'
links[7].innerText = 'Google Play'


links[6].classList.add('cg_body_div')
links[7].classList.add('cg_body_div')

let apple_img = document.createElement('img')
apple_img.alt = 'apple'
apple_img.src = '/apple-logo.png'
apple_img.classList.add('store_icon')
links[6].prepend(apple_img)

let google_play = document.createElement('img')
google_play.alt = 'google play'
google_play.src = '/google-play.png'
google_play.classList.add('store_icon')
links[7].prepend(google_play)


column_bodies[3].classList.add('stores')
column_bodies[3].classList.remove('column-body')




let footer_body_boxes = []

let foot_body_p = document.createElement('p')
foot_body_p.innerHTML = 'Uzum в соцсетях'
foot_body_p.classList.add('foot_body_p')

let social = document.createElement('div')
social.classList.add('social')

let hyperLinks = []

let imgs = []
for (let i = 0; i < 4; i++) {
    let footer_body_box = document.createElement('div')
    footer_body_box.classList.add('footer_body_box')
    footer_body.append(footer_body_box)
    footer_body_boxes.push(footer_body_box)

    let link = document.createElement('a')
    link.href = ''
    hyperLinks.push(link)
    social.append(link)

    let img = document.createElement('img')
    img.alt = 'link'
    link.append(img)
    imgs.push(img)
}

hyperLinks[0].href = 'https://uzum-by-doni.netlify.app/'
hyperLinks[1].href = 'https://t.me/uzum_market'
hyperLinks[2].href = 'https://www.youtube.com/channel/UCY3nNF2MUDKHrELA6LzbnHA'
hyperLinks[3].href = 'https://www.facebook.com/uzummarket'

imgs[0].src = '/instagram.svg'
imgs[1].src = '/telegram.svg'
imgs[2].src = '/youtube.svg'
imgs[3].src = '/facebook.svg'
footer_body_boxes[3].append(foot_body_p, social)


let footer_foot_box_a = document.createElement('div')
footer_foot_box_a.classList.add('foot_box')
let ps = []
for (let i = 0; i < 2; i++) {
    let p = document.createElement('p')
    ps.push(p)
    footer_foot_box_a.append(p)
}

ps[0].innerHTML = 'Соглашение о конфиденциальности'
ps[1].innerHTML = 'Пользовательское соглашение'

let footer_foot_box_b = document.createElement('div')
footer_foot_box_b.classList.add('foot_box')
let p = document.createElement('p')
p.innerHTML = '«2023© ООО «UZUM MARKET». ИНН 309376127. Все права защищены»'
footer_foot_box_b.append(p)

footer_foot.append(footer_foot_box_a, footer_foot_box_b)