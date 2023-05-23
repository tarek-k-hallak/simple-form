/** @format */

import 'src/styles/globals.css';

import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

import { CacheProvider } from '@emotion/react';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';

const theme = createTheme({
	direction: 'ltr',
	components: {
		MuiTextField: {
			defaultProps: {
				style: {
					borderRadius: 5,
				},
			},
		},
	},
});

// Create rtl cache
const cacheRtl = createCache({
	key: 'muirtl',
	stylisPlugins: [prefixer, rtlPlugin],
});

export default function App({ Component, pageProps }) {
	return (
		<ThemeProvider theme={theme}>
			<CacheProvider value={cacheRtl}>
				<Component {...pageProps} />
			</CacheProvider>
		</ThemeProvider>
	);
}
