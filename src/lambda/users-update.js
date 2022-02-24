import { createClient } from "./helpers/createClient";
import { generateJWT } from "./helpers/generateJWT";
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

        // Parse request body
        const body = JSON.parse(event.body);

        if (
            !body.username &&
            !body.headline &&
            !body.profilePic &&
            !body.hasOwnProperty("darkMode")
        ) {
            errorStatusCode = 400;
            throw new Error("Invalid Request");
        }

        await users.updateOne(
            { email: user.email },
            { $set: { ...body, isNewAccount: false } }
        );

        const updatedUser = await users.findOne({ email: user.email });

        const token = generateJWT(updatedUser);

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
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
