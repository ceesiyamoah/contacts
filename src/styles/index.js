import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme, _params, getRef) => ({
	wrapper: {
		backgroundColor:
			theme.colorScheme === 'dark' ? theme.colors.dark[7] : '#fff',
		height: '100%',
		padding: '10px',
		color: 'white',
	},

	header: {
		backgroundColor: theme.colors.dark[7],
		borderBottom: `1px solid ${theme.colors.dark[6]}`,
		boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
		padding: '10px',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		position: 'sticky',
		top: 0,
		zIndex: 100,
	},
	alphatitle: {
		color: theme.colors.dark[3],
		marginLeft: '10px',
		textTransform: 'uppercase',
		position: 'sticky',
		top: '60px',
		zIndex: 10,
	},
	paper: {
		display: 'flex',
		gap: '10px',
		alignItems: 'center',
		width: '100%',
		cursor: 'pointer',
		position: 'relative',
	},
	items: { display: 'flex', alignItems: 'center', gap: '10px' },
	contacts: {
		marginTop: '10px',
	},
}));

export default useStyles;
