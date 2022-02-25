import { createClient } from "./helpers/createClient";
import { checkAuth } from "./helpers/checkAuth";
import { ObjectId } from "mongodb";

export async function handler(event) {
    const dbClient = createClient();
    let errorStatusCode = 500;
    const { postId, commentId } = event.queryStringParameters;

    const { error, user } = checkAuth(event);

    if (error !== null) {
        errorStatusCode = 401;
        throw new Error(error);
    }

    try {
        // Connect to database and access users collection
        await dbClient.connect();
        const posts = dbClient.postsCollection();

        // Check if post exists
        const post = await posts.findOne({ _id: ObjectId(postId) });

        if (!post) {
            errorStatusCode = 404;
            throw new Error("Post not found");
        }

        // Check if comment exists
        const comment = post.comments.filter(
            (comment) => comment._id === commentId
        );

        if (!comment) {
            errorStatusCode = 400;
            throw new Error("Comment doesn't exist");
        }

        // Request must come from post owner or comment owner
        if (
            post.author.username !== user.username &&
            comment.username !== user.username
        ) {
            errorStatusCode = 401;
            throw new Error("You aren't authorized to do that");
        }

        await posts.updateOne(
            { _id: ObjectId(postId) },
            {
                $set: {
                    comments: post.comments.filter(
                        (comment) => comment._id !== commentId
                    ),
                },
            }
        );

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
