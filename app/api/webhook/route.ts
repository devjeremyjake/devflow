//ignore typescript
// @ts-nocheck
import { CreateUser, DeleteUser } from '@/lib/actions/user.action';
import type { User } from '@clerk/nextjs/api';
import { headers } from 'next/headers';
import { Webhook } from 'svix';

type UnwantedKeys =
	| 'emailAddresses'
	| 'firstName'
	| 'lastName'
	| 'primaryEmailAddressId'
	| 'primaryPhoneNumberId'
	| 'phoneNumbers';

interface UserInterface extends Omit<User, UnwantedKeys> {
	email_addresses: {
		email_address: string;
		id: string;
	}[];
	primary_email_address_id: string;
	first_name: string;
	last_name: string;
	primary_phone_number_id: string;
	phone_numbers: {
		phone_number: string;
		id: string;
	}[];
}

const webhookSecret: string = process.env.NEXT_CLERK_WEBHOOK_SECRET || '';

export async function POST(req) {
	const payload = await req.json();
	const payloadString = JSON.stringify(payload);
	const headerPayload = headers();
	const svixId = headerPayload.get('svix-id');
	const svixIdTimeStamp = headerPayload.get('svix-timestamp');
	const svixSignature = headerPayload.get('svix-signature');
	if (!svixId || !svixIdTimeStamp || !svixSignature) {
		console.log('svixIdTimeStamp', svixIdTimeStamp);
		console.log('svixSignature', svixSignature);
		return new Response('Error occured', {
			status: 400,
		});
	}
	const svixHeaders = {
		'svix-id': svixId,
		'svix-timestamp': svixIdTimeStamp,
		'svix-signature': svixSignature,
	};
	const wh = new Webhook(webhookSecret);
	let evt: Event | null = null;
	try {
		evt = wh.verify(payloadString, svixHeaders) as Event;
	} catch (_) {
		console.log('error');
		return new Response('Error occured', {
			status: 400,
		});
	}

	// Handle the webhook
	const eventType: EventType = evt.type;
	if (eventType === 'user.created') {
		const {
			id,
			email_addresses,
			primary_email_address_id,
			image_url,
			username,
			first_name,
			last_name,
		} = evt.data;

		// Create anew userin databbase
		const mongoUser = await CreateUser({
			clerkId: id,
			name: `${first_name}${last_name ? ` ${last_name}` : ''}`,
			email: email_addresses[0]?.email_address,
			username: username!,
			picture: image_url,
		});
		return NextResponse.json({ message: 'OK', user: mongoUser });
	}

	if (eventType === 'user.updated') {
		const {
			id,
			email_addresses,
			primary_email_address_id,
			image_url,
			username,
			first_name,
			last_name,
		} = evt.data;

		// Create anew userin databbase
		const mongoUser = await UpdateUser({
			clerkId: id,
			updateData: {
				name: `${first_name}${last_name ? ` ${last_name}` : ''}`,
				email: email_addresses[0]?.email_address,
				username: username!,
				picture: image_url,
			},
			path: `/profile/${id}`,
		});
		return NextResponse.json({ message: 'OK', user: mongoUser });
	}

	if (eventType === 'user.deleted') {
		const { id } = evt.data;

		const deletedUser = await DeleteUser({
			clerkId: id!,
		});

		return NextResponse.json({ message: 'OK', user: deletedUser });
	}

	return new Response('', {
		status: 201,
	});
}

type Event = {
	data: UserInterface;
	object: 'event';
	type: EventType;
};

type EventType = 'user.created' | 'user.updated' | '*';
