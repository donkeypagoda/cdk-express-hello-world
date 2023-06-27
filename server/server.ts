import  express, {Application, Request, Response} from 'express';

const app: Application = express()
const port: Number = 5000

app.get('/I-came-here-to-kick-ass-and-chew-bubblegum', (req: Request, res: Response): void => {
    res.send('And I am all out of bubblegum')
})

app.listen(port, () => {
    console.log(`Server be listening on port: ${port}`)
})

export = app;