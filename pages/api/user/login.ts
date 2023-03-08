// POST user data and respond with token
// - validate POST data             \ error handling
// - query: findOne({ email })      \ error handling
// - encrypt password and compare   \ error handling
// - tokenize userId
// - res.({ token })