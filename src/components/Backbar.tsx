import React, { useCallback } from 'react'
import { HStack, IconButton, themeTools, theme, useColorModeValue } from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

interface Props {
    isMainScreen?: boolean
}

const Backbar = (props: Props) => {
    const { isMainScreen } = props

    const navigation = useNavigation();

    const handlePressBackButton = useCallback(() => {
        // @ts-ignore
        navigation.pop()
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
                    onPress={handlePressBackButton}
                    borderRadius={100}
                    _icon={{
                        as: AntDesign,
                        name: 'back',
                        size: 6,
                        color: 'white',
                    }}
                />
            ) : (
                <IconButton
                    onPress={handlePressBackButton}
                    borderRadius={100}
                    _icon={{
                        as: AntDesign,
                        name: 'back',
                        size: 6,
                        color: activeTextColor,
                    }}
                />
            )}

        </HStack>
    )
}

export default Backbar