import React from 'react'
import { Responsive } from 'semantic-ui-react'

import { Entry, Planting } from '../types/user'
import { PhenophaseEntity } from '../redux/entities'
import EntryListAccordion from './EntryListAccordion'
import EntryListModal from './EntryListModal'
import { BREAKPOINTS } from '../data/breakpoints'

interface Props {
    entries: Entry[]
    phenophases: PhenophaseEntity
    setEntry: (entryId?: string) => void
    setPlanting: (plantingId?: string) => void
    planting: Planting
}

const EntryList = (props: Props) => {
    return (
        <div>
            <Responsive minWidth={BREAKPOINTS.TABLET} >
                <EntryListModal {...props} />
            </Responsive>
            <Responsive maxWidth={BREAKPOINTS.TABLET}>
                <EntryListAccordion {...props} />
            </Responsive>
        </div>
    )
    
}

export default EntryList
