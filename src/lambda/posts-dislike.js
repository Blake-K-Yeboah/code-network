import { createClient } from "./helpers/createClient";
import { checkAuth } from "./helpers/checkAuth";
import { ObjectId } from "mongodb";

export async function handler(event) {
    const dbClient = createClient();
    let errorStatusCode = 500;
    const { postId } = event.queryStringParameters;

    const { error, user } = checkAuth(event);

    if (error !== null) {
        errorStatusCode = 401;
        throw new Error(error);
    }

    try {
        // Connect to database and access users collection
        await dbClient.connect();
        const posts = dbClient.postsCollection();

        // Post
        const post = await posts.findOne({ _id: ObjectId(postId) });

        if (!post) {
            errorStatusCode = 404;
            throw new Error("Post not found");
        }

        if (
            post.dislikes.filter(
                (dislike) => dislike.username === user.username
            ).length > 0
        ) {
            // If user already disliked post, remove dislike
            await posts.updateOne(
                { _id: ObjectId(postId) },
                {
                    $set: {
                        dislikes: post.dislikes.filter(
                            (dislike) => dislike.username !== user.username
                        ),
                    },
                }
            );
        } else {
            // If user hasn't disliked post, add dislike
            await posts.updateOne(
                { _id: ObjectId(postId) },
                {
                    $push: {
                        dislikes: {
                            username: user.username,
                            date: new Date().toISOString(),
                        },
                    },
                }
            );
        }

        const updatedPost = await posts.findOne({ _id: ObjectId(postId) });

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedPost),
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
