# Code Network

![Netlify Status](https://api.netlify.com/api/v1/badges/d18a4383-a083-4632-bbe5-23a79b1f1dc1/deploy-status)
![MIT License](https://img.shields.io/github/license/Blake-K-Yeboah/code-network.svg)

![Screenshot Of App](https://github.com/Blake-K-Yeboah/code-network/blob/master/public/img/screenshot.jpg?raw=true)

<br>

## 😀 Demo

Check out the live version: [codenetwork.netlify.app](https://codenetwork.netlify.app/)

<br>

## 💻 Tech Stack

<br>

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

<br>

## 🎙 About The Project
This project is an open-source social network for developers built with serverless archietecture. It has many features from creating posts to playing tech trivia. Full list of current features:

- Authentication with email/password
- Posts with CRUD functionality
- Commenting on posts
- Liking and disliking posts
- Dark theme toggle
- Play tech trivia (a fun trivia game)

<br>

## 👨‍💻 Contributing
- Contributions are greatly appreciated.
- Check out [Contributing.md](https://github.com/Blake-K-Yeboah/code-network/blob/master/Contributing.md) file for more details

<br>

## 🛡️ License

This project is licensed under an MIT license. Check out [LICENSE file](https://github.com/Blake-K-Yeboah/code-network/blob/master/LICENSE) for more info.

<br>

## 🛠 Installation

1.  Make sure you have node.js installed, run this command to check if its installed:

```node --version```

2. Fork & Clone the repository and run `yarn install` or `npm install` in root directory

2. Create a MongoDB atlas account and a new database and database user
   
3. Copy your MongoDB URI and replace the URI in `src/lambda/helpers/createClient.js`

```
const client = new MongoClient( 
    `mongodb+srv://adminUser:${MONGODB_PASSWORD}@main.kyvd3.mongodb.net/development?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
);
```
> Store your db user's password in an environment variable in a `.env.local` file

4. Add a `JWT_SECRET` env variable in your `.env.local` file e.g `JWT_SECRET=thisismysecret`
   
5. Install Netlify CLI globally:

```npm install -g netlify-cli```

6. Run `netlify dev` or `ntl dev` in command line to start server on port `8888`

7. Navigate to `localhost:8888` to view web app. :)
   
<br>

## 😍 Show Your Support

Give the project a ⭐ if you like it.

<br>

## 🧠 Future Features

Here is a list of features that may be added in the future:

- Attaching images to posts
- Custom profile pictures
- Live messaging with firebase
- More information on user profiles