import models from '../models/index.js';
import db from '../config/connection.js';

export default async (modelName: "Question", collectionName: string) => {
  try {
    // Add non-null assertion operator to fix TypeScript error
    let modelExists = await models[modelName]!.db.db.listCollections({
      name: collectionName
    }).toArray()

    if (modelExists.length) {
      await db.dropCollection(collectionName);
    }
  } catch (err) {
    throw err;
  }
}
