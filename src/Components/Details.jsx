import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import useStyles from '../styles';
import {
	Breadcrumbs,
	Anchor,
	Box,
	TextInput,
	Textarea,
	Group,
	Button,
} from '@mantine/core';
import baseURL from '../api';
import { useForm } from '@mantine/form';
import { DatePicker } from '@mantine/dates';

function Details() {
	const { id } = useParams();
	const { classes } = useStyles();
	const {
		state: { name, address, phone, email, dob },
	} = useLocation();
	useEffect(() => {
		baseURL.get('/' + id).then((res) => {
			console.log(res);
		});
	}, [id]);
	const items = [
		{ title: 'Contacts', href: '/' },
		{ title: name, href: '' },
	].map((item, index) => (
		<Anchor href={item.href} key={index}>
			{item.title}
		</Anchor>
	));

	console.log(new Date(dob));
	const editContactForm = useForm({
		initialValues: {
			name,
			phone,
			email,
			address,
			birthday: new Date(dob),
		},
		name: (value) =>
			value.length < 2 ? 'Name must be at least 2 characters' : null,
	});

	const handleSubmit = () => {};

	return (
		<div className={classes.wrapper}>
			<Breadcrumbs>{items}</Breadcrumbs>
			<Box>
				<form onSubmit={handleSubmit}>
					<TextInput
						placeholder='Spencer Ray'
						required
						label='Name'
						value={editContactForm.values.name}
						onChange={(event) =>
							editContactForm.setFieldValue(event.currentTarget.value)
						}
					/>
					<TextInput
						placeholder='02352342303'
						required
						label='Phone Number'
						value={editContactForm.values.phone}
						onChange={(event) =>
							editContactForm.setFieldValue(event.currentTarget.value)
						}
					/>
					<TextInput
						placeholder='spencer@gmail.com'
						label='Email'
						value={editContactForm.values.email}
						onChange={(event) =>
							editContactForm.setFieldValue(event.currentTarget.value)
						}
					/>
					<Textarea
						placeholder='413 Dishion Avenue'
						label='Address'
						value={editContactForm.values.address}
						onChange={(event) =>
							editContactForm.setFieldValue(event.currentTarget.value)
						}
					/>
					<DatePicker
						placeholder='Birthday'
						label='Birthday'
						value={editContactForm.values.birthday}
						onChange={(event) =>
							editContactForm.setFieldValue(event.currentTarget.value)
						}
					/>
					<Group position='right' mt='md'>
						<Button type='submit'>Add</Button>
					</Group>
				</form>
			</Box>
		</div>
	);
}

export default Details;
