const MongoClient = require('mongodb').MongoClient

const url = process.env.DB_URL

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

export default async function dbConnect() {
  try {
    await client.connect()
  } catch (error) {
    // console.log('! db connection function', error)
  }
  const urlsCollection = client.db('url-shortener').collection('urls')
  const usersCollection = client.db('url-shortener').collection('users')
  const close = client.close.bind(client)
  return { urlsCollection, usersCollection, close }
}
