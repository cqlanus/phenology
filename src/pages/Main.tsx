import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Link from '../components/Link'
import { Button } from 'semantic-ui-react'
import { Auth, Hub } from 'aws-amplify'

const Container = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
`

const Row = styled.div`
    display: flex;
`

const MainPage = () => {
    const initialUser: any = undefined

    const [user, setUser] = useState(initialUser)

    const getUser = async () => {
        const currentUser = await Auth.currentAuthenticatedUser()
        console.log({currentUser})
    }
    
    useEffect(() => {
        Hub.listen('auth', data => {
            const { payload } = data
            console.log({ data })
            console.log({ payload })
            if (payload.event === 'signIn') {
                const { username } = payload.data
                setUser(username)
                getUser()
                console.log('a user has signed in!')
            }
            if (payload.event === 'signOut') {
                setUser(undefined)
                console.log('a user has signed out!')
            }
        })
    }, [])

    // useEffect(() => {
    //     getUser()
    // }, [])

    console.log({ user })

    const renderStuff = () => {
        if (user) {
            return (
                <div>
                    <Row>
                        <Link to="/home">Dashboard</Link>
                        <Link to="/location">My Location</Link>
                    </Row>
                    <Button onClick={() => Auth.signOut()}>Sign Out</Button>
                </div>
            )
        } else {
            return (
                <Button onClick={() => Auth.federatedSignIn()}>
                    Sign In
                </Button>
            )
        }
    }
    
    return (
        <Container>
            <TextContainer>
                <h2>Phenology</h2>
                { renderStuff() }
            </TextContainer>
        </Container>
    )
}

export default MainPage
