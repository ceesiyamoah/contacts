import React, { useState } from 'react';
import useStyles from '../styles';
import Header from '../Header';
import { Modal, Button, Input } from '@mantine/core';
import { BsSearch } from 'react-icons/bs';

function Home() {
	const [addModalOpen, setAddModalOpen] = useState(false);
	const { classes } = useStyles();

	return (
		<>
			<Modal
				centered
				opened={addModalOpen}
				onClose={() => setAddModalOpen(false)}
			></Modal>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<Header buttonAction={() => setAddModalOpen(true)} />
				<main className={classes.wrapper}>
					<Input
						size='md'
						placeholder='Search for contact'
						icon={<BsSearch />}
						rightSection={<Button style={{ height: '80%' }}>Submit</Button>}
						rightSectionWidth={100}
					/>
					<div className={classes.contacts}></div>
				</main>
			</div>
		</>
	);
}

export default Home;
