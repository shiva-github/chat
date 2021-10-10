import Header from "../components/Header";
import Link from 'next/link';

export default function Custom404() {
	var logout = function() {
		localStorage.removeItem('username');
		Router.replace('/');
	}
	return (
		<>
			<Header></Header>
			<div className="container">
				<div className="text-center"><strong>Error: 404 - Page Not Found</strong></div>
				<div className="text-center">
					<Link href="/" id="redirect" onLoad={logout}>
						<a className="loginLink">Login</a>
					</Link>
				</div>
			</div>
		</>
		)
	}
	