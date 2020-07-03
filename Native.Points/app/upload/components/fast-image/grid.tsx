import React, { Component } from 'react'
import {
    FlatList,
    StyleSheet,
    Text,
    View,
    LayoutChangeEvent,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import FastImage from 'react-native-fast-image'

const getImageUrl = (id: string, width: number, height: number) =>
    `https://unsplash.it/${width}/${height}?image=${id}`

type Upload = { id: string, photo: string, caption: string };
interface ImageGridProps {
    images: Upload[]
    openPicture: (uri: string) => void
}

interface ImageGridState {
    images: any[]
    itemHeight: number
    error?: any,
    preview?: string
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
        error?: any,
        preview?: string
    } = {
            images: [],
            itemHeight: 0
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
            <TouchableOpacity style={styles.imageContainer} onPress={() => this.props.openPicture(item.photo)}>
                <FastImage source={{ uri: item.photo }} style={styles.image} />
            </TouchableOpacity>
        )
    }

    _extractKey = (item: any) => {
        return item.id
    }

    render() {
        if (this.state.error) {
            return (
                <TouchableOpacity style={styles.container}>
                    <Text style={styles.text}>Error fetching images.</Text>
                </TouchableOpacity>
            )
        }
        return (
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
                scrollEnabled={false}
            />
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
    previewContainer: {
        position: 'absolute',
        width: '100%',
        height: 100,
        backgroundColor: 'white',
        top: 0
    },
    previewImage: {
        //flex: 1,
        //width: '100%'
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