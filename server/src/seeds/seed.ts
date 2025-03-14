import db from "../config/connection.js";
import Question from "../models/Question.js";

import pythonQuestions from './pythonQuestions.json' assert { type: "json" };

db.once('open', async () => {
  try {
    // Clean the collection if it exists
    if (db.collections.questions) {
      await db.collections.questions.drop();
      console.log('Questions collection dropped');
    }

    // Insert new data
    await Question.insertMany(pythonQuestions);

    console.log('Questions seeded!');
  } catch (err) {
    console.error('Error seeding database:', err);
  }
});
