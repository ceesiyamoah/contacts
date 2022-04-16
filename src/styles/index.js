import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme, _params, getRef) => ({
	wrapper: {
		backgroundColor:
			theme.colorScheme === 'dark' ? theme.colors.dark[7] : '#fff',
		height: '100vh',
		padding: '10px',
		// display: 'flex',
		// justifyContent: 'center',
		// alignItems: 'center',
	},
	button: {
		backgroundColor: 'red',
		'&:hover': {
			backgroundColor: 'green',
		},
	},
	header: {
		// position: 'fixed',
		// top: '0px',
		backgroundColor: theme.colors.dark[7],
		borderBottom: `1px solid ${theme.colors.dark[6]}`,
		boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
		padding: '10px',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	contacts: {
		marginTop: '10px',
	},
}));

export default useStyles;
