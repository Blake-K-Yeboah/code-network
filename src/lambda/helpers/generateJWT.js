import jwt from "jsonwebtoken";
const { JWT_SECRET } = process.env;

const generateJWT = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            headline: user.headline,
            createdAt: user.createdAt,
            followers: user.followers,
            profilePic: user.profilePic,
            isNewAccount: user.isNewAccount,
            darkMode: user.darkMode,
        },
        JWT_SECRET,
        {
            expiresIn: 31556926, // 1 year in seconds
        }
    );
};

export { generateJWT };
