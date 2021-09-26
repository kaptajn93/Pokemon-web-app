import '../styles/globals.css';
import 'antd/dist/antd.css';
import PageLayout from '../components/pageLayout.component';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<PageLayout>
				<Component {...pageProps} />
			</PageLayout>
		</>
	);
}

export default MyApp;
