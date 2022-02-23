import jwt from "jsonwebtoken";

export const checkAuth = (event) => {
    const secret = process.env.JWT_SECRET;

    const authHeader = event.headers.authorization;

    if (authHeader) {
        const token = authHeader.split("Bearer ")[1];

        if (token) {
            try {
                const user = jwt.verify(token, secret);
                return { error: null, user: user };
            } catch (err) {
                return { error: "Invalid/Expired token", user: null };
            }
        } else {
            return {
                error: "Authentication token must be 'Bearer [token]'",
                user: null,
            };
        }
    } else {
        return {
            error: "Must supply a jwt token in authorization header",
            user: null,
        };
    }
};
