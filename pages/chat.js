import Chats2 from  '../components/Chats2';
import socketIOClient from "socket.io-client";


 function Chat() {
	//  create socket
	const socket = socketIOClient(process.env.WebSocketURL);
	socket.connect();
	
	//  if working then send registered usernaem
	if (typeof window === 'object') {
		var Username = localStorage.getItem('username');
		socket.emit('addUser', Username);
	}
	
	let params = {
		"title": 'Chat page',
		"user": Username,
		"socket": socket
	}
	
  return (
	<Chats2>{params}</Chats2>
  )
}

Chat.getInitialProps = ({ res, err }) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404
	return { statusCode }
  }
  
export default Chat;