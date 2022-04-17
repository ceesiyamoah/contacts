import React from 'react';
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
	Text,
} from '@mantine/core';
import baseURL from '../api';
import { useForm } from '@mantine/form';
import { DatePicker } from '@mantine/dates';
import { useModals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';

function Details() {
	const { id } = useParams();
	const { classes } = useStyles();
	const modals = useModals();
	const navigate = useNavigate();

	const {
		state: { name, address, phone, email, dob },
	} = useLocation();
	const items = [
		{ title: 'Contacts', href: '/' },
		{ title: name, href: '' },
	].map((item, index) => (
		<Anchor href={item.href} key={index}>
			{item.title}
		</Anchor>
	));

	const editContactForm = useForm({
		initialValues: {
			name,
			phone,
			email,
			address,
			birthday: new Date(dob),
		},
		validate: {
			name: (value) => {
				console.log(
					value.length < 2 ? 'Name must be at least 2 characters' : null
				);
				return value.length < 2 ? 'Name must be at least 2 characters' : null;
			},
			phone: (value) =>
				/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(value)
					? null
					: 'Invalid phone number',
			email: (value) =>
				value && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(value)
					? null
					: 'Invalid email',
			address: (value) =>
				value && value.length < 5 ? 'Invalid address' : null,
		},
	});

	const confirmUpdate = (e) => {
		e.preventDefault();
		const { hasErrors } = editContactForm.validate();
		if (hasErrors) return;

		modals.openConfirmModal({
			title: 'Please confirm your action',
			children: (
				<Text size='sm'>
					Are you sure you want to update this contact? Please click confirm to
					proceed.
				</Text>
			),
			labels: { confirm: 'Confirm', cancel: 'Cancel' },
			confirmProps: { color: 'green' },
			onConfirm: () => updateConfirmed(),
		});
	};

	const updateConfirmed = () => {
		const { name, phone, email, address, birthday } = editContactForm.values;
		const body = {
			name,
			phone,
			email,
			address,
			dob: birthday.toISOString(),
		};
		baseURL
			.put('/' + id, body)
			.then((res) => {
				showNotification({
					title: 'Contact updated',
					message: 'Contact has been updated',
					timeout: 5000,
					color: 'green',
				});
				navigate('/');
			})
			.catch((err) => {
				showNotification({
					title: 'Error',
					message: err.message,
					timeout: 5000,
					color: 'red',
				});
			});
	};

	return (
		<div className={classes.wrapper} style={{ height: '100vh' }}>
			<Breadcrumbs>{items}</Breadcrumbs>
			<Box>
				<form onSubmit={confirmUpdate}>
					<TextInput
						placeholder='Spencer Ray'
						required
						label='Name'
						{...editContactForm.getInputProps('name')}
					/>
					<TextInput
						placeholder='02352342303'
						required
						type='tel'
						label='Phone Number'
						{...editContactForm.getInputProps('phone')}
					/>
					<TextInput
						placeholder='spencer@gmail.com'
						label='Email'
						type='email'
						{...editContactForm.getInputProps('email')}
					/>
					<Textarea
						placeholder='413 Dishion Avenue'
						label='Address'
						{...editContactForm.getInputProps('address')}
					/>
					<DatePicker
						placeholder='Birthday'
						label='Birthday'
						maxDate={new Date()}
						{...editContactForm.getInputProps('birthday')}
					/>
					<Group position='right' mt='md'>
						<Button type='submit'>Update</Button>
					</Group>
				</form>
			</Box>
		</div>
	);
}

export default Details;
