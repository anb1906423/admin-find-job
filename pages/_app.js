import { useEffect } from 'react';
import dynamic from 'next/dynamic';

import '../styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.css';
import Script from 'next/script';
import reduxStore, { persistor } from '../redux';
import { Provider } from 'react-redux';
import Head from 'next/head';

const SideBar = dynamic(() => import('../components/SideBar'), {
    ssr: false,
});

export default function MyApp({ Component, pageProps }) {
    useEffect(() => {
        require('bootstrap/dist/js/bootstrap.bundle.min.js');
    }, []);
    return (
        <Provider store={reduxStore}>
            <SideBar>
                <Script
                    src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
                    integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
                    crossOrigin="anonymous"
                />
                <Head>
					<title>Administrator</title>
					<link rel="icon" href="../favicon.png" />
				</Head>
                <Component {...pageProps} persistor={persistor} />
            </SideBar>
        </Provider>
    );
}
