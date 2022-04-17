import React, { useState, useEffect, useCallback } from 'react';
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
import { BsFillXCircleFill } from 'react-icons/bs';

function Home() {
	const [addModalOpen, setAddModalOpen] = useState(false);
	const [search, setSearch] = useState('');
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
			phone: (value) =>
				/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(value)
					? null
					: 'Invalid phone number',
			email: (value) =>
				!value || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(value)
					? null
					: 'Invalid email',
			address: (value) =>
				value && value.length < 5 ? 'Invalid address' : null,
		},
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		const { hasErrors } = addNewContactForm.validate();
		if (hasErrors) return;
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
			.then(() => {
				showNotification({
					title: 'Contact Added',
					message: 'Contact has been added',
					timeout: 5000,
					color: 'green',
				});
				getData();
				setAddModalOpen(false);
				addNewContactForm.reset();
			})
			.catch((err) => {
				showNotification({
					title: 'An Error occured',
					message: 'Contact could not be created',
					timeout: 5000,
					color: 'red',
				});
			});
	};

	const getData = useCallback((search) => {
		const getContacts = () => {
			const params = {};
			if (search) {
				params.search = search;
			}
			setContacts([]);
			baseURL
				.get('/', {
					params,
				})
				.then(({ data }) => {
					if (!data.length) {
						showNotification({
							title: 'No contacts found',
							autoClose: 5000,
							message: 'Please add a contact',
							color: 'red',
						});
					}
					const modData = groupNamesByFirstLetter(data);
					setContacts(modData);
				})
				.catch((err) => {
					setContacts([]);
					showNotification({
						message: 'There was an issue fetching the contacts',
						autoClose: 5000,
						title: 'Error loading contacts',
						color: 'red',
					});
				});
		};
		getContacts();
	}, []);

	useEffect(() => {
		getData();
	}, [getData]);

	const openAddModal = () => {
		setAddModalOpen(true);
		addNewContactForm.reset();
	};

	const handleSearch = () => {
		getData(search);
	};

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
							type='tel'
							label='Phone Number'
							{...addNewContactForm.getInputProps('phone')}
						/>
						<TextInput
							placeholder='spencer@gmail.com'
							label='Email'
							type='email'
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
							maxDate={new Date()}
							{...addNewContactForm.getInputProps('birthday')}
						/>
						<Group position='right' mt='md'>
							<Button type='submit'>Add</Button>
						</Group>
					</form>
				</Box>
			</Modal>
			<Box
				style={{
					display: 'flex',
					flexDirection: 'column',
					minHeight: '100vh',
					height: '100%',
				}}
			>
				<Header buttonAction={openAddModal} />
				<main className={classes.wrapper}>
					<form onSubmit={(e) => e.preventDefault()}>
						<TextInput
							size='md'
							placeholder='Search for contact'
							icon={<BsSearch />}
							onChange={(e) => setSearch(e.target.value)}
							rightSection={
								<Button
									style={{ height: '80%' }}
									type='submit'
									onClick={handleSearch}
								>
									Submit
								</Button>
							}
							rightSectionWidth={100}
						/>
					</form>
					{contacts.map((group) => (
						<AlphaGroup
							key={group.group}
							letter={group.group}
							contacts={group.children}
							handleRefresh={() => getData()}
						/>
					))}
				</main>
			</Box>
		</>
	);
}

export default Home;
