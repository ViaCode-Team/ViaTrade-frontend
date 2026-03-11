import Box from '@mui/material/Box';
import { useColorScheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { getThemeState } from '../lib/theme';

export function ThemeSwitcher() {
	const { mode, setMode } = useColorScheme();
	const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
	const { current } = getThemeState(mode, prefersDark);

	const checked = current === 'light';

	const toggleTheme = () => {
		setMode(checked ? 'dark' : 'light');
	};

	return (
		<Box
			component='label'
			sx={{
				fontSize: 17,
				position: 'relative',
				display: 'inline-block',
				width: '4em',
				height: '2.2em',
				borderRadius: 30,
				boxShadow: '0 0 10px rgba(0,0,0,0.1)',

				'& input': {
					opacity: 0,
					width: 0,
					height: 0,
					position: 'absolute',
				},

				'& input:checked + .slider': {
					bgcolor: '#00a6ff',
				},

				'& input:checked + .slider:before': {
					transform: 'translateX(1.8em)',
					boxShadow: 'inset 15px -4px 0 15px #ffcf48',
				},

				'& input:checked ~ .slider .star': {
					opacity: 0,
				},

				'& input:checked ~ .slider .cloud': {
					opacity: 1,
				},

				'& .slider': {
					position: 'absolute',
					cursor: 'pointer',
					inset: 0,
					bgcolor: '#2a2a2a',
					transition: '0.4s',
					borderRadius: 30,
					overflow: 'hidden',
				},

				'& .slider:before': {
					content: '""',
					position: 'absolute',
					height: '1.2em',
					width: '1.2em',
					borderRadius: 20,
					left: '0.5em',
					bottom: '0.5em',
					transition: '0.4s',
					transitionTimingFunction: 'cubic-bezier(0.81,-0.04,0.38,1.5)',
					boxShadow: 'inset 8px -4px 0 #fff',
				},

				'& .star': {
					position: 'absolute',
					width: 5,
					height: 5,
					bgcolor: '#fff',
					borderRadius: '50%',
					transition: '0.4s',
				},

				'& .cloud': {
					width: '3.5em',
					position: 'absolute',
					bottom: '-1.4em',
					left: '-1.1em',
					opacity: 0,
					transition: '0.4s',
				},
			}}
		>
			<input type='checkbox' checked={checked} onChange={toggleTheme} />

			<Box className='slider'>
				<Box className='star' sx={{ left: '2.5em', top: '0.5em' }} />
				<Box className='star' sx={{ left: '2.2em', top: '1.2em' }} />
				<Box className='star' sx={{ left: '3em', top: '0.9em' }} />

				<Box
					component='svg'
					viewBox='0 0 16 16'
					className='cloud'
				>
					<path
						transform='matrix(.77976 0 0 .78395-299.99-418.63)'
						fill='#fff'
						d='m391.84 540.91c-.421-.329-.949-.524-1.523-.524-1.351 0-2.451 1.084-2.485 2.435-1.395.526-2.388 1.88-2.388 3.466 0 1.874 1.385 3.423 3.182 3.667v.034h12.73v-.006c1.775-.104 3.182-1.584 3.182-3.395 0-1.747-1.309-3.186-2.994-3.379.007-.106.011-.214.011-.322 0-2.707-2.271-4.901-5.072-4.901-2.073 0-3.856 1.202-4.643 2.925'
					/>
				</Box>
			</Box>
		</Box>
	);
}
