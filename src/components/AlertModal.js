import React from 'react'
import { Button, Row, Text } from 'react-native'
import { ModalComponent } from './useModalComponent'
import styled from 'styled-components/native'
import Modal from 'react-native-modal'

const AlertModal = ({ visible, close, title, subtitle, buttons }) => {

    return (
        <Modal
            isVisible={visible}
            onSwipeComplete={close}
            onBackButtonPress={close}
            onBackdropPress={close}
            swipeDirection={['down', 'up']}
            animationIn="pulse"
            style={{ alignItems: 'center' }}
        >
            <Content>
                <Text size="large" alignCenter color="primary">
                    {title}
                </Text>

                <Text paddings={[20, 0]} size="medium" alignCenter>
                    {subtitle}
                </Text>

                <Row wrap style={{ width: '100%' }}>
                    {buttons && buttons.map((button, i) => (
                        <Button
                            key={button.label}
                            onPress={() => {
                                close()
                                button.onPress?.()
                            }}
                            style={{ marginTop: i === 0 ? 25 : 10 }}
                        >
                            <Text size="medium" alignCenter>
                                {button.label}
                            </Text>
                        </Button>
                    ))}

                    {!buttons && (
                        <Button onPress={() => close()}>
                            <Text size="medium" alignCenter>
                                Voltar
                            </Text>
                        </Button>
                    )}
                </Row>
            </Content>
        </Modal>
    )
}

export default AlertModal

const Content = styled.View`
  justify-content: center;
  align-items: center;
  padding: 25px;
  border-radius: 15px;
  border: 2px solid ${p => p.theme.colors.primary};
  background-color: ${p => p.theme.colors.background};
  max-width: 320px;
`
