import React, { useCallback, useEffect, useState } from 'react'
import { Center, VStack, Avatar, Heading, Text, HStack, Button, Icon, Link } from 'native-base'
import { useColorModeValue } from 'native-base'
import MastHead from '../components/MastHead'
import Backbar from '../components/Backbar'
import AnimatedColorBox from '../components/AnimatedColorBox'
import { Feather } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import app from '../../firebase'
import 'react-native-get-random-values';
const { v4: uuidv4 } = require('uuid');

// @ts-ignore
const AvatarScreen = ({ navigation }) => {
    const handlePressSkip = useCallback(() => {
        navigation.navigate('Main')
    }, [navigation])

    const [image, setImage] = useState('https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png');
    const [uploading, setUploading] = useState(false);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status === 'granted') {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            })
            handleImagePicked(result);
        };
        if (status !== "granted") {
            alert("Sorry, we need camera roll permissions to make this work!");
        }
    }

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();

        if (status === 'granted') {
            let pickerResult = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            handleImagePicked(pickerResult);
        }
        if (status !== "granted") {
            alert("Sorry, we need camera permissions to make this work!");
        }
    }

    const handleImagePicked = async (pickerResult: any) => {
        try {
            setUploading(true);

            if (!pickerResult.cancelled) {
                const uploadUrl = await uploadImageAsync(pickerResult.uri);
                setImage(uploadUrl);
            }
        } catch (e) {
            console.log(e);
            alert("Upload failed, sorry :(");
        } finally {
            setUploading(false);
        }
    };

    async function uploadImageAsync(uri: string) {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });

        const fileRef = ref(getStorage(app), uuidv4());
        //@ts-ignore
        const result = await uploadBytes(fileRef, blob);

        // We're done with the blob, close and release it
        //@ts-ignore
        blob.close();

        return await getDownloadURL(fileRef);
    }


    return (
        <AnimatedColorBox
            flex={1}
            bg={useColorModeValue('warmGray.50', 'primary.900')}
            w='full'
        >
            <MastHead
                image={require('../assets/images/welcome.png')}
            />
            <Center
                mt={5}
            >
                <Avatar source={{
                    uri: image
                }} size={'xl'}
                    borderRadius={100}
                    mb={6}
                    borderColor='secondary.500'
                    borderWidth={3}
                />
                <Heading mb={4} size='md'>
                    Customize your profile picture
                </Heading>
                <Heading size={'sm'}>Either by</Heading>
                <HStack
                    px={7}
                    mt={3}
                >
                    <Button
                        rounded={'3xl'}
                        color={useColorModeValue('blue.500', 'blue.400')}
                        py={3}
                        mt={4}
                        mx={1}
                        onPress={takePhoto}
                        flexDirection='row'
                        flex={1}
                        leftIcon={<Icon
                            as={<Feather name={'camera'} />}
                            size={5}
                            color='white'
                        />}
                    >
                        Take a picture
                    </Button>
                    <Button
                        rounded={'3xl'}
                        color={useColorModeValue('blue.500', 'blue.400')}
                        py={3}
                        mt={4}
                        mx={1}
                        onPress={pickImage}
                        flexDirection='row'
                        flex={1}
                        leftIcon={<Icon
                            as={<Feather name={'image'} />}
                            size={5}
                            color='white'
                        />}
                    >
                        Browse gallery
                    </Button>
                </HStack>
                <Link
                    onPress={handlePressSkip}
                    isUnderlined={false}
                    _text={{
                        fontSize: 'md',
                        _light: {
                            color: "blue.500"
                        },
                        color: "blue.400",
                        justifyContent: 'center'
                    }}
                    _hover={{
                        _text: {
                            _light: {
                                color: "blue.400"
                            },
                            color: "blue.500"
                        }
                    }}
                    mt={10}
                >
                    Proceed to main screen
                </Link>
            </Center>
        </AnimatedColorBox>
    )
}

export default AvatarScreen