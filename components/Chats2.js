import HeaderComp from  './Header';
import md5Hash from 'md5';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';


const myLoader = ({ src, width, quality }) => {
	return `/images/${src}?w=${width || 75}&q=${quality || 75}`
}

const ConditionalWrapper = ({ children, condition1, condition2 }) => {
    return condition1 ? (
		<div className="d-flex justify-content-end chatmsgdiv" id={"chat" + children.key}>
			<div className="msg_cotainer_send">
				<div className="user_name">{children.currentUser} (Me)</div>
				<div className='user_msg_div'>
					{children.msg}
				</div>
				<div className="msg_time_send">{children.time}</div>
			</div>
			<div className="img_cont_msg">
				<Image loader={myLoader} width={70} height={70} src="user.png" alt="userImage" className="rounded-circle user_img_msg"/>
			</div>
		</div>
		
    ) : condition2 ? (
        
		<div className="d-flex justify-content-start chatmsgdiv" id={"chat" + children.key}>
			<div className="img_cont_msg">
				<Image loader={myLoader} width={70} height={70} src="user.png" alt="userImage" className="rounded-circle user_img_msg"/>
			</div>
			<div className="msg_cotainer">
				<div className="user_name">{children.currentUser}</div>
				<div className='user_msg_div'>
					{children.msg}
				</div>
				<div className="msg_time_send">{children.time}</div>

			</div>
		</div>
	
	) : (<></>);
}


const UserListWrapper = ({ children, condition }) => {
    return condition ? (
		<>
		{children}
		</>
    ) : (
	
		<li className="active nouser"  key="nouserkey" id="nouserkeyid">
			<div className="d-flex bd-highlight">
				
				<div className="user_info w-100 text-center">
					<span>NO USERS</span>
					
				</div>
			</div>
		</li> 
	
    )
}

const SelectedUserWrapper = ({ children, condition }) => {
    return condition ? (
		<>
		{children}
		</>
    ) : (
		<div className="d-flex bd-highlight">
			<div className="img_cont">

				<Image loader={myLoader} width={70} height={70} src='user.png' alt="Picture of the USER" className="rounded-circle user_img" />
				<span className="online_icon"></span>
			</div>
			<div className="user_info">
				<span>NO USER</span>
				<p>[UNKNOWN]</p>
			</div>
			<div className="video_cam">
				<span><i className="fas fa-video"></i></span>
				<span><i className="fas fa-phone"></i></span>
			</div>
		</div>
    )
}

export default function Chats2({ children }) {
	const Username = children['user'];
	const socketIO = children['socket'];
	

	// UserListing...
	const [UserListing, setUserListing] = useState([]);
	const [CompleteChat, setCompleteChat] = useState([]);
	const [SelectedUser, setSelectedUser] = useState({});
	const [ShowMenu, setshowMenu] = useState(false);
	
	
	
	socketIO.on('UserAnnouncements', function(onlineUsers) {
		setUserListing(onlineUsers);
	});
	
	socketIO.on('get message', function(message) {
		setCompleteChat([...CompleteChat, message]);
		if (typeof window === 'object') {

			// Smooth Scroll
			document.getElementById('chat_body').scroll({
				top: document.getElementById('chat_body').scrollHeight,
				left: 0,
				behavior: 'smooth'
			});
		} 
	});

	var onUserSelect = function(key) {
		let selectedUser = UserListing.filter((x) => {
			x.selected = 0;
			return x.key == key;
		});
		selectedUser[0].selected = 1;
		setSelectedUser(selectedUser[0]);
	}
	
	var logout = function() {
		localStorage.removeItem('username');
		Router.replace('/');
	}
	var menu = function() {
		setshowMenu(!ShowMenu);
	}
	var SendMessage = function() {
		
		var msg = document.getElementById('message_input');

		if (msg.value.trim() != '' && typeof SelectedUser.username == 'undefined') {
			return false;
		}
		let msgObj = {
			"currentUser": Username, // Sender 
			"msg": msg.value,
			"selectedUser": SelectedUser.username, // Receiver 
			"date": moment().format('DD MMM, YY'),
			"time": moment().format('HH:MM A'),
			"status": 'unseen',
			"key": md5Hash(Math.random().toString(36).substr(2, 5) + moment().format('DDmmYYYYhhmmss'))
		}

		socketIO.emit('chat message', msgObj);
		msg.value = '';
	}
	if (Username == null) {
		// Unauthorised access
		return (
			<>
			<HeaderComp>{children['title']}</HeaderComp>
			<div className="container">
				<Link href="/" id="redirect" onLoad={logout}>
					<a className="loginLink">Login</a>
				</Link>
			</div>
			</>
		);
	}
	return (
	<>	
		<HeaderComp>{children['title']}</HeaderComp>
		
		<div className="container">
			<div className="row justify-content-center h-100">
				
				<div className="col-md-4 col-xl-3 chat">
					<div className="card mb-sm-3 mb-md-0 contacts_card">
						<div className="card-header">
						<span>Username: {Username}</span>
							<div className="input-group">
							
								<input type="text" placeholder="Search..." name="" className="form-control search" id="searchUser" maxLength="50" />
								<div className="input-group-prepend">
									<span className="input-group-text search_btn"><i className="fas fa-search"></i></span>
								</div>
							</div>
						</div>
						<div className="card-body contacts_body">
							<ul className="contacts" id="activeUsers">
								<UserListWrapper condition={UserListing.length != 0}>
									{UserListing.map(post => {
									
										return (
											<li className={post.selected ? 'active': ''}  key={ post.key } id={post.key} onClick={(e)=> {onUserSelect(post.key)}}>
												<div className="d-flex bd-highlight">
													<div className="img_cont">
														<Image loader={myLoader} width={70} height={70} src="user.png" alt="userImage" className="rounded-circle user_img" />
														<span className={"online_icon " + (post.user_status == 'online' ? "" : 'offline')}></span>
													</div>
													<div className="user_info">
														<span>{post.username}</span>
														<p>{post.user_status}</p>
													</div>
												</div>
											</li> 
										)
									})}
								</UserListWrapper>
							
							</ul>
						</div>
						<div className="card-footer">
						
						</div>
					</div>
				</div>
					
				<div className="col-md-8 col-xl-6 chat">
					<div className="card">
						<div className="card-header msg_head">
							
							<SelectedUserWrapper condition={typeof SelectedUser.username != 'undefined'}>
								<div className="d-flex bd-highlight">
									<div className="img_cont">
										<Image loader={myLoader} width={70} height={70} src='user.png' alt="Picture of the author" className="rounded-circle user_img" />
										<span className={"online_icon " + (SelectedUser.user_status == 'online' ? "" : 'offline')}></span>
										
									</div>
									<div className="user_info">
										<span>{SelectedUser.username}</span>
										<p>{SelectedUser.user_status}</p>
									</div>
									<div className="video_cam">
										<span><i className="fas fa-video"></i></span>
										<span><i className="fas fa-phone"></i></span>
									</div>
								</div>
							</SelectedUserWrapper>
								
							<span id="action_menu_btn" onClick={() => { menu(); }}><i className="fas fa-ellipsis-v"></i></span>
							<div className={"action_menu" + (ShowMenu ? " active" : "")}>
								<ul>
									{/* future scope */}
									{/* <li><i className="fas fa-user-circle"></i> View profile</li>
									<li><i className="fas fa-users"></i> Add to close friends</li>
									<li><i className="fas fa-plus"></i> Add to group</li>
									<li><i className="fas fa-ban"></i> Block</li> */}
									<li onClick={logout}><i className="fas fa-ban"></i> Logout</li>
								</ul>
							</div>
						</div>
						<div className="card-body msg_card_body" id="chat_body">
							{CompleteChat.map(post => {
									return (
										<>
											<ConditionalWrapper condition1={post.currentUser == Username && post.selectedUser == SelectedUser.username} condition2={post.currentUser == SelectedUser.username && post.selectedUser == Username}>
												{post}
											</ConditionalWrapper>	
										</>
									)
								})}
							{/* Sender */}
							{/* <div className="d-flex justify-content-end mb-4">
								<div className="msg_cotainer_send">
									[Message]
									<span className="msg_time_send">[Time]</span>
								</div>
								<div className="img_cont_msg">
									<Image src="/images/user.png" className="rounded-circle user_img_msg"/>
								</div>
							</div> */}
							{/* Receiver */}
							{/* <div className="d-flex justify-content-start mb-4">
								<div className="img_cont_msg">
									<Image src="/images/user.png" className="rounded-circle user_img_msg"/>
								</div>
								<div className="msg_cotainer">
									<div>[Message]</div>
									<div className="msg_time">[Time]</div>
								</div>
							</div> */}
						</div>
						
						<div className="card-footer">
							<div className="input-group">
								<div className="input-group-append">
									<span className="input-group-text attach_btn"><i className="fas fa-paperclip"></i></span>
								</div>
								<textarea name="" className="form-control type_msg" id="message_input" placeholder="Type your message..." maxLength="255" onKeyPress={(e)=> {if(e.which == 13) { e.preventDefault(); SendMessage(); }}}></textarea>
								<div className="input-group-append" id="send_message" onClick={SendMessage} >
									<span className="input-group-text send_btn"><i className="fas fa-location-arrow"></i></span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</>)
}