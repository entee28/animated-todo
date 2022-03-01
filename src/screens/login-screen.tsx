import { Heading, Input, useColorModeValue, VStack, Icon, Link, Button, Center, Text, HStack } from 'native-base'
import React, { useCallback } from 'react'
import AnimatedColorBox from '../components/AnimatedColorBox'
import MastHead from '../components/MastHead'
import Navbar from '../components/Navbar'
import { MaterialIcons } from '@expo/vector-icons'
import { DrawerContentComponentProps } from '@react-navigation/drawer'



const LoginScreen = (props: DrawerContentComponentProps) => {
    const [show, setShow] = React.useState(false);

    const { navigation, state } = props;

    const handlePressRegister = useCallback(() => {
        navigation.navigate('Register')
    }, [navigation])

    return (
        <AnimatedColorBox
            flex={1}
            bg={useColorModeValue('warmGray.50', 'primary.900')}
            w='full'
        >
            <MastHead
                image={require('../assets/images/login.png')}
            >
                <Navbar />
            </MastHead>
            <Heading
                color={useColorModeValue('darkText', 'lightText')}
                p={6}
                mt='-50px'
                size={'xl'}
            >
                Log In
            </Heading>
            <VStack
                flex={1}
                space={6}
                borderTopLeftRadius={'20px'}
                borderTopRightRadius={'20px'}
                bg={useColorModeValue('warmGray.50', 'primary.900')}
                px={6}
            >
                <Input
                    size="xl"
                    placeholder="Email address or phone number"
                    fontSize={'md'}
                    py={2} px={4} />
                <Input size="xl"
                    placeholder="Password"
                    fontSize={'md'}
                    type={show ? "text" : "password"}
                    InputRightElement={
                        <Icon
                            as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />}
                            size={5}
                            mr="2"
                            color='muted.400'
                            onPress={() => setShow(!show)}
                        />}
                    py={2} px={4}
                />
                <Link
                    onPress={() => { console.log('Forgot password!') }}
                    isUnderlined={false}
                    _text={{
                        fontSize: 'sm',
                        _light: {
                            color: "blue.500"
                        },
                        color: "blue.400"
                    }}
                    _hover={{
                        _text: {
                            _light: {
                                color: "blue.400"
                            },
                            color: "blue.500"
                        }
                    }}
                    alignSelf="flex-end"
                >
                    Forgot password?
                </Link>
                <Button
                    rounded={'3xl'}
                    color={useColorModeValue('blue.500', 'blue.400')}
                    py={3}
                >
                    Login
                </Button>
                <Center>
                    <HStack>
                        <Text fontSize={'sm'}>
                            Not a member?
                        </Text>
                        <Link
                            onPress={handlePressRegister}
                            isUnderlined={false}
                            _text={{
                                fontSize: 'sm',
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
                            ml={1}
                        >
                            Register now
                        </Link>
                    </HStack>


                </Center>

            </VStack>
        </AnimatedColorBox >
    )
}

export default LoginScreen