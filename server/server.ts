import  express, {Application, Request, Response} from 'express';
import { Handler } from 'aws-cdk-lib/aws-lambda';

const app: Application = express()
const port: Number = 5000

export const handler: Handler = (event: any, context: any) => {
    app.get('/I-came-here-to-kick-ass-and-chew-bubblegum', (req: Request, res: Response): void => {
        res.send('And I am all out of bubblegum')
    })
    
    app.listen(port, () => {
        console.log(`Server be listening on port: ${port}`)
    })
}