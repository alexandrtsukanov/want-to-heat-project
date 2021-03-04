// const { connect, connection } = require("mongoose");
// const Horse = require('./models/horse');
// async function main() {
//   await connect('mongodb://localhost:27017/horsesrace', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   });
//   const horses = [];
//   horses.push({
//     name: 'Horse 1',
//   })
//   horses.push({
//     name: 'Horse 2',
//   })
//   horses.push({
//     name: 'Horse 3',
//   })
//   horses.push({
//     name: 'Horse 4',
//   })
//   await Horse.insertMany(horses);
//   await connection.close();
// }
// main();
