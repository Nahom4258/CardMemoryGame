import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { Button } from 'react-native-paper';

const SuccessModal = ({ navigation, rounds }) => {
    const [modalVisible, setModalVisible] = useState(true);

    return (
        // <View style={styles.centeredView}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>You did it in {rounds} tries.</Text>
                    {/* <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => navigation.navigate('Home')}>
                        <Text style={styles.textStyle}>Go back home</Text>
                    </Pressable> */}
                    <Button onPress={() => navigation.navigate('Home')} mode='contained' icon='home'>Go to Home</Button>
                </View>
            </View>
        </Modal>
        // </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 20,
        color: 'black'
    },
});

export default SuccessModal;