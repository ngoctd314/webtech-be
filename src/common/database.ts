import mongoose from 'mongoose';

// eslint-disable-next-line import/prefer-default-export
export function connect(uri: string) {
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      // autoIndex: false
      // autoCreate: false
    })
    .then(() => console.log('Database is connected'))
    .catch((err) => console.log(err));
}
