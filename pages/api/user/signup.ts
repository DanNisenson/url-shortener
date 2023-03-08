// POST user data and create account
// - validate POST data                                              \ error handling
// - query: findOne({ email }) (check for email already registered)  \ error handling
// - encrypt password
// - query: insertOne({ email, encryptedPassword })                  \ error handling
// - tokenize userId
// - res.({ token })
