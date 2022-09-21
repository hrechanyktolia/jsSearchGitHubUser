let form = document.querySelector('.form')
let input = document.querySelector('.input')
let container = document.querySelector('.container')

let wrapper = document.createElement('div')
wrapper.classList.add('wrapper')
container.appendChild(wrapper)


form.addEventListener('submit',  async (e) => {
    e.preventDefault()
    let inputValue = Object.fromEntries(new FormData(e.target))
    const response = await fetch(` https://api.github.com/users/${inputValue.name}`)
    if (response.ok) {
        let data = await response.json()
        // console.log(data)
        wrapper.appendChild(makeCard(data))
        input.value = ''
    } else {
        alert('User not found')
    }
})

const makeCard = (data) => {
    let card = document.createElement('dvi')
    card.classList.add('card')
    card.innerHTML += ` <div class="image">
    <img src="${data.avatar_url}" width="200" height="200" alt="avatar">
    </div>
    <div class="text"><span>Login: </span>${data.login}</div>
    <div class="text"><span>City: </span>${data.location}</div>
    <div class="text"><span>About yourself: </span>${data.bio}</div>`

    card.appendChild(removeBtn())
    return card
}

const removeBtn = () => {
    let remove = document.createElement('button')
    remove.classList.add('remove')
    remove.innerText = 'Delete'
    remove.addEventListener('click', () => {
        wrapper.innerHTML = ''
    })
    return remove
}







