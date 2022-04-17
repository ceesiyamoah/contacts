import React from 'react';
import { Text } from '@mantine/core';
import useStyles from '../styles';
import ContactCard from './ContactCard';

function AlphaGroup({ letter, contacts }) {
	const { classes } = useStyles();

	return (
		<div className={classes.contacts}>
			<Text className={classes.alphatitle}>{letter}</Text>
			<div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
				{contacts.map((contact) => (
					<ContactCard key={contact.id} {...contact} />
				))}
			</div>
		</div>
	);
}

export default AlphaGroup;
