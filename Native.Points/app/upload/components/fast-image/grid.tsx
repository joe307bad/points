import React, { Component } from 'react'
import {
    FlatList,
    StyleSheet,
    Text,
    View,
    LayoutChangeEvent,
} from 'react-native'
import FastImage from 'react-native-fast-image'

const getImageUrl = (id: string, width: number, height: number) =>
    `https://unsplash.it/${width}/${height}?image=${id}`

type Upload = { id: string, photo: string, caption: string };
interface ImageGridProps {
    images: Upload[]
}

interface ImageGridState {
    images: any[]
    itemHeight: number
    error?: any
}

class ImageGrid extends Component<ImageGridProps, ImageGridState> {
    constructor(props: ImageGridProps) {
        super(props)
        // fetch('https://unsplash.it/list')
        //     .then(res => res.json())
        //     .then(this._onFetchImagesSuccess)
        //     .catch(this._onFetchImagesError)
    }

    state: {
        images: any[]
        itemHeight: number
        error?: any
    } = {
            images: [],
            itemHeight: 0,
        }

    _onLayout = (e: LayoutChangeEvent) => {
        const width = e.nativeEvent.layout.width
        this.setState({
            itemHeight: width / 4,
        })
    }

    _onFetchImagesError = () => {
        this.setState({
            error: true,
        })
    }

    _onFetchImagesSuccess = (images: any[]) => {
        this.setState({
            images,
        })
    }

    _getItemLayout = (_: any, index: number) => {
        const { itemHeight } = this.state
        return { length: itemHeight, offset: itemHeight * index, index }
    }

    _renderItem = ({ item }: { item: Upload }) => {
        const uri = getImageUrl(item.id, 100, 100)
        return (
            <View style={styles.imageContainer}>
                <FastImage source={{ uri: item.photo }} style={styles.image} />
            </View>
        )
    }

    _extractKey = (item: any) => {
        return item.id
    }

    render() {
        if (this.state.error) {
            return (
                <View style={styles.container}>
                    <Text style={styles.text}>Error fetching images.</Text>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <FlatList
                    onLayout={this._onLayout}
                    style={styles.list}
                    columnWrapperStyle={[
                        styles.columnWrapper,
                        { height: this.state.itemHeight },
                    ]}
                    data={this.props.images}
                    renderItem={this._renderItem}
                    numColumns={4}
                    keyExtractor={this._extractKey}
                    getItemLayout={this._getItemLayout}
                />
            </View>
        )
    }
}

const MARGIN = 2

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    text: {
        textAlign: 'center',
    },
    list: {
        flex: 1,
    },
    columnWrapper: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: -MARGIN,
        marginRight: -MARGIN,
    },
    image: {
        flex: 1,
        width: null as any,
        height: null as any,
        margin: MARGIN,
        backgroundColor: '#eee',
    },
    imageContainer: {
        flex: 1,
        alignItems: 'stretch',
    },
})

export default ImageGrid; // <ImageGrid ImageComponent={FastImage} />