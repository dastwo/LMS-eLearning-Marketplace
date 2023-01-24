const mongoose = require('mongoose')
mongoose.set('strictQuery', true);
 const connectDb = async () => {
    try {
      await mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      console.log(`**database connect**`);
    } catch (error) {
      console.log(error.message)
    }
  }

module.exports = connectDb