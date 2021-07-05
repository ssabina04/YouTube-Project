const KEY = "&key=AIzaSyCCloZGZ-IU5brI4g_AEsMBBdYxkYd2ABI"
const API = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q=' 
const logo = document.createElement('img')
logo.classList.add('logoTube')
logo.src = '../images/img1.png'
let inp = document.querySelector('#inp')
const btn = document.getElementById('btn')
let form = document.querySelector('#form')
const searLogo = document.createElement('img')
searLogo.classList.add('lupa')
searLogo.src = '../images/lupa.png'

const burger = document.getElementById('burger')
const divBurger = document.querySelector('.divBurger')

const microLogo = document.createElement('img')
microLogo.classList.add('micro')
microLogo.src = '../images/micro.png'
let output = document.querySelector('#output')
btn.append(searLogo, microLogo)

form.append(logo, btn)

let youTube = async () => {
    let URL = API + inp.value + KEY 
    let request = await fetch(URL)
    let response = await request.json()
    console.log(response)
    renderVideo(response.items)
}

form.addEventListener('submit', (event)=> {
event.preventDefault()
youTube()
})

let renderVideo = (data) => {
    output.innerHTML = ''
    data.map(el => {
        // let title = document.createElement('div')
        // title.innerHTML = el.snippet.title
        
        let video = document.createElement('div')
        video.classList.add('video')
        video.innerHTML = `<iframe src="https://www.youtube.com/embed/${el.id.videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
        
        // output.append(title)
        output.append(video)
    });
}


let recognizer = new webkitSpeechRecognition()
// let name = ''
recognizer.interimResults = true
recognizer.lang = 'en-En'

recognizer.onresult = (event) => {
    let result = event.results[0]
    if (result.isFinal) {
        inp.value = result[0].transcript
        inp.innerHTML = `result[0].transcript`
        console.log('You said ' + result[0].transcript)
        // name = result[0].transcript
    }
}

const speech = () => {
    
    recognizer.start()
}

microLogo.addEventListener('click', () => {
    speech()
})

burger.addEventListener('click', () => {
    divBurger.classList.toggle('divBurgerActive')
})