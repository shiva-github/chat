import HeaderComp from  './Header';
import LoginStyle from  '../styles/Login.module.css';
import Image from 'next/image';
import Router from 'next/router'


const myLoader = ({ src, width, quality }) => {
	return `/images/${src}?w=${width || 75}&q=${quality || 75}`
}

export default function Login({ children }) {
	
	var LoginUser = () => {
		if (typeof window === 'object') {
			let username = document.getElementById('login');
			if (username.value.trim() != '') {
				localStorage.setItem('username', username.value.trim());
				Router.push('/chat');
			}
		}
		return false;
	}
	
	return (
	<>	
		<HeaderComp>{children}</HeaderComp>
		<div className={LoginStyle.wrapper + " " + LoginStyle.fadeInDown}>
			<div id={LoginStyle.formContent}>
				{/* <!-- Tabs Titles --> */}

				{/* <!-- Icon --> */}
				<div className={LoginStyle.fadeIn + " " + LoginStyle.first + " " + LoginStyle.image_login}>
					<Image loader={myLoader} src="user.png" id="icon" height={70} width={70} alt="User Icon" />
				</div>

				{/* <!-- Login Form --> */}
				<div>
					<input type="text" id="login" className={LoginStyle.inputs + ' ' + LoginStyle.fadeIn + ' ' + LoginStyle.second} name="login" placeholder="Username" />
					{/* <input type="text" id="password" className={LoginStyle.inputs + ' ' + LoginStyle.fadeIn + ' ' + LoginStyle.third} name="login" placeholder="password" /> */}
					<input type="submit" className={LoginStyle.button_login + ' ' + LoginStyle.fadeIn + ' ' + LoginStyle.fourth} value="Log In" onClick={LoginUser} />
				</div>

				{/* <!-- Remind Passowrd --> */}
				<div id={LoginStyle.formFooter}>
					{/* <a className={LoginStyle.underlineHover} href="#">Forgot Password?</a> */}
				</div>
			</div>
		</div>
	</>)
}