import Header from "../components/Header";
import Link from 'next/link';


export default function Custom500() {
  var logout = function() {
		localStorage.removeItem('username');
		Router.replace('/');
	}
	return (
    <>
			<Header></Header>
			<div className="container">
				<div className="text-center"><strong>Error: 500 - Server-side error occurred</strong></div>
				<div className="text-center">
					<Link href="/" id="redirect" onLoad={logout}>
						<a className="loginLink">Login</a>
					</Link>
				</div>
			</div>
		</>
  )
  }
  