import React from 'react';
import { showNotification } from '@mantine/notifications';

import { BsFillTelephoneFill, BsHouseFill } from 'react-icons/bs';
import { AiOutlineUser } from 'react-icons/ai';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { FaBirthdayCake } from 'react-icons/fa';
import {
	Paper,
	Text,
	Avatar,
	Title,
	ActionIcon,
	Box,
	Tooltip,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import useStyles from '../styles';
import { FiEdit2 } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import baseURL from '../api';
import { useModals } from '@mantine/modals';

function ContactCard({
	address,
	dob,
	phoneNumber,
	email,
	name,
	id,
	handleRefresh,
}) {
	const { classes } = useStyles();
	const navigate = useNavigate();
	const modals = useModals();

	const confirmDelete = () => {
		baseURL
			.delete('/' + id)
			.then((res) => {
				showNotification({
					title: 'Contact deleted',
					message: 'Contact has been deleted',
					timeout: 5000,
					color: 'green',
				});
				handleRefresh();
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

	const Delete = () =>
		modals.openConfirmModal({
			title: 'Please confirm your action',
			children: (
				<Text size='sm'>
					Are you sure you want to delete {name}'s contact. Please click confirm
					to proceed.
				</Text>
			),
			labels: { confirm: 'Confirm', cancel: 'Cancel' },
			confirmProps: { color: 'red' },
			onConfirm: confirmDelete,
		});

	return (
		<Paper
			shadow='xs'
			p='md'
			withBorder
			className={classes.paper}
			onClick={() =>
				navigate(`/contacts/${id}`, {
					state: { name, dob, address, email, id, phone: phoneNumber },
				})
			}
		>
			<Box
				style={{
					position: 'absolute',
					top: '10px',
					right: '10px',
					display: 'flex',
					gap: '10px',
				}}
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<ActionIcon variant='filled' color='red'>
					<Tooltip label='Delete' withArrow>
						<MdDelete size={20} onClick={Delete} />
					</Tooltip>
				</ActionIcon>
				<ActionIcon variant='hover' color={'blue'}>
					<Tooltip label='Edit' withArrow>
						<FiEdit2 />
					</Tooltip>
				</ActionIcon>
			</Box>
			<Avatar color='cyan' radius='xl'>
				{name
					.split(' ')
					.splice(0, 2)
					.map((name) => name[0])
					.join('')
					.toUpperCase()}
			</Avatar>
			<div>
				<div className={classes.items}>
					<AiOutlineUser />
					<Title order={4}>{name}</Title>
				</div>
				<div className={classes.items}>
					<BsFillTelephoneFill />
					<Text>{phoneNumber}</Text>
				</div>
				<div className={classes.items}>
					<MdOutlineAlternateEmail />
					<Text variant='link'>{email || '-'}</Text>
				</div>
				<div className={classes.items}>
					<BsHouseFill />
					<Text>{address || '-'}</Text>
				</div>
				<div className={classes.items}>
					<FaBirthdayCake />
					<Text>
						{dob
							? new Date(dob).toLocaleDateString('en', {
									month: 'short',
									day: 'numeric',
									year: 'numeric',
							  })
							: '-'}
					</Text>
				</div>
			</div>
		</Paper>
	);
}

export default ContactCard;
