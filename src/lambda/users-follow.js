import { createClient } from "./helpers/createClient";
import { checkAuth } from "./helpers/checkAuth";

export async function handler(event) {
    const dbClient = createClient();
    let errorStatusCode = 500;

    const { error, user } = checkAuth(event);

    if (error !== null) {
        errorStatusCode = 401;
        throw new Error(error);
    }

    try {
        // Connect to database and access users collection
        await dbClient.connect();
        const users = dbClient.usersCollection();
        const { username } = event.queryStringParameters;

        // Find User To Follow
        const userToFollow = await users.findOne({ username });

        if (!userToFollow) {
            errorStatusCode = 404;
            throw new Error("User not found.");
        }

        if (
            userToFollow.followers.filter(
                (follower) => follower.username === user.username
            ).length > 0
        ) {
            // If User Is Following Already, Unfollow
            await users.updateOne(
                { username },
                {
                    $set: {
                        followers: userToFollow.followers.filter(
                            (follower) => follower.username !== user.username
                        ),
                    },
                }
            );
        } else {
            // If user isn't follwing, Follow
            await users.updateOne(
                { username },
                {
                    $push: {
                        followers: {
                            username: user.username,
                            date: new Date().toISOString(),
                        },
                    },
                }
            );
        }

        const updatedUser = await users.findOne({ username });

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUser),
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
