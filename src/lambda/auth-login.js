import { createClient } from "./helpers/createClient";
import { generateJWT } from "./helpers/generateJWT";
import bcrypt from "bcryptjs";

export async function handler(event) {
    const dbClient = createClient();
    let errorStatusCode = 500;

    try {
        // Connect to database and access users collection
        await dbClient.connect();
        const users = dbClient.usersCollection();

        // Parse request body
        const { email, password } = JSON.parse(event.body);

        // Validate user input
        if (!email || !password) {
            errorStatusCode = 400;
            throw new Error(`Please fill in all fields.`);
        }

        // Get user from DB
        const existingUser = await users.findOne({ email });
        if (!existingUser) {
            errorStatusCode = 401;
            throw new Error(`Invalid email`);
        }

        // Check password matches
        const match = await bcrypt.compare(password, existingUser.password);

        if (!match) {
            errorStatusCode = 400;
            throw new Error(`Invalid password`);
        }

        const token = await generateJWT(existingUser);

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
