import React from 'react'
import NavBar from '../components/NavBar'
import { connect } from 'react-redux'
import { signOut } from '../redux/auth'

const mapDispatch = {
    signOut
}

const RoutingNavBar = connect(null, mapDispatch)(NavBar)

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
