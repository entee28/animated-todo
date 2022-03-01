import { NativeSyntheticEvent, Pressable, TextInputChangeEventData } from 'react-native'
import React, { useCallback } from 'react'
import { Box, HStack, Icon, useTheme, themeTools, useColorModeValue, Input } from 'native-base'
import AnimatedCheckbox from './AnimatedCheckbox'
import AnimatedTaskLabel from './AnimatedTaskLabel'
import SwipableView from './swipable-view'
import { Feather } from '@expo/vector-icons'
import { PanGestureHandlerProps } from 'react-native-gesture-handler'

interface Props extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
    isEditing: boolean
    isDone: boolean
    onToggleCheckbox?: () => void
    onPressLabel?: () => void
    onRemove?: () => void
    onChangeSubject?: (subject: string) => void
    onFinishEditing?: () => void
    subject: string
}

const TaskItem = (props: Props) => {
    const { isDone, onToggleCheckbox, onPressLabel, onRemove, subject, simultaneousHandlers, onChangeSubject, onFinishEditing, isEditing } = props
    const theme = useTheme();
    const highlightColor = themeTools.getColor(
        theme,
        useColorModeValue('blue.500', 'blue.400')
    )
    const boxStroke = themeTools.getColor(
        theme,
        useColorModeValue('muted.300', 'muted.500')
    )
    const checkmarkColor = themeTools.getColor(
        theme,
        useColorModeValue('white', 'white')
    )
    const activeTextColor = themeTools.getColor(
        theme,
        useColorModeValue('darkText', 'lightText')
    )
    const doneTextColor = themeTools.getColor(
        theme,
        useColorModeValue('muted.400', 'muted.600')
    )

    const handleChangeSubject = useCallback((e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        onChangeSubject && onChangeSubject(e.nativeEvent.text)
    }, [onChangeSubject])

    return (
        <SwipableView
            simultaneousHandlers={simultaneousHandlers}
            onSwipeLeft={onRemove}
            backView={
                <Box w={'full'} h={'full'} bg='red.500' alignItems={'flex-end'} justifyContent='center' pr={4}>
                    <Icon color={'white'} size='sm' as={<Feather name='trash-2' />} />
                </Box>
            }
        >
            <HStack
                alignItems="center"
                w='full'
                px={4}
                py={2}
                bg={useColorModeValue('warmGray.50', 'primary.900')}
            >
                <Box width={30} height={30} mr={2} >
                    <Pressable onPress={onToggleCheckbox}>
                        <AnimatedCheckbox
                            highlightColor={highlightColor}
                            boxOutlineColor={boxStroke}
                            checkmarkColor={checkmarkColor}
                            checked={isDone}
                        />
                    </Pressable>
                </Box>
                {isEditing ? (
                    <Input
                        placeholder='Task'
                        value={subject}
                        variant='unstyled'
                        fontSize={19}
                        px={1}
                        py={0}
                        autoFocus
                        blurOnSubmit
                        onChange={handleChangeSubject}
                        onBlur={onFinishEditing}
                    />
                ) : (
                    <AnimatedTaskLabel
                        textColor={activeTextColor}
                        inactiveTextColor={doneTextColor}
                        strikethrough={isDone}
                        onPress={onPressLabel}
                    >
                        {subject}
                    </AnimatedTaskLabel>
                )}
            </HStack>
        </SwipableView>


    )
}

export default TaskItem