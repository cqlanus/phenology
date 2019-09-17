import React from 'react'
import { Route } from 'react-router-dom'

import Dashboard from '../containers/Dashboard'
import CreateGarden from '../containers/CreateGarden'

const UserHome = ({ match }: any) => {
console.log({match})
    return (
        <div>
            <Route exact path={`${match.path}/`} component={Dashboard} />
        </div>
    )
}

export default UserHome