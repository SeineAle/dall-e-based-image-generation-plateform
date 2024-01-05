import express from "express";
import * as dotenv from 'dotenv'; // import everything from dotenv
import cors from 'cors'; // import cors
import connectDB from "./MongoDB/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";
dotenv.config();

const app = express();

// ********************* middlewares ************************ //
app.use(cors());
/*CORS: Stands for Cross-Origin Resource Sharing. 
It's a security feature implemented by web browsers that restricts web pages from making requests to a different domain than the one that served the web page. 
This restriction is known as the Same-Origin Policy.
When you use app.use(cors()), you are telling your Express application to utilize the CORS middleware for all routes. 
This middleware adds necessary HTTP headers to responses to inform browsers that it's safe for frontend code running in one origin to interact with the server on a different origin.*/
app.use(express.json({limit : '50mb'})) 
/* This is a built-in middleware in Express that parses incoming request bodies with JSON payloads. 
It allows the application to read JSON data sent in the request body and converts it into a JavaScript object.
The limit option specifies the maximum size of the JSON payload that can be handled. 
In this case, it's set to '50mb', which means the middleware will accept JSON payloads up to 50 megabytes in size. 
If a larger payload is received, it will respond with an error indicating that the payload is too large.*/
app.use('/api/v1/post', postRoutes)
app.use('/api/v1/dalle', dalleRoutes)
/*s: The first parameter in app.use() is a string that defines the base path for the specified routes. 
It tells Express to use these routers (postRoutes and dalleRoutes) for any routes that start with the provided path.
For example, if a request is made to /api/v1/post/someRoute, it will be handled by the postRoutes.
Similarly, a request to /api/v1/dalle/anotherRoute will be handled by the dalleRoutes.*/
// ********************* middlewares *********************** //

// ********************* Routes *********************** //
app.get('/', async (req, res) => {
    res.send("Hello From Backend !!");
});
// ********************* Routes *********************** //

(async () => {
    try{
        connectDB(process.env.MONGODB_URL);
        app.listen(3000, () => console.log("Server has started on http://localhost:3000"));
    }catch(err) {console.log(err)};
})();

