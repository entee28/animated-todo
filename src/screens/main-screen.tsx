import { Center, VStack, useColorModeValue, Fab, Icon } from 'native-base'
import ThemeToggle from '../components/theme-toggle'
import React, { useCallback } from 'react'
import { AntDesign } from '@expo/vector-icons'
import shortid from 'shortid'
import TaskList from '../components/TaskList'
import AnimatedColorBox from '../components/AnimatedColorBox'
import MastHead from '../components/MastHead'
import Navbar from '../components/Navbar'

const initialData = [
    {
        id: shortid.generate(),
        subject: 'Learn React Native',
        done: false,
    },
    {
        id: shortid.generate(),
        subject: 'Learn TypeScript',
        done: false,
    },
]

const MainScreen = () => {
    const [data, setData] = React.useState(initialData)
    const [editingItemId, setEditingItemId] = React.useState<string | null>(null)

    const handleToggleTaskItem = useCallback(item => {
        setData(prevData => {
            const newData = [...prevData]
            const index = newData.findIndex(i => i.id === item.id)
            newData[index] = { ...item, done: !item.done }
            return newData
        })
    }, [])

    const handleChangeTaskItemSubject = useCallback((item, newSubject) => {
        setData(prevData => {
            const newData = [...prevData]
            const index = newData.findIndex(i => i.id === item.id)
            newData[index] = { ...item, subject: newSubject }
            return newData
        })
    }, [])

    const handleFinishEditingTaskItem = useCallback(item => {
        setEditingItemId(null)
    }, [])

    const handlePressTaskItemLabel = useCallback(item => {
        setEditingItemId(item.id)
    }, [])

    const handleRemoveTaskItem = useCallback(item => {
        setData(prevData => {
            const newData = prevData.filter(i => i.id !== item.id)
            return newData
        })
    }, [])

    return (
        <AnimatedColorBox
            flex={1}
            bg={useColorModeValue('warmGray.50', 'primary.900')}
            w='full'
        >
            <MastHead
                title="What's up, Iris!"
                image={require('../assets/images/masthead.png')}
            >
                <Navbar isMainScreen />
            </MastHead>
            <VStack
                flex={1}
                space={1}
                mt='-20px'
                borderTopLeftRadius={'20px'}
                borderTopRightRadius={'20px'}
                pt={'20px'}
                bg={useColorModeValue('warmGray.50', 'primary.900')}
            >
                <TaskList
                    data={data}
                    onToggleItem={handleToggleTaskItem}
                    onChangeSubject={handleChangeTaskItemSubject}
                    onFinishEditing={handleFinishEditingTaskItem}
                    onPressLabel={handlePressTaskItemLabel}
                    onRemoveItem={handleRemoveTaskItem}
                    editingItemId={editingItemId}
                />
            </VStack>
            <Fab
                position={'absolute'}
                renderInPortal={false}
                size={'sm'}
                icon={<Icon color={'white'} as={<AntDesign name="plus" />} size='sm' />}
                colorScheme={useColorModeValue('blue', 'darkBlue')}
                bg={useColorModeValue('blue.500', 'blue.400')}
                onPress={() => {
                    const id = shortid.generate()
                    setData([
                        {
                            id,
                            subject: '',
                            done: false
                        },
                        ...data
                    ])
                    setEditingItemId(id)
                }}
            />
        </AnimatedColorBox >
    )
}

export default MainScreen