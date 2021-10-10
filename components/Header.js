import Script from 'next/script'

import Head from 'next/head';
import header from './layout.module.css';

export default function Header({ children }) {
	return (
		<>
			<div>
				<Script src="/js/jquery.min.js"></Script>
				{/* <Script src="/js/bootstrap.min.js"></Script> */}
				{/* <Script type="text/javascript" src="/js/jquery.mCustomScrollbar.min.js"></Script> */}
				{/* <Script src="/js/socket.io.min.js"></Script> */}
				{/* <Script src="/js/script.js"></Script> */}
			</div>
			<Head>
				<title>Chat App</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<div className="container">  
				<header className='container'>
					<h1 className={header.titlemain}>My Chat App</h1>
					<p>{children}</p>
				</header>
			</div>
		</>
	  )
}