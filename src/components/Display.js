import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

export default props => {
    return (
        <View style={styles.display}>
            <Text style={styles.displayFont} numberOfLines={1} >
                {props.value}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    display: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#1C1C1C',
        alignItems: 'flex-end',
    },
    displayFont: {
        fontSize: 65,
        color: '#fff',
    } 
})