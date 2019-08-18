import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Link from '../components/Link'
import { Button, Loader } from 'semantic-ui-react'
import { Hub } from 'aws-amplify'
import { signIn, signOut, getUser, AuthUser } from '../redux/auth'
import { AppState } from '../redux';

interface Props {
    signIn: () => void
    signOut: () => void
    getUser: () => void
    user?: AuthUser
    loading: boolean
}

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

const AuthRow = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    padding: 1em;
`

const MainPage = ({ signIn, signOut, getUser, user, loading }: Props) => {
    
    useEffect(() => {
        Hub.listen('auth', data => {
            const { payload } = data

            if (payload.event === 'signUp') {
                console.log({data})
            }
            if (payload.event === 'signIn') {
                getUser()
            }
        })
    }, [getUser])

    const renderAuth = () => {
        return user
            ? <Button size="mini" onClick={signOut}>Sign Out</Button>
            : <Button size="mini" onClick={signIn}>
                Sign In
            </Button>
    }
    
    const renderNav = () => {
        if (user) {
            return (
                <Row>
                    <Link to="/home">Dashboard</Link>
                    <Link to="/location">My Location</Link>
                </Row>
            )
        }
    }
    
    return (
        <Container>
            <AuthRow>{renderAuth()}</AuthRow>
            <TextContainer>
                <h2>Phenology</h2>
                {renderNav()}
            </TextContainer>
            <Loader active={loading} />
        </Container>
    )
}

const mapState = (state: AppState) => {
    return {
        loading: state.auth.loading,
        user: state.auth.user
    }
}

const mapDispatch = {
    signIn,
    signOut,
    getUser
}

export default connect(mapState, mapDispatch)(MainPage)
