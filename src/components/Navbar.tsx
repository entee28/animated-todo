import React, { useCallback } from 'react'
import { HStack, IconButton, themeTools, theme, useColorModeValue } from 'native-base'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { DrawerNavigationProp } from '@react-navigation/drawer'

interface Props {
    isMainScreen?: boolean
}

const Navbar = (props: Props) => {
    const { isMainScreen } = props

    const navigation = useNavigation<DrawerNavigationProp<{}>>()
    const handlePressMenuButton = useCallback(() => {
        navigation.openDrawer()
    }, [navigation])

    const activeTextColor = themeTools.getColor(
        theme,
        useColorModeValue('darkText', 'lightText')
    )

    return (
        <HStack
            w={'full'}
            h={40}
            alignItems={'center'}
            alignContent={'center'}
            p={4}
        >
            {isMainScreen ? (
                <IconButton
                    onPress={handlePressMenuButton}
                    borderRadius={100}
                    _icon={{
                        as: Feather,
                        name: 'menu',
                        size: 6,
                        color: 'white',
                    }}
                />
            ) : (
                <IconButton
                    onPress={handlePressMenuButton}
                    borderRadius={100}
                    _icon={{
                        as: Feather,
                        name: 'menu',
                        size: 6,
                        color: activeTextColor,
                    }}
                />
            )}

        </HStack>
    )
}

export default Navbar