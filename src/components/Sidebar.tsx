import { View, Text } from 'react-native'
import React, { useCallback } from 'react'
import { Avatar, Box, Center, Heading, HStack, IconButton, useColorModeValue, VStack } from 'native-base'
import { DrawerContentComponentProps } from '@react-navigation/drawer'
import AnimatedColorBox from './AnimatedColorBox'
import ThemeToggle from './theme-toggle'
import { Feather } from '@expo/vector-icons'
import MenuButton from './MenuButton'

const Sidebar = (props: DrawerContentComponentProps) => {
    const { state, navigation } = props
    const currentRoute = state.routeNames[state.index]

    const handlePressBackButton = useCallback(() => {
        navigation.closeDrawer()
    }, [navigation])
    const handlePressMenuMain = useCallback(() => {
        navigation.navigate('Main')
    }, [navigation])
    const handlePressMenuAbout = useCallback(() => {
        navigation.navigate('About')
    }, [navigation])
    const handlePressMenuLogin = useCallback(() => {
        navigation.navigate('Login')
    }, [navigation])

    return (
        <AnimatedColorBox
            safeArea
            flex={1}
            bg={useColorModeValue('blue.50', 'darkBlue.800')}
            p={7}
        >
            <VStack
                flex={5}
                space={2}
            >
                <HStack justifyContent={'flex-end'}>
                    <IconButton onPress={handlePressBackButton}
                        borderRadius={100}
                        variant='outline'
                        borderColor={useColorModeValue('blue.300', 'darkBlue.700')}
                        _icon={{
                            as: Feather,
                            name: 'chevron-left',
                            size: 6,
                            color: useColorModeValue('blue.800', 'darkBlue.700'),
                        }}
                    />
                </HStack>
                <Avatar source={require('../assets/images/avatar.jpg')} size={'xl'}
                    borderRadius={100}
                    mb={6}
                    borderColor='secondary.500'
                    borderWidth={3}
                />
                <Heading mb={4} size='xl'>
                    Ngô Ngọc
                </Heading>
                <MenuButton active={currentRoute === 'Main'} onPress={handlePressMenuMain} icon='inbox'>Tasks</MenuButton>
                <MenuButton active={currentRoute === 'About'} onPress={handlePressMenuAbout} icon='info'>About</MenuButton>
            </VStack>

            <VStack
                flex={1}
                space={2}
            >
                {/* <MenuButton onPress={handlePressMenuMain} icon='user'>Account Settings</MenuButton> */}
                <MenuButton onPress={handlePressMenuLogin} icon='log-out'>Log In</MenuButton>
            </VStack>
            <Center>
                <ThemeToggle />
            </Center>
        </AnimatedColorBox>
    )
}

export default Sidebar