import { server } from './server.js'

const form = document.getElementById('form')
const input = document.getElementById('url')
const content = document.getElementById('content')


form.addEventListener('submit', async (e) => {
    e.preventDefault()

    content.classList.add('placeholder')

    const videoURL = input.value

    if (!videoURL.includes('shorts')) {
        content.innerText = "Esse vídeo não é um shorts"
    }

    const [_, params] = videoURL.split('/shorts/')
    const [videoID] = params.split('?si')

    content.innerText = "Obtendo o texto do áudio..."

    const transcription = await server.get(`/summary/${videoID}`)

    content.textContent = 'Realizando o resumo...'

    content.textContent = transcription.data.result

    content.classList.remove('placeholder')

})