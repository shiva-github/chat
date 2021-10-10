import Login from  '../components/Login';


 function Home() {

	
  return (
	  <>
	  <Login>Login page</Login>
	  </>
  )
}
Home.getInitialProps = ({ res, err }) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404
	return { statusCode }
  }
  
  export default Home;