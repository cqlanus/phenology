import React from 'react'
import { Route } from 'react-router-dom'

import Dashboard from '../containers/Dashboard'
import CreateGarden from '../containers/CreateGarden'

const UserHome = ({ match }: any) => {

    return (
        <div>
            <Route exact path={`${match.path}/`} component={Dashboard} />
            <Route path={`${match.path}/create`} component={CreateGarden} />
        </div>
    )
}

export default UserHome