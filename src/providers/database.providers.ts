import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(String(process.env.MONGO_URI), {
        dbName: process.env.DB_NAME,
      }),
  },
];
