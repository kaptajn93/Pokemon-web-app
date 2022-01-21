import '../styles/globals.css';
import 'antd/dist/antd.css';
import type { AppProps /*, AppContext */ } from 'next/app';
import PageLayout from '../components/pageLayout.component';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
	return (
		<>
			<PageLayout>
				<Component {...pageProps} />
			</PageLayout>
		</>
	);
}

export default MyApp;
