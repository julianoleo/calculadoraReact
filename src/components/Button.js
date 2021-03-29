import React from 'react';
import { Text, StyleSheet, Dimensions, TouchableHighlight, Vibration } from 'react-native';

export default props => {

    const stylesButton = [styles.button];
    if (props.double) stylesButton.push(styles.buttonDouble);
    if (props.triple) stylesButton.push(styles.buttonTriple);
    if (props.operation) stylesButton.push(styles.operationButton);
    if (props.result) stylesButton.push(styles.resultButton);

    return (
        <TouchableHighlight onPress={() => props.onClick(props.label)} >
            <Text style={stylesButton}>{props.label}</Text>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    button: {
        fontSize: 40,
        height: Dimensions.get('window').width / 4,
        width: Dimensions.get('window').width / 4,
        padding: 20,
        backgroundColor: '#f0f0f0',
        textAlign: 'center',
        borderWidth: 0.5,
        borderColor: '#888'
    },
    operationButton: {
        color: '#fff',
        backgroundColor: 'orange'
    },
    buttonDouble: {
        width: (Dimensions.get('window').width / 4) * 2,
    },
    buttonTriple: {
        width: (Dimensions.get('window').width / 4) * 3,
    },
    resultButton: {
        color: '#fff',
        backgroundColor: '#3CB371'
    }
})
