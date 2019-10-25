import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { Modal, Button } from 'semantic-ui-react'
import { useModal } from '../hooks/mdoal'

interface Props {
    renderButtons: () => ReactElement
    renderWeatherChecks: () => ReactElement
}

const Container = styled.div`
    position: fixed;
    right: 1em;
    bottom: 2em;
`

const ContentContainer = styled.div`
    padding: 1em 0;
`

const WeatherSettingsModal = ({ renderButtons, renderWeatherChecks }: Props) => {
    const { isOpen, openModal, closeModal } = useModal()

    const renderTrigger = () => {
        return (
            <Container>
                <Button floated="right" circular onClick={openModal} icon="settings" />
            </Container>
        )
    }

    return (
        <Modal open={isOpen} onClose={closeModal} trigger={renderTrigger()} >
            <Modal.Header>Weather Settings</Modal.Header>
            <Modal.Content>
                {renderWeatherChecks()}
                <ContentContainer>
                    {renderButtons()}
                </ContentContainer>
            </Modal.Content>

        </Modal>
    )

}

export default WeatherSettingsModal