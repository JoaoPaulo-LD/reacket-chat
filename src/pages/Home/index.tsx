import React, { useEffect, useState } from 'react'

import Chat from '../../components/Chat'

import firebase from 'firebase/app'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import reactChatLogo from '../../assets/reactchat-logo.png'

import {
  Container,
  AvatarImage,
  ChatContainer,
  ChatName,
  ChatLastMessage,
  BackIcon,
  LogoutIcon,
  GithubIcon
} from './styles'

interface Props {
  auth: firebase.auth.Auth,
  firestore: firebase.firestore.Firestore
}

interface Message {
  text: string,
  sender: string,
  senderPhoto: string,
}

const windowWidth = window.innerWidth

const Home: React.FC<Props> = ({ firestore, auth }) => {
  const messagesRef = firestore.collection('messages')
  const query = messagesRef.orderBy('createdAt')

  const [messages] = useCollectionData<Message>(query, { idField: 'id' })

  const [showSelectedChat, setShowSelectedChat] = useState(false)

  const [userPhotoUrl, setUserPhotoUrl] = useState('')

  const handleOpenChat = () => {
    setShowSelectedChat(true)
  }

  function logOut() {
    auth.signOut()
  }

  useEffect(() => {
    setUserPhotoUrl(String(auth.currentUser?.photoURL))
  }, [auth.currentUser?.photoURL])

  return (
    <Container>
      <header style={{ justifyContent: showSelectedChat ? windowWidth < 800 ? 'flex-start' : 'space-between' : 'space-between' }}>
        {windowWidth < 800 ? (
          <>
            {!showSelectedChat ? (
              <>
                <img src={reactChatLogo} alt="ReactChat" />
                <AvatarImage src={userPhotoUrl} />
                <div className="logout-wrapper" onClick={logOut}>
                  <LogoutIcon />
                </div>
              </>
            ) : (
                <>
                  <BackIcon onClick={() => setShowSelectedChat(false)} />
                  <div className="general-chatting-profile" />
                  <h1>General Chatting</h1>
                </>
              )}
          </>
        ) : (
            <>
              <img src={reactChatLogo} alt="ReactChat" />
              <AvatarImage src={userPhotoUrl} />
              <div className="logout-wrapper" onClick={logOut}>
                <LogoutIcon />
              </div>
            </>
          )}
      </header>

      <main>
        {windowWidth > 800 || !showSelectedChat ? (
          <div className="chats-wrapper">
            <ChatContainer onClick={handleOpenChat}>
              <div className="chat-informations-wrapper">
                <ChatName>General Chatting</ChatName>
                <ChatLastMessage>{messages && messages[messages.length - 1]?.text}</ChatLastMessage>
              </div>

            </ChatContainer>

            <a
              className="github"
              href="https://github.com/joaorodrs/reactchat"
              rel="noreferrer"
              target="_blank"
            >
              <GithubIcon />
            </a>
          </div>
        ) : null}

        <div className="selected-chat-wrapper">
          {showSelectedChat && (
            <Chat messages={messages} auth={auth} messagesRef={messagesRef} />
          )}
        </div>
      </main>
    </Container>
  )
}

export default Home
