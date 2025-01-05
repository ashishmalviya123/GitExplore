import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions, ToastAndroid } from 'react-native'
import React from 'react'
import Heading from '../Component/Heading'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../../Redux/Action/FavoriteAction';
import { color } from '../Component/BaseColour';

const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width

const Detail = ({ navigation, ...props }) => {
    const dispatch = useDispatch()
    const FavoriteRes = useSelector(state => state?.FavoriteReducer?.favorites)
    const isDarkMode = useSelector((state) => state?.DarkModeReducer?.isDarkMode);
    const isFavorite = FavoriteRes.some(item => item.id === props?.route?.params?.item?.id);

    const handleAddFavorite = (item) => {
        dispatch(addFavorite(item));
        ToastAndroid.show('Added to favorites', ToastAndroid.SHORT)
    };

    const handleRemoveFavorite = (itemId) => {
        dispatch(removeFavorite(itemId));
        ToastAndroid.show('Removed from favorites', ToastAndroid.SHORT)
    };

    return (
        <View style={isDarkMode ? styles.mainContainerDark : styles.mainContainerLight}>
            <Heading Title={'Detail'} onPress={() => navigation.goBack()} />
            <ScrollView contentContainerStyle={{ paddingBottom: '6%' }}>
                <View style={isDarkMode ? styles.SecondContainerDark : styles.SecondContainerLight}>
                    <View>
                        <View style={styles.FavoritesContainer}>
                            {isFavorite ?
                                <AntDesign name="heart" size={25} color="red" style={{}} />
                                :
                                <AntDesign name="hearto" size={25} color="#000" style={{}} />
                            }
                        </View>
                        <Image source={{ uri: props?.route?.params?.item?.owner?.avatar_url }} style={styles.image} />
                    </View>
                    <View style={styles.textContainer}>
                        {!isFavorite ?
                            <TouchableOpacity style={styles.FavButtonDark} onPress={() => handleAddFavorite(props?.route?.params?.item)}>
                                <Text style={isDarkMode ? styles.FavTextDark : styles.FavTextLight}>Add to Favorites </Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.FavButtonDark} onPress={() => handleRemoveFavorite(props?.route?.params?.item.id)}>
                                <Text style={isDarkMode ? styles.FavTextDark : styles.FavTextLight}>Remove from Favorites</Text>
                            </TouchableOpacity>
                        }
                        <View style={styles.CardDetail}>
                            <Text style={isDarkMode ? styles.TitleDaRK : styles.TitleLight}>Name</Text>
                            <Text style={styles.colontext}>:</Text>
                            <Text style={styles.text}>{props?.route?.params?.item?.owner?.login}</Text>
                        </View>
                        <View style={styles.CardDetail}>
                            <Text style={isDarkMode ? styles.TitleDaRK : styles.TitleLight}>Repository name</Text>
                            <Text style={styles.colontext}>:</Text>
                            <Text style={styles.text}>{props?.route?.params?.item?.name ? props?.route?.params?.item?.name : '--'}</Text>
                        </View>
                        <View style={styles.CardDetail}>
                            <Text style={isDarkMode ? styles.TitleDaRK : styles.TitleLight}>Number of stars</Text>
                            <Text style={styles.colontext}>:</Text>
                            <Text style={styles.text}>{props?.route?.params?.item?.stargazers_count}</Text>
                        </View>
                        <View style={styles.CardDetail}>
                            <Text style={isDarkMode ? styles.TitleDaRK : styles.TitleLight}>Number of forks</Text>
                            <Text style={styles.colontext}>:</Text>
                            <Text style={styles.text}>{props?.route?.params?.item?.forks_count ? props?.route?.params?.item?.forks_count : '--'}</Text>
                        </View>
                        <View style={styles.CardDetail}>
                            <Text style={isDarkMode ? styles.TitleDaRK : styles.TitleLight}>Primary programming language</Text>
                            <Text style={styles.colontext}>:</Text>
                            <Text style={styles.text}>{props?.route?.params?.item?.language ? props?.route?.params?.item?.language : '--'}</Text>
                        </View>
                        {props?.route?.params?.item?.description ?
                            <View style={styles.Description}>
                                <Text style={isDarkMode ? styles.DiscriptionTextTitleDark : styles.DiscriptionTextTitleLight}>Description</Text>
                                <Text style={styles.DiscriptionText}>{props?.route?.params?.item?.description}</Text>
                            </View> : null}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Detail

const styles = StyleSheet.create({
    mainContainerLight: { flex: 1, backgroundColor: '#fff', },
    mainContainerDark: { flex: 1, backgroundColor: '#000', },
    SecondContainerDark: { width: '95%', alignSelf: 'center', margin: 12, elevation: 12, borderColor: '#fff', borderWidth: 1, backgroundColor: '#000', borderRadius: 12 },
    SecondContainerLight: { width: '95%', alignSelf: 'center', margin: 12, elevation: 12, borderColor: '#fff', borderWidth: 1, backgroundColor: "#fff", borderRadius: 12 },
    image: { width: '100%', height: HEIGHT / 3, resizeMode: 'cover', borderRadius: 12 },
    FavoritesContainer: { position: 'absolute', zIndex: 1, right: 20, top: 20 },
    textContainer: { margin: 12, gap: 25, marginVertical: '6%', },
    CardDetail: { flexDirection: 'row', justifyContent: 'space-around' },
    TitleDaRK: { width: '45%', fontSize: 14, fontWeight: '700', color: "#fff" },
    TitleLight: { width: '45%', fontSize: 14, fontWeight: '700', color: '#000' },
    text: { width: '30%', color: 'grey', fontSize: 14, textAlign: 'right', fontWeight: '800', alignSelf: 'center' },
    colontext: { width: '10%', textAlign: 'center', alignSelf: 'center', color: 'grey' },
    DiscriptionTextTitleDark: { color: '#fff', fontSize: 16, marginTop: 6, fontWeight: '800', textAlign: 'center' },
    DiscriptionTextTitleLight: { color: "#000", fontSize: 16, marginTop: 6, fontWeight: '800', textAlign: 'center' },
    DiscriptionText: { textAlign: 'center', margin: 6, color: 'grey', },
    Description: { borderWidth: 1, borderColor: 'grey', borderRadius: 12, },
    FavButtonDark: { backgroundColor: color.base, padding: 8, borderRadius: 6, borderColor: '#fff' },
    FavTextDark: { textAlign: 'center', color: '#fff', fontSize: 14, fontWeight: '500' },
    FavTextLight: { textAlign: 'center', color: '#fff', fontSize: 14, fontWeight: '500' },
})
