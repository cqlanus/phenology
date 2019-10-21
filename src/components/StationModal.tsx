import React from 'react'
import { Modal } from 'semantic-ui-react'
import StationsList from '../containers/StationsList'

interface Props {
    isOpen: boolean
    openModal: () => void
    closeModal: () => void
}
const StationModal = ({ isOpen, closeModal}: Props) => {
    
    return (
        <Modal size="mini" open={isOpen} onClose={closeModal} >
            <Modal.Header>
                Please choose a station
            </Modal.Header>
            <Modal.Content scrolling>
                <StationsList />
            </Modal.Content>
            
        </Modal>
    )
}

export default StationModal