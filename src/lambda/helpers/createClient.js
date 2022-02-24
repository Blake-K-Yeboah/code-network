import { MongoClient } from "mongodb";
const { MONGODB_PASSWORD, NODE_ENV } = process.env;

const createClient = () => {
    const client = new MongoClient(
        `mongodb+srv://adminUser:${MONGODB_PASSWORD}@main.kyvd3.mongodb.net/development?retryWrites=true&w=majority`,
        { useNewUrlParser: true, useUnifiedTopology: true }
    );

    client.usersCollection = function () {
        return this.db(NODE_ENV).collection("users");
    };

    client.postsCollection = function () {
        return this.db(NODE_ENV).collection("posts");
    };

    return client;
};

export { createClient };
