import React, { useRef, useEffect, useState } from 'react';
import { Text } from '@mantine/core';
import useStyles from '../styles';
import ContactCard from './ContactCard';

function AlphaGroup({ letter, contacts, handleRefresh }) {
	const { classes } = useStyles();
	const letterRef = useRef();
	const [highlight, setHighlight] = useState(false);
	useEffect(() => {
		const scroller = window.addEventListener('scroll', (e) => {
			const letterPosition = letterRef.current?.getBoundingClientRect();
			setHighlight(letterPosition?.top === 60 ? true : false);
		});

		return () => {
			window.removeEventListener('scroll', scroller);
		};
	}, []);

	return (
		<div className={classes.contacts}>
			<Text
				className={classes.alphatitle}
				ref={letterRef}
				style={{
					color: highlight ? 'white' : '',
				}}
			>
				{letter}
			</Text>
			<div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
				{contacts.map((contact) => (
					<ContactCard
						key={contact.id}
						{...contact}
						handleRefresh={handleRefresh}
					/>
				))}
			</div>
		</div>
	);
}

export default AlphaGroup;
