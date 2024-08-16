import mongoose from 'mongoose';

export class DBClient {
    public async init() {

        const MONGO_DB_USER = process.env.MONGO_DB_USER || '';
        const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD || '';
        const MONGODB_URI = process.env.MONGODB_URI || `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@cluster0.yqdhlhh.mongodb.net/?retryWrites=true&w=majority`;
        
        console.log("Establish new connection with url", MONGODB_URI);
        mongoose.Promise = global.Promise;
        mongoose.connect(MONGODB_URI);
        mongoose.connection.on('error', (error: Error) => console.error(error));
    }
}

const DB = new DBClient();

export default DB;