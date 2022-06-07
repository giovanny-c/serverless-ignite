import { APIGatewayProxyHandler } from "aws-lambda"
import { document } from "../utils/dynamodbClient"

interface ICreateCertificate {
    id: string
    name: string
    grade: string
}
export const handler: APIGatewayProxyHandler = async (event) => {

    const { id, name, grade } = JSON.parse(event.body) as ICreateCertificate

    document.put({
        TableName: "users_certificate",
        Item: {
            id,
            name,
            grade,
            created_at: new Date().getTime()
        }
    }).promise()

    const response = await document.query({ //pesquisando por id, sempre retorna array
        TableName: "users_certificate",
        KeyConditionExpression: "id = :id",
        ExpressionAttributeValues: {
            ":id": id
        }
    }).promise()




    return {
        statusCode: 201,
        body: JSON.stringify(response.Items[0])//retorna a query na posiçao 0
    }
}