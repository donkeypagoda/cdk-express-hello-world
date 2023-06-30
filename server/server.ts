import  express, {Application, Request, Response} from 'express';
import { Handler } from 'aws-cdk-lib/aws-lambda';
import awsServerlessExpress from 'aws-serverless-express';
import {template} from './template'
import {responseTemplate} from './responseTemplate'
const imageURL = process.env.IMAGE_URL

const app: Application = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.get('/they-live', (req: Request, res: Response): void => {
    const html: String = template(imageURL)
    res.status(200).type('html').send(html)
})
app.post('/they-live', (req: Request, res: Response) => {
    // do the thing here where we write to dynamo? or to SNS then to dynamo? idfk
    const thoughts = JSON.stringify(req.body?.yourThoughts)
    res.status(200).type('html').send(responseTemplate(imageURL, thoughts))
})
const server = awsServerlessExpress.createServer(app)

export const handler: Handler = (event: any, context: any) => {
    awsServerlessExpress.proxy(server, event, context)
}