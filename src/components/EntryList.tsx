import React, {useState} from 'react'
import { Entry } from '../types/user'
import { Card, Icon, Feed, Accordion } from 'semantic-ui-react'
import { format } from 'date-fns'
import { PhenophaseEntity } from '../redux/entities'



interface Props {
    entries: Entry[],
    phenophases: PhenophaseEntity
}


const PHENOPHASE_MAP: { [key: string]: string } = {
    INITIAL_GROWTH: 'Initial Growth',
}

const renderEntry = (phenophases: PhenophaseEntity) => (entry: Entry) => {
    const phenophase = phenophases[entry.phenophase]
    return (
        <Feed.Event key={entry.entryId}>
            <Feed.Label >
                <Icon name={'circle'} />
            </Feed.Label>
            <Feed.Content 
                date={format(entry.created, 'ddd, MMM do')}
                summary={phenophase && phenophase.text}
                extraText={`Notes: ${entry.note}`} />
        </Feed.Event>
    )
}

const renderEntries = (entries: Entry[], phenophases: PhenophaseEntity) => {
    if (entries.length > 0) {
        return (
            <Card.Content>
                <Feed>
                    {entries.map(renderEntry(phenophases))}
                </Feed>
            </Card.Content>
        )
    }
}

const EntryList = ({entries, phenophases}: Props) => {
    const [ isOpen, setOpen ] = useState(false)
    
    const toggleOpen = () => setOpen(!isOpen)

    const title = isOpen ? 'Hide Entries' : 'See Entries'
    return (
    <Accordion>
        <Accordion.Title active={isOpen} onClick={toggleOpen} >{title}</Accordion.Title>
        <Accordion.Content active={isOpen}>
            {renderEntries(entries, phenophases)}
        </Accordion.Content>
    </Accordion>
)}

export default EntryList