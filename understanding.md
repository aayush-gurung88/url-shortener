// Import Express 
const express = require("express");

// Create Express Application (just like in fastapi )
// express() creates an Express Application instance and that application is stored inside the variable app 
const app = express();

// this is to start the server 
// tells node start listening for incoming HTTP requests on port 3000
// and fucntion inside that runs when server successfully starts listening 
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});


<!-- A helper function is a small, focused function that performs a specific task to assist a main function or program -->
like in the program we have many helper functions like saveDatabase , generateShortID , 