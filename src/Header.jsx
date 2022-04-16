import React from 'react';
import { Header as MTHeader, Button, Text } from '@mantine/core';
import useStyles from './styles';

function Header({ buttonAction }) {
	const { classes } = useStyles();
	return (
		<MTHeader className={classes.header} height={60}>
			<Text
				size='xl'
				color='violet'
				transform='uppercase'
				style={{ fontWeight: 'bold' }}
			>
				Contacts
			</Text>
			<Button onClick={buttonAction}>Add New Contact</Button>
		</MTHeader>
	);
}

export default Header;
