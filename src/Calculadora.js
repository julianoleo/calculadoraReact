import { StatusBar } from 'expo-status-bar';
import React, { Component, state } from 'react';
import { StyleSheet, Text, View, Vibration } from 'react-native';
import DisplayCalculadora from './components/Display'
import Button from './components/Button'

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class App extends Component {

    state = { ...initialState }

    vibra = tempo => {
        const ONE_SECOND_IN_MS = 35;
        const PATTERN = [1 * ONE_SECOND_IN_MS, 2 * ONE_SECOND_IN_MS, 3 * ONE_SECOND_IN_MS];

        if (+tempo === 1) {
            Vibration.vibrate(PATTERN[0]);
        }
        if (+tempo === 2) {
            Vibration.vibrate(PATTERN[1]);
        }
        if (+tempo === 3) {
            Vibration.vibrate(PATTERN[2]);
        }

    }


    addDigit = n => {
        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay;

        if (n === '.' && !clearDisplay && this.state.displayValue.includes('.')) {
            return ('')
        }

        const currentValue = clearDisplay ? '' : this.state.displayValue;
        const displayValue = currentValue + n;

        this.setState({
            displayValue, clearDisplay: false
        });

        if (n !== '.') {
            const newValue = parseFloat(displayValue);
            const values = [...this.state.values];
            values[this.state.current] = newValue;
            this.setState({
                values
            });
        }
        this.vibra('1');
    }

    clearMemory = () => {
        this.setState({ ...initialState })
        this.vibra('3');
    }

    setOperation = operation => {
        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true })
        } else {
            const equals = operation === '=';
            const values = [...this.state.values]
            try {
                values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`)
            } catch (e) {
                values[0] = this.state.values[0]
            }
            values[1] = 0;
            this.setState({
                displayValue: `${values[0]}`,
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values,
            })
        }
        this.vibra('2');
    }

    render() {
        return (
            <View style={styles.container}>
                <DisplayCalculadora value={this.state.displayValue} />
                <View style={styles.buttons}>
                    <Button label='AC' triple onClick={this.clearMemory} ></Button>
                    <Button label='/' operation onClick={this.setOperation} ></Button>
                    <Button label='7' onClick={this.addDigit} ></Button>
                    <Button label='8' onClick={this.addDigit} ></Button>
                    <Button label='9' onClick={this.addDigit} ></Button>
                    <Button label='*' operation onClick={this.setOperation} ></Button>
                    <Button label='4' onClick={this.addDigit} ></Button>
                    <Button label='5' onClick={this.addDigit} ></Button>
                    <Button label='6' onClick={this.addDigit} ></Button>
                    <Button label='-' operation onClick={this.setOperation} ></Button>
                    <Button label='1' onClick={this.addDigit} ></Button>
                    <Button label='2' onClick={this.addDigit} ></Button>
                    <Button label='3' onClick={this.addDigit} ></Button>
                    <Button label='+' operation onClick={this.setOperation} ></Button>
                    <Button label='0' double onClick={this.addDigit} ></Button>
                    <Button label='.' onClick={this.addDigit} ></Button>
                    <Button label='=' result onClick={this.setOperation} ></Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    buttons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    }
});