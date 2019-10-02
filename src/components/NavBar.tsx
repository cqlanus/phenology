import React from 'react'
import { withRouter } from 'react-router'
import { Menu, Icon, Dropdown } from 'semantic-ui-react'

const NavBar = ({ history }: any) => {
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
                    <Icon name="home" />
                </Menu.Item>
                <Dropdown item icon="user">
                    <Dropdown.Menu>
                        <Dropdown.Item>Account</Dropdown.Item>
                        <Dropdown.Item>Signout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Menu>
        </Menu>
    )
}

const RoutingNavBar = withRouter(NavBar)

export default RoutingNavBar

export const withNavBar = <P extends object>(
    Component: React.ComponentType<P>,
) =>
    class WithNavBar extends React.Component<P> {
        render() {
            return (
                <div>
                    <RoutingNavBar />
                    <Component {...(this.props as P)} />
                </div>
            )
        }
    }
