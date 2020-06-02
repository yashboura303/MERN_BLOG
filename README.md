# MERN_BLOG
### Front-End - React + Redux
### Back-End - Node.js, Express.js & MongoDB

## Set-Up Project in your machine
1. Fork the repo and clone it.
2. Create a new branch.
3. Make sure you have `npm` Node.js installed in your system. MongoAtlas is used, so no need for local MongoDB setup.
4. MongoAtlas Setup
https://www.youtube.com/watch?v=7CqJlxBYj-M&feature=youtu.be&t=293
Set up your .env file and paste in the URI that you get from following the instructions in the video above. Also set token secret to anything used for jwt authentication.

```
MONGO_ATLAS_KEY=mongodb+srv://<dbUser>:<password>@cluster0-m5jph.gcp.mongodb.net/test?retryWrites=true&w=majority
TOKEN_SECRET=
```
You need to remember to paste in the <dbUser> and <password>. Do NOT share it publicly, and do NOT include the .env file in commits.

5. [Only once] Run (from the root) `npm install` and `cd client && npm install`.
6. Un-comment line 30 in app.js (root folder) and comment line 24 & line 35-37.(This is to run app locally, please suggest better way if you know).
7 .Open two terminal windows (one for running Server and other for the UI).
8 .To run server, from root folder run `nodemon start` and to run client, go to client directory and run `npm start`.
9 .Go to `http://localhost:3000` to see the application running.


