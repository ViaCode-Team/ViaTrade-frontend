import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';

import { StoreProvider, ThemeProvider } from './providers';
import { router } from './router';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<StoreProvider>
			<ThemeProvider>
				<RouterProvider router={router} />
			</ThemeProvider>
		</StoreProvider>
	</StrictMode>,
);
