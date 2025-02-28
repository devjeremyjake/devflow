'use server';

import Question from '@/database/question.model';
import Tag from '@/database/tag.model';
import User from '@/database/user.model';
import { revalidatePath } from 'next/cache';
import { connectToDatabase } from '../mongoose';
import { CreateQuestionParams, GetQuestionParams } from './shared.types';

export async function getQuestions(params: GetQuestionParams) {
	try {
		connectToDatabase();
		const questions = await Question.find({})
			.populate({ path: 'tags', model: Tag })
			.populate({ path: 'author', model: User })
			.sort({ createdAt: -1 });

		return { questions };
	} catch (error) {
		console.log('Error', error);
		throw error;
	}
}

export async function createQuestion(params: CreateQuestionParams) {
	try {
		// connect to the database
		connectToDatabase();
		// save parameters to database
		const { title, content, tags, author, path } = params;
		const question = await Question.create({
			title,
			content,
			author,
		});

		const tagDocument = [];

		// create the tags or get exisiting tags.
		for (const tag of tags) {
			const exisitngTag = await Tag.findOneAndUpdate(
				{ name: { $regex: new RegExp(`^${tag}$`, 'i') } },
				{ $setOnInsert: { name: tag }, $push: { question: question?._id } },
				{ upsert: true, new: true }
			);
			tagDocument.push(exisitngTag);
		}

		await Question.findByIdAndUpdate(question._id, {
			$push: { tags: { $each: tagDocument } },
		});

		// Create an intraction record for the user's ask_question action

		// Increment author's reputation by +5 for creating a question.

		revalidatePath(path as string);
	} catch (error) {}
}
