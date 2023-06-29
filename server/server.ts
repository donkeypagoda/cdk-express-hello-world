import  express, {Application, Request, Response} from 'express';
import { Handler } from 'aws-cdk-lib/aws-lambda';
import awsServerlessExpress from 'aws-serverless-express';
const imageURL = process.env.IMAGE_URL

const app: Application = express()
// const port: Number = 5000
const getApp = app.get('/they-live', (req: Request, res: Response): void => {
    res.status(200).type('html').send(`
    <div style='background-image: url(${imageURL}/whoa.png); background-position: center; height: 50%; width: 50%; display: flex'>
    <h1 style='color: white; text-align: center;'>I have come here to kick ass and chew bubblegum</h1>
    <br><br>
    <h2 style='color: white; text-align: center; align-self: flex-end;'>And I am all out of bubblegum</h2>
    </div>
    `)
})
const server = awsServerlessExpress.createServer(getApp)

export const handler: Handler = (event: any, context: any) => {
    awsServerlessExpress.proxy(server, event, context)
}