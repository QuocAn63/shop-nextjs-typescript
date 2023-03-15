import mongoose from 'mongoose'

const dbConnector = async () => {
    await mongoose.connect(process.env.NEXT_PUBLIC_mongo_uri as string)
}

export default dbConnector