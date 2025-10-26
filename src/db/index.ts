import mongoose from 'mongoose'

const main = async () => {
  await mongoose.connect(process.env.MONGO_LOCAL_URI)
}

main()
  .then(() => {
    console.log('✔︎ connected to db')
  })
  .catch((_) => {
    console.error('✗ failed to connect to db')
  })
