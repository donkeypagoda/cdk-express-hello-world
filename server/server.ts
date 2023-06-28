import  express, {Application, Request, Response} from 'express';
import { Handler } from 'aws-cdk-lib/aws-lambda';
import awsServerlessExpress from 'aws-serverless-express';

const app: Application = express()
// const port: Number = 5000
const getApp = app.get('/I-have-come-here-to-kick-ass-and-chew-bubblegum', (req: Request, res: Response): void => {
    res.status(200).type('html').send('And I am all out of bubblegum')
})
const server = awsServerlessExpress.createServer(getApp)

export const handler: Handler = (event: any, context: any) => {
    awsServerlessExpress.proxy(server, event, context)
    
    // app.listen(port, () => {
    //     console.log(`Server be listening on port: ${port}`)
    // })
}