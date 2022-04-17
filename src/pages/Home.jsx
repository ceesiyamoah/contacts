import React, { useState, useEffect } from 'react';
import useStyles from '../styles';
import Header from '../Components/Header';
import { Modal, Button, TextInput, Box, Textarea, Group } from '@mantine/core';
import { BsSearch } from 'react-icons/bs';
import AlphaGroup from '../Components/AlphaGroup';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import baseURL from '../api';
import { showNotification } from '@mantine/notifications';
import { groupNamesByFirstLetter } from '../utils';

function Home() {
	const [addModalOpen, setAddModalOpen] = useState(false);
	const [contacts, setContacts] = useState([]);

	const { classes } = useStyles();
	const addNewContactForm = useForm({
		initialValues: {
			name: '',
			phone: '',
			email: '',
			address: '',
			birthday: undefined,
		},
		validate: {
			name: (value) =>
				value.length < 2 ? 'Name must be at least 2 characters' : null,
		},
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		addNewContactForm.validate();
		console.log(addNewContactForm.values);
		if (!addNewContactForm.errors) return;

		const { name, phone, email, dob, address } = addNewContactForm.values;
		const body = {
			name: name,
			phoneNumber: phone,
			email: email || '',
			address: address || '',
			dob: dob,
		};
		baseURL
			.post('/', body)
			.then((res) => {
				showNotification({
					message: 'Contact Added',
					variant: 'success',
				});
				setAddModalOpen(false);
			})
			.catch((err) => {
				showNotification({
					message: 'Error Adding Contact',
					variant: 'error',
				});
			});
	};

	useEffect(() => {
		baseURL
			.get('/')
			.then(({ data }) => {
				console.log(data);
				if (!data.length) {
					showNotification({
						title: 'No contacts found',
						autoClose: 5000,
						message: 'Please add a contact',
						color: 'red',
					});
				}
				const modData = groupNamesByFirstLetter(data);
				console.log(modData);
				setContacts(modData);
			})
			.catch((err) => {
				// setLoading(false);
				setContacts([]);
				showNotification({
					message: 'There was an issue fetching the contacts',
					autoClose: 5000,
					title: 'Error loading contacts',
					color: 'red',
				});
			});
	}, []);

	return (
		<>
			<Modal
				centered
				opened={addModalOpen}
				onClose={() => setAddModalOpen(false)}
			>
				<Box>
					<form onSubmit={handleSubmit}>
						<TextInput
							placeholder='Spencer Ray'
							required
							label='Name'
							{...addNewContactForm.getInputProps('name')}
						/>
						<TextInput
							placeholder='02352342303'
							required
							label='Phone Number'
							{...addNewContactForm.getInputProps('phone')}
						/>
						<TextInput
							placeholder='spencer@gmail.com'
							label='Email'
							{...addNewContactForm.getInputProps('email')}
						/>
						<Textarea
							placeholder='413 Dishion Avenue'
							label='Address'
							{...addNewContactForm.getInputProps('address')}
						/>
						<DatePicker
							placeholder='Birthday'
							label='Birthday'
							{...addNewContactForm.getInputProps('birthday')}
						/>
						<Group position='right' mt='md'>
							<Button type='submit'>Add</Button>
						</Group>
					</form>
				</Box>
			</Modal>
			<Box style={{ display: 'flex', flexDirection: 'column' }}>
				<Header buttonAction={() => setAddModalOpen(true)} />
				<main className={classes.wrapper}>
					<TextInput
						size='md'
						placeholder='Search for contact'
						icon={<BsSearch />}
						rightSection={<Button style={{ height: '80%' }}>Submit</Button>}
						rightSectionWidth={100}
					/>
					{contacts.map((group) => (
						<AlphaGroup
							key={group.group}
							letter={group.group}
							contacts={group.children}
						/>
					))}
				</main>
			</Box>
		</>
	);
}

export default Home;
