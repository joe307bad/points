import React from 'react'
import { Button, Text, Icon } from "native-base"
import { ReactNativeZoomableView } from '@dudigital/react-native-zoomable-view';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';

type TPictureZoomProps = {
    closePicture: () => void,
    uri: string
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        height: '100%',
        width: '100%',
        bottom: 0,
        backgroundColor: 'white'
    },
    image: {
        flex: 1,
        width: null as any,
        height: null as any,
    },
    close: {
        width: '100%',
        borderRadius: 0
    }
})

export default ({ closePicture, uri }: TPictureZoomProps) => {
    return (
        <View style={styles.container}>
            <Button onPress={closePicture} style={styles.close}>
                <Text>Close Picture</Text>
            </Button>
            <ReactNativeZoomableView
                maxZoom={3}
                minZoom={0.5}
                zoomStep={0.5}
                initialZoom={1}
                bindToBorders={true}
                style={{
                    padding: 10,
                    backgroundColor: 'white'
                }} >
                <FastImage style={styles.image} resizeMode={'contain'} source={{ uri }} />
            </ReactNativeZoomableView>
        </View>
    )
}