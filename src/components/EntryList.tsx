import React, {useState} from 'react'
import { Entry } from '../types/user'
import { Card, Icon, Feed, Accordion } from 'semantic-ui-react'
import { format } from 'date-fns'



interface Props {
    entries: Entry[]
}


const PHENOPHASE_MAP: { [key: string]: string } = {
    INITIAL_GROWTH: 'Initial Growth',
}

const renderEntry = (entry: Entry) => (
    <Feed.Event key={entry.entryId}>
        <Feed.Label >
            <Icon name={'circle'} />
        </Feed.Label>
        <Feed.Content 
            date={format(entry.created, 'ddd, MMM do')}
            summary={PHENOPHASE_MAP[entry.phenophase]}
            extraText={`Notes: ${entry.note}`} />
    </Feed.Event>
)

const renderEntries = (entries: Entry[]) => {
    if (entries.length > 0) {
        return (
            <Card.Content>
                <Feed>
                    {entries.map(renderEntry)}
                </Feed>
            </Card.Content>
        )
    }
}

const EntryList = ({entries}: Props) => {
    const [ isOpen, setOpen ] = useState(false)
    
    const toggleOpen = () => setOpen(!isOpen)

    const title = isOpen ? 'Hide Entries' : 'See Entries'
    return (
    <Accordion>
        <Accordion.Title active={isOpen} onClick={toggleOpen} >{title}</Accordion.Title>
        <Accordion.Content active={isOpen}>
            {renderEntries(entries)}
        </Accordion.Content>
    </Accordion>
)}

export default EntryList