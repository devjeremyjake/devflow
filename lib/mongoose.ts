import mongoose from 'mongoose';

let isconnected: boolean = false;

export const connectToDatabase = async () => {
	mongoose.set('strictQuery', true);

	if (!process.env.MONGODB_URL) {
		return console.log('MISSING MONGOBD_URL');
	}

	if (isconnected) {
		console.log('MONGOBD is connected');
	}

	try {
		await mongoose.connect(process.env.MONGODB_URL, {
			dbName: 'devflowCluster',
		});
		isconnected = true;
	} catch (error) {
		console.log('MongoDB connection failed', error);
	}
};
