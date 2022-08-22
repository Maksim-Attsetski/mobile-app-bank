import React, { FC } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, View } from 'react-native';


const Loader:FC = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ActivityIndicator size={'large'}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        transform: [{scale: 4}]
    }
})

export default Loader;