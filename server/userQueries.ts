import dbConnect from './db/dbConnect'

export const findUserByEmail = async (email: string) => {
  try {
    const { usersCollection, close } = await dbConnect()
    const user = await usersCollection.findOne({ email: email })
    close()
    return user
  } catch (error) {
    // console.log('findUserByEmail error', error)
  }
}

export const insertNewUser = async (email: string, hashedPassword: string) => {
  const newUser = {
    email: email,
    password: hashedPassword,
  }
  try {
    const { usersCollection, close } = await dbConnect()
    const dbRes = await usersCollection.insertOne(newUser)
    close()
    return dbRes
  } catch (error) {
    // console.log('insertNewUser error', error)
  }
}

export const findUserUrls = async (userId: string) => {
  try {
    const { urlsCollection, close } = await dbConnect()
    const urls = await urlsCollection.find({ userId: userId }).toArray();
    close()
    return urls
  } catch (error) {
    // console.log('findUserUrls error', error)
    return
  }
}
