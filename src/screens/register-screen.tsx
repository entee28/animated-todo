import { Heading, Input, useColorModeValue, VStack, Icon, Link, Button, Center, Text, HStack } from 'native-base'
import React, { useCallback } from 'react'
import AnimatedColorBox from '../components/AnimatedColorBox'
import MastHead from '../components/MastHead'
import { MaterialIcons } from '@expo/vector-icons'
import { DrawerContentComponentProps } from '@react-navigation/drawer'
import Backbar from '../components/Backbar'



const RegisterScreen = (props: DrawerContentComponentProps) => {
    const [show, setShow] = React.useState(false);

    const { navigation, state } = props;

    const handlePressLogin = useCallback(() => {
        navigation.navigate('Login')
    }, [navigation])

    const handlePressRegister = useCallback(() => {
        navigation.navigate('Avatar')
    }, [navigation])

    return (
        <AnimatedColorBox
            flex={1}
            bg={useColorModeValue('warmGray.50', 'primary.900')}
            w='full'
        >
            <MastHead
                image={require('../assets/images/register.png')}
            >
                <Backbar />
            </MastHead>
            <Heading
                color={useColorModeValue('darkText', 'lightText')}
                p={6}
                mt='-50px'
                size={'xl'}
            >
                Register
            </Heading>
            <VStack
                flex={1}
                space={3}
                borderTopLeftRadius={'20px'}
                borderTopRightRadius={'20px'}
                bg={useColorModeValue('warmGray.50', 'primary.900')}
                px={6}
            >
                <Input
                    size="xl"
                    keyboardType='email-address'
                    placeholder="Email address"
                    InputLeftElement={<Icon as={<MaterialIcons name="mail-outline" />} size={5} ml="2" color="muted.400" />}
                    fontSize={'md'}
                    py={2} px={4} />
                <Input
                    size="xl"
                    placeholder="Phone number"
                    keyboardType='numeric'
                    InputLeftElement={<Icon as={<MaterialIcons name="phone" />} size={5} ml="2" color="muted.400" />}
                    fontSize={'md'}
                    py={2} px={4} />
                <Input
                    size="xl"
                    placeholder="Full name"
                    InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />}
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
                <Button
                    rounded={'3xl'}
                    color={useColorModeValue('primary.700', 'primary.300')}
                    py={3}
                    mt={4}
                    onPress={handlePressRegister}
                >
                    Register
                </Button>
                <Center>
                    <HStack>
                        <Text fontSize={'sm'}>
                            Joined us before?
                        </Text>
                        <Link
                            onPress={handlePressLogin}
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
                            Login
                        </Link>
                    </HStack>


                </Center>

            </VStack>
        </AnimatedColorBox >
    )
}

export default RegisterScreen