import React from 'react'
import styled from 'styled-components'
import { Link, withRouter } from 'react-router-dom'

export default styled(Link)`
    color: indianred;
    font-size: 1.2em;
    text-decoration: none;
    margin-right: 1em;

    :last-child {
        margin-right: 0;
    }

    :hover {
        color: darkred;
    }
    :visited {
        color: indianred;
    }
`

export const ActionLink = styled.span`
    color: indianred;
    /* font-size: 1.2em; */
    text-decoration: none;
    margin-right: 1em;
    cursor: pointer;

    :last-child {
        margin-right: 0;
    }

    :hover {
        color: darkred;
    }
`

export const PopLink = withRouter(({ history, text = '<< Back' }: any) => (
    <ActionLink onClick={() => history.goBack()}>{text}</ActionLink>
))
