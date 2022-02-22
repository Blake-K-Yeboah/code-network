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
        const { name, username, email, password } = JSON.parse(event.body);

        // Validate user input
        if (!name || !username || !email || !password) {
            errorStatusCode = 400;
            throw new Error(`Please fill in all fields.`);
        }

        // Check if username is in use
        const existingUserWithUsername = await users.findOne({ username });
        if (existingUserWithUsername !== null) {
            errorStatusCode = 400;
            throw new Error(
                `A user already exists with the username: ${username}`
            );
        }

        // Check if email is in use
        const existingUserWithEmail = await users.findOne({ email });
        if (existingUserWithEmail !== null) {
            errorStatusCode = 400;
            throw new Error(`A user already exists with the email: ${email}`);
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 10);

        // Create and insert new user
        const newUser = {
            name,
            username,
            email,
            password: passwordHash,
            headline: "",
            followers: [],
            profilePic: "default.jpg",
            isNewAccount: true,
            createdAt: new Date().toISOString(),
            darkMode: false,
        };

        const { insertedId } = await users.insertOne(newUser);

        const token = await generateJWT({ ...newUser, _id: insertedId });

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
