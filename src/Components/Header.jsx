import React from 'react';
import { Header as MTHeader, Button, Text } from '@mantine/core';
import useStyles from '../styles';
import { useMediaQuery } from '@mantine/hooks';
import { IoIosAddCircleOutline } from 'react-icons/io';

function Header({ buttonAction }) {
	const { classes } = useStyles();
	const matches = useMediaQuery('(min-width:400px)');
	return (
		<MTHeader className={classes.header} height={60}>
			<Text
				size='xl'
				color='violet'
				transform='uppercase'
				style={{ fontWeight: 'bold' }}
				variant='gradient'
				gradient={{ from: 'red', to: 'cyan', deg: 45 }}
			>
				Contacts
			</Text>
			<Button onClick={buttonAction}>
				{matches ? 'Add New Contact' : <IoIosAddCircleOutline />}
			</Button>
		</MTHeader>
	);
}

export default Header;
