import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const InnerContainer = styled.div`
    flex-basis: 75%;

    @media (max-width: 700px) {
        flex-basis: 90%;
    }
`

interface Props {
    user?: any
}

const Dashboard = ({ user }: Props) => {
    if (!user) { return <div/>}

    console.log({user})

    const renderGardens = () => {
        const { gardens } = user
        const hasGardens = gardens.length > 0

        if (hasGardens) {
            return (
                <div>
                    {
                        gardens.map((g: any) => {
                            return (
                                <div key={g.gardenId}>{g.name}</div>
                            )
                        })
                    }
                </div>
            )
        } else {
            return (
                <div>No gardens</div>
            )
        }
        
    }
    
    return (
        <Container>
            <InnerContainer>
                <h2>Welcome {user.firstName}</h2>
                {renderGardens()}
            </InnerContainer>
        </Container>
    )
}

export default Dashboard