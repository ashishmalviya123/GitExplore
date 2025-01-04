import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions, Button } from 'react-native'
import React from 'react'
import Heading from '../Component/Heading'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../../Redux/Action/FavoriteAction';

const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width

const Detail = ({ navigation, ...props }) => {
    const dispatch = useDispatch()
    const FavoriteRes = useSelector(state => state?.FavoriteReducer?.favorites)
    const isDarkMode = useSelector((state) => state?.DarkModeReducer?.isDarkMode);
    const isFavorite = FavoriteRes.some(item => item.id === props?.route?.params?.item?.id);

    const handleAddFavorite = (item) => {
        dispatch(addFavorite(item));
    };

    const handleRemoveFavorite = (itemId) => {
        dispatch(removeFavorite(itemId));
    };
    
    const styles = StyleSheet.create({
        mainContainer: { flex: 1, backgroundColor: isDarkMode ? "#000" : '#fff', },
        SecondContainer: { width: '95%', alignSelf: 'center', margin: 12, elevation: 12, borderColor: '#fff', borderWidth: 1, backgroundColor: isDarkMode ? "#000" : '#fff', borderRadius: 12 },
        image: { width: '100%', height: HEIGHT / 3, resizeMode: 'cover', borderRadius: 12 },
        FavoritesContainer: { position: 'absolute', zIndex: 1, right: 20, top: 20 },
        textContainer: { margin: 12, gap: 25, marginVertical: '6%', },
        CardDetail: { flexDirection: 'row', justifyContent: 'space-around' },
        Titletext: { width: '45%', fontSize: 14, fontWeight: '700', color: isDarkMode ? '#fff' : "#000" },
        text: { width: '30%', color: 'grey', fontSize: 14, textAlign: 'right', fontWeight: '800', alignSelf: 'center' },
        colontext: { width: '10%', textAlign: 'center', alignSelf: 'center', color: isDarkMode ? '#fff' : "#000" },
        DiscriptionTextTitle: { color: isDarkMode ? '#fff' : "#000", fontSize: 16, marginTop: 6, fontWeight: '800', textAlign: 'center' },
        DiscriptionText: { textAlign: 'center', margin: 6, color: 'grey', },
        FavoriteIcon: { alignSelf: 'center', alignItems: 'center', justifyContent: 'center', alignContent: 'center' },
        Description: { borderWidth: 1, borderColor: 'grey', borderRadius: 12, },
    })

    return (
        <View style={styles.mainContainer}>
            <Heading Title={'Detail'} onPress={() => navigation.goBack()} />
            <ScrollView>
                <View style={styles.SecondContainer}>
                    <View>
                        <View style={styles.FavoritesContainer}>
                            {isFavorite ? <TouchableOpacity style={styles.FavoriteIcon} onPress={() => handleAddFavorite(props?.route?.params?.item)}>
                                <AntDesign name="heart" size={25} color="red" style={{}} />
                            </TouchableOpacity> :
                                <TouchableOpacity style={styles.FavoriteIcon} onPress={() => handleRemoveFavorite(props?.route?.params?.item?.id)}>
                                    <AntDesign name="hearto" size={25} color="#000" style={{}} />
                                </TouchableOpacity>}
                        </View>
                        <Image source={{ uri: props?.route?.params?.item?.owner?.avatar_url }} style={styles.image} />
                    </View>
                    <View style={styles.textContainer}>
                        {!isFavorite ?
                            <Button
                                title="Add to Favorites" onPress={() => handleAddFavorite(props?.route?.params?.item)}
                            /> :
                            <Button
                                title="Remove from Favorites" onPress={() => handleRemoveFavorite(props?.route?.params?.item.id)}
                            />}
                        <View style={styles.CardDetail}>
                            <Text style={styles.Titletext}>Name</Text>
                            <Text style={styles.colontext}>:</Text>
                            <Text style={styles.text}>{props?.route?.params?.item?.owner?.login}</Text>
                        </View>
                        <View style={styles.CardDetail}>
                            <Text style={styles.Titletext}>Repository name</Text>
                            <Text style={styles.colontext}>:</Text>
                            <Text style={styles.text}>{props?.route?.params?.item?.name ? props?.route?.params?.item?.name : '--'}</Text>
                        </View>
                        <View style={styles.CardDetail}>
                            <Text style={styles.Titletext}>Number of stars</Text>
                            <Text style={styles.colontext}>:</Text>
                            <Text style={styles.text}>{props?.route?.params?.item?.stargazers_count}</Text>
                        </View>
                        <View style={styles.CardDetail}>
                            <Text style={styles.Titletext}>Number of forks</Text>
                            <Text style={styles.colontext}>:</Text>
                            <Text style={styles.text}>{props?.route?.params?.item?.forks_count ? props?.route?.params?.item?.forks_count : '--'}</Text>
                        </View>
                        <View style={styles.CardDetail}>
                            <Text style={styles.Titletext}>Primary programming language</Text>
                            <Text style={styles.colontext}>:</Text>
                            <Text style={styles.text}>{props?.route?.params?.item?.language ? props?.route?.params?.item?.language : '--'}</Text>
                        </View>
                        {props?.route?.params?.item?.description ?
                            <View style={styles.Description}>
                                <Text style={styles.DiscriptionTextTitle}>Description</Text>
                                <Text style={styles.DiscriptionText}>{props?.route?.params?.item?.description}</Text>
                            </View> : null}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Detail
