import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Menu, Icon, Dropdown } from 'semantic-ui-react'

const StyledLink = styled(Link)`
    color: black;
`

interface Props {
    signOut: () => void
}

const NavBar = ({ history, signOut }: Props & RouteComponentProps) => {
    return (
        <Menu icon borderless>
            <Menu.Item
                name="arrow left"
                onClick={() => {
                    console.log({ here: 1 })
                    history.goBack()
                }}>
                <Icon name="arrow left" />
            </Menu.Item>
            <Menu.Menu>
                <Menu.Item header>phenology</Menu.Item>
            </Menu.Menu>
            <Menu.Menu position="right">
                <Menu.Item name="home">
                    <StyledLink to="/home">
                        <Icon name="home" />
                    </StyledLink>
                </Menu.Item>
                <Dropdown item icon="user">
                    <Dropdown.Menu>
                        <Dropdown.Item>Account</Dropdown.Item>
                        <Dropdown.Item onClick={signOut}>Signout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Menu>
        </Menu>
    )
}

const RoutingNavBar = withRouter(NavBar)

export default RoutingNavBar
