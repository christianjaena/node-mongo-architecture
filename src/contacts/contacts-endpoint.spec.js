import handle from '.';

describe('Contacts Endpoint', () => {
	it('Will NOT create a contact without an email address', async () => {
		const result = await handle({
			method: 'POST',
			body: JSON.stringify({
				firstName: 'asdfklj',
				lastName: 'asdfljl',
			}),
		});
		expect(result).toEqual({
			headers: {
				'Content-Type': 'application/json',
			},
			statusCode: 400,
			data: JSON.stringify({
				success: false,
				error: 'emailAddress can not be null of undefined',
			}),
		});
	});

	it('Will NOT create a contact with an invalid email address', async () => {
		const result = await handle({
			method: 'POST',
			body: JSON.stringify({
				firstName: 'asdfjkl',
				lastName: 'asdfljk',
				emailAddress: 'not-valid-at-all',
			}),
		});

		expect(result).toEqual({
			headers: {
				'Content-Type': 'application/json',
			},
			statusCode: 400,
			data: JSON.stringify({
				success: false,
				error: 'Invalid contact email address',
			}),
		});
	});

	it('Will NOT create a contact without a first name', async () => {
		const result = await handle({
			method: 'POST',
			body: JSON.stringify({
				emailAddress: 'bill@devmastery.com',
				lastName: 'asdfasdf',
			}),
		});

		expect(result).toEqual({
			headers: {
				'Content-Type': 'application/json',
			},
			statusCode: 400,
			data: JSON.stringify({
				success: false,
				error: 'firstName can not be null or undefined',
			}),
		});
	});

	it('Will NOT create an invalid first name', async () => {
		const result = await handle({
			method: 'POST',
			body: JSON.stringify({
				firstName: 'a',
				emailAddress: 'bill@devmastery.com',
				lastName: 'asdfasdf',
			}),
		});

		expect(result).toEqual({
			headers: {
				'Content-Type': 'application/json',
			},
			statusCode: 400,
			data: JSON.stringify({
				success: false,
				error: `A contact's first name must be at least 2 characters long`,
			}),
		});
	});

	it('Will NOT create a contact without valid last name', async () => {
		const result = await handle({
			method: 'POST',
			body: JSON.stringify({
				emailAddress: 'bill@devmastery.com',
				firstName: 'asdf;jlkasd',
			}),
		});

		expect(result).toEqual({
			headers: {
				'Content-Type': 'application/json',
			},
			data: JSON.stringify({
				success: false,
				error: 'lastName can not be null or undefined',
			}),
		});
	});
});
