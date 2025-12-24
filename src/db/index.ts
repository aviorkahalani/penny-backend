import mongoose from 'mongoose'

const main = async () => {
  const uri =
    process.env.NODE_ENV === 'development'
      ? process.env.MONGO_LOCAL_URI
      : process.env.MONGO_REMOTE_URI
  await mongoose.connect(uri)
}

main()
  .then(() => {
    console.log('✔︎ connected to db')
  })
  .catch((_) => {
    console.error('✗ failed to connect to db')
  })
