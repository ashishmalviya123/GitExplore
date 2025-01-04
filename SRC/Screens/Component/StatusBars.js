import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { color } from './BaseColour'

const StatusBars = () => {
    return (
        <StatusBar
            barStyle="default"
            animated={true}
            backgroundColor={color.base}
        />
    )
}

export default StatusBars

const styles = StyleSheet.create({})