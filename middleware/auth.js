// This module exports a middleware function named "auth". 
// This middleware function receives a request, a response and a next function as arguments. 
// It checks if the request headers contain a valid "Bearer" token, throwing an error if it's not valid or not present.
// Then, it decodes the token using the JWT_SECRET environment variable and sets a "userID" and "name" property in the "req.user" object.
// Finally, it calls the "next" function to pass the control to the next middleware or endpoint.
// Note that there's a commented code block, which suggests that the authentication could also involve a database query. However, this implementation doesn't use it.