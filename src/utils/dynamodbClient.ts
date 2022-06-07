import { DynamoDB } from "aws-sdk"

const options = {
    region: "localhost",
    endpoint: "http://localhost:8000",
    accessKeyId: "x", //para acessar no offline
    secretAccessKey: "x"
}


const isOffline = () => { //se tiver usando offline vai retornar true
    return process.env.IS_OFFLINE
}


export const document = isOffline()
    ? new DynamoDB.DocumentClient(options) // se isOffline for true document vai ser assim
    : new DynamoDB.DocumentClient() // se nao