import { Menu } from 'antd';
import Link from 'next/link';
import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout';
import Head from 'next/head';

/**
 * @component
 * @name PageLayout
 * @description a page layout wrapper for including menu header with navigation
 * @param {Array} list of children components
 * @returns jsx layout wrapper
 */
const PageLayout = ({ children }) => {
	const pages = ['pokedex', 'pokebelt'];
	return (
		<>
			<Head>
				<title>Pokemon web-app</title>
				<meta name='A web-app for displaying pokemon' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Layout className='layout'>
				<Header>
					<Menu theme='dark' mode='horizontal' defaultSelectedKeys={['page-0']}>
						{pages.map((pageName, index) => {
							return (
								<Menu.Item key={'page-' + index}>
									<Link href={'/' + pageName}>{pageName}</Link>
								</Menu.Item>
							);
						})}
					</Menu>
				</Header>
				<Content style={{ padding: '0 50px' }}>
					<div className='site-layout-content'>{children}</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}>Created by Henrik Smith</Footer>
			</Layout>
		</>
	);
};

export default PageLayout;
