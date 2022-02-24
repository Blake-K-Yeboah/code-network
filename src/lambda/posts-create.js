import { createClient } from "./helpers/createClient";
import { checkAuth } from "./helpers/checkAuth";
import { ObjectId } from "mongodb";

export async function handler(event) {
    const dbClient = createClient();
    let errorStatusCode = 500;

    const { error, user } = checkAuth(event);

    if (error !== null) {
        errorStatusCode = 401;
        throw new Error(error);
    }

    try {
        // Connect to database and access posts collection
        await dbClient.connect();
        const posts = dbClient.postsCollection();

        // Parse request body
        const { title, body } = JSON.parse(event.body);

        if (!title || !body) {
            errorStatusCode = 400;
            throw new Error("Invalid Request");
        }

        // Create and insert new post
        const newPost = {
            title,
            body,
            author: {
                profilePic: user.profilePic,
                username: user.username,
            },
            likes: [],
            dislikes: [],
            comments: [],
            createdAt: new Date().toISOString(),
        };

        const { insertedId } = await posts.insertOne(newPost);

        const post = await posts.findOne({ _id: ObjectId(insertedId) });

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(post),
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
