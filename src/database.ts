import mongoose from 'mongoose';
import { db } from './config';

const dbURI = `mongodb://ulearn-chat-db:27017/${db.name}`;
const options = {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
    autoIndex: true,
	poolSize: 10, // Maintain up to 10 socket connections
	// If not connected, return errors immediately rather than waiting for reconnect
	bufferMaxEntries: 0,
	connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};

export const connectDB = () => {
    mongoose.connect(dbURI, options)
        .then(() => { console.log('Mongoose connection done'); })
	    .catch(e => {
            console.log('Mongoose connection error');
            console.log(e);
        });

    mongoose.connection.on('connected', () => {
        console.log('Mongoose connection open to ' + dbURI);
    });

    mongoose.connection.on('error', err => {
        console.log('Mongoose connection error: ' + err);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose connection disconnected');
    });
    
    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });
}