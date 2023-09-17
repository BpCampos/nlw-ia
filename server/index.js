import cors from 'cors'
import express, { response } from 'express'

import { convert } from './convert.js'
import { download } from './download.js'
import { transcribe } from './transcribe.js'
import { summarize } from './summarize.js'

const port = 3000

const app = express()
app.use(cors())
app.use(express.json())

app.get('/summary/:id', async (req, res) => {
    try {
        await download(req.params.id)
        const audioConverted = await convert()
        const result = await transcribe(audioConverted)

        return res.json({ result })
    } catch (error) {
        return res.json({ error })
    }

})

app.post('/summary', async (req, res) => {
    try {
        const result = await summarize(req.body.text)
        return res.json({ result })
    } catch (error) {
        return res.json({ error })
    }

})

app.listen(port, () => console.log(`server is listen at port: http://localhost:${port}/`))