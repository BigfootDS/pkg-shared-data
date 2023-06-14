# To-Do List

## Error Classes

### General

- DataValidationRequestFailure - middleware ran on the request body, params and headers and found invalid data
- DataValidationDatabaseFailure - the database was given invalid data from this request
- DataRetrievalFailure - request is valid and server is working, but the database cannot find the desired data
- ActionProhibited - user performing the request does not have a suitable role to carry out the requested action

### User (Auth)

- LoginFailureNoUser - no user found with the provided login credentials
- LoginFailureWrongCredentials - the provided login credentials were incorrect for the matching user
- EmailNotSuitable - when setting or changing  an email, the email is already in use by another user's auth entry OR the email doesn't meet syntax requirements
- PasswordNotSuitable - when setting or changing a password, this is returned if the password doesn't meet syntax requirements
- JWTExpired - provided JWT expired and is no longer valid, the user must sign in again

### Token (Auth)

- TokenNotFound - no token found with the provided value
- WrongTokenType - token value provided is not suitable for the requested token activation type (eg. use an email verification token on a TV login screen)