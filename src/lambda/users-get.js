import { createClient } from "./helpers/createClient";

export async function handler(event) {
    const dbClient = createClient();
    let errorStatusCode = 500;
    const { username } = event.queryStringParameters;

    try {
        // Connect to database and access users collection
        await dbClient.connect();
        const users = dbClient.usersCollection();

        const result = username
            ? await users.findOne({ username })
            : await users.find({}).toArray();

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
            },
            body: !username
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
