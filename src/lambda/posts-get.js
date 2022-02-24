import { createClient } from "./helpers/createClient";
import { ObjectId } from "mongodb";

export async function handler(event) {
    const dbClient = createClient();
    let errorStatusCode = 500;
    const { id } = event.queryStringParameters;

    try {
        // Connect to database and access users collection
        await dbClient.connect();
        const posts = dbClient.postsCollection();

        const result = id
            ? await posts.findOne({ _id: ObjectId(id) })
            : await posts.find({}).toArray();

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
            },
            body: !id
                ? JSON.stringify({ count: result.length, result })
                : JSON.stringify(result),
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: errorStatusCode,
            body: JSON.stringify({ msg: err.message }),
        };
    } finally {
        dbClient.close();
    }
}
