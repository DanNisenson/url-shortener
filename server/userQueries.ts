import dbConnect from "./db/dbConnect"

export const findUserByEmail = async (email: string) => {
  try {
    const { usersCollection, close } = await dbConnect()
    const user = await usersCollection.findOne({ email: email })
    close()
    return user
  } catch (error) {
    console.log('findUserByEmail error', error)
  }
}