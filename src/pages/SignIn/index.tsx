import React, { useEffect, useState } from 'react'

import firebase from 'firebase/app'

import Loader from 'react-loader-spinner'

import { useAuthState } from 'react-firebase-hooks/auth'

import {
  Container,
  ButtonsContainer,
  GoogleButton,
  GoogleIcon,
  FacebookButton,
  FacebookIcon,
  GithubButton,
  GithubIcon
} from './styles'


interface Props {
  auth: firebase.auth.Auth,
}

const SignIn: React.FC<Props> = ({ auth }) => {
  const [loading, setLoading] = useState(true)
  const [user] = useAuthState(auth)
  console.log(user)

  function handleSignInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()

    auth.signInWithPopup(provider)
  }

  function handleSignInWithFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider()

    auth.signInWithPopup(provider)
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 5000)
  }, [])

  return (
    <Container>
      <GithubButton href="https://github.com/joaorodrs/reactchat" target="_blank">
        <GithubIcon />
      </GithubButton>

      {loading ? (
        <Loader
          type="ThreeDots"
          color="#803790"
          height={80}
          width={80}
        />
      ) : (
          <>
            <h1>Reactchat</h1>
            <ButtonsContainer>
              <GoogleButton onClick={handleSignInWithGoogle}>
                <p>Entrar com</p>
                <GoogleIcon />
              </GoogleButton>
              <FacebookButton onClick={handleSignInWithFacebook}>
                <p>Entrar com</p>
                <FacebookIcon />
              </FacebookButton>
            </ButtonsContainer>
          </>
        )}
    </Container>
  )
}

export default SignIn
