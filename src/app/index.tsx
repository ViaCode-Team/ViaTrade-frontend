import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';

import { QueryProvider, ThemeProvider } from './providers';
import { router } from './router';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryProvider>
			<ThemeProvider>
				<RouterProvider router={router} />
			</ThemeProvider>
		</QueryProvider>
	</StrictMode>,
);
