const mongoose = require("mongoose");

// 2. Set up any schema and models needed by the app
// 3. Export the models
// 4. Import the models into any modules that need them

mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`)
  .then(() => console.log(`Connected to ${process.env.DB_NAME}`))
  .catch((err) => console.log('Error connecting'));