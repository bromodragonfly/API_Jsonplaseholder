const url = 'https://jsonplaceholder.typicode.com/posts'
const body = document.querySelector('.body')
const input = document.querySelector('.body__input')

const cardsContainer = document.createElement('div')
let list = []
cardsContainer.className = 'cards'
body.appendChild(cardsContainer)

let notesOnPage = 10

function showPage(item, json) {
  cardsContainer.innerHTML = ''
  let pageNum = +item.innerText
  let start = (pageNum - 1) * notesOnPage
  let end = start + notesOnPage
  let notes = json.slice(start, end)

  // Создаем элементы с контентом соответсвуя старнице
  for (let note of notes) {
    const card = document.createElement('div')
    card.className = 'cards__item'
    cardsContainer.appendChild(card)
    const title = document.createElement('div')
    title.className = 'cards__item-title'
    const cardBody = document.createElement('div')
    cardBody.className = 'cards__item-body'
    const button = document.createElement('span')
    button.className = 'body__button remove'
    button.setAttribute('data-id', 'post._id')
    card.appendChild(button)
    button.innerHTML = 'Delete'
    card.appendChild(title)
    title.textContent = note.title
    card.appendChild(cardBody)
    cardBody.textContent = note.body
  }
}
// Добавляем возможность удаления поста
cardsContainer.addEventListener('click', deletePost)

function deletePost(event) {
  if (event.target.classList.contains('remove')) {
    const decision = confirm('Вы уверены, что хотите удалить пост?')
    if (decision) {
      remove()
    }
  }
}

const displaySearch = (thing) => {
  const htmlString = thing
    .map((thing) => {
      return `<div class="cards__item">
      <span class="body__button remove" '>Delete</span>
      <div class="cards__item-title ">${thing.title}</div>
            <div class="cards__item-body">${thing.body}</div>
            </div>                    
    `
    })
    .join('')
  cardsContainer.innerHTML = htmlString
}

async function getPosts() {
  // Получаем массив JSON
  const response = await fetch(url)
  const list = await response.json()
  input.addEventListener('keyup', (e) => {
    const targer = e.target.value
    if (targer === '') return showPage(items[0], list)
    else {
      let newList = list.filter((thing) => {
        return thing.body.includes(targer)
      })
      displaySearch(newList)
    }
  })
  const remove = (id) => {
    const removePost = list[id]
  }

  // Задаем блок с кнопками страниц
  let pagination = document.querySelector('#pagination')
  // Определяем количество номеров страниц и создаем их
  let countItems = Object.keys(list).length
  let countOfItems = Math.ceil(countItems / notesOnPage)
  for (let i = 1; i <= countOfItems; i++) {
    let li = document.createElement('li')
    li.innerHTML = i
    pagination.appendChild(li)
  }
  let items = document.querySelectorAll('#pagination li')
  showPage(items[0], list)
  // Получаем страницы и присваиваем номера

  for (let item of items) {
    item.addEventListener('click', () => {
      showPage(item, list)
    })
  }
}

getPosts()
