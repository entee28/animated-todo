import React, { useRef, useCallback } from 'react'
import { AnimatePresence, View } from 'moti'
import { PanGestureHandlerProps, ScrollView } from 'react-native-gesture-handler'
import TaskItem from './TaskItem'
import makeStyledComponent from '../utils/styled'

const StyledView = makeStyledComponent(View)
const StyledScrollView = makeStyledComponent(ScrollView)

interface TaskItemData {
    id: string
    subject: string
    done: boolean
}

interface TaskListProps {
    data: Array<TaskItemData>
    editingItemId: string | null
    onToggleItem: (item: TaskItemData) => void
    onChangeSubject: (item: TaskItemData, subject: string) => void
    onFinishEditing: (item: TaskItemData) => void
    onPressLabel: (item: TaskItemData) => void
    onRemoveItem: (item: TaskItemData) => void
}

interface TaskItemProps extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
    data: TaskItemData,
    isEditing: boolean,
    onToggleItem: (item: TaskItemData) => void
    onChangeSubject: (item: TaskItemData, subject: string) => void
    onFinishEditing: (item: TaskItemData) => void
    onPressLabel: (item: TaskItemData) => void
    onRemove: (item: TaskItemData) => void
}

export const AnimatedTaskItem = (props: TaskItemProps) => {
    const { data, isEditing, onToggleItem, onChangeSubject, onFinishEditing, onRemove, simultaneousHandlers, onPressLabel } = props
    const handleToggleCheckbox = useCallback(() => {
        onToggleItem(data)
    }, [data, onToggleItem])
    const handleChangeSubject = useCallback((subject) => {
        onChangeSubject(data, subject)
    }, [data, onChangeSubject])
    const handleFinishEditing = useCallback(() => {
        onFinishEditing(data)
    }, [data, onFinishEditing])
    const handlePressLabel = useCallback(() => {
        onPressLabel(data)
    }, [data, onPressLabel])
    const handleRemove = useCallback(() => {
        onRemove(data)
    }, [data, onRemove])

    return (
        <StyledView w='full'
            from={{
                opacity: 0,
                scale: 0.5,
                marginBottom: -46
            }}
            animate={{
                opacity: 1,
                scale: 1,
                marginBottom: 0
            }}
            exit={{
                opacity: 0,
                scale: 0.5,
                marginBottom: -46
            }}
        >
            <TaskItem
                simultaneousHandlers={simultaneousHandlers}
                subject={data.subject}
                isDone={data.done}
                isEditing={isEditing}
                onToggleCheckbox={handleToggleCheckbox}
                onChangeSubject={handleChangeSubject}
                onFinishEditing={handleFinishEditing}
                onPressLabel={handlePressLabel}
                onRemove={handleRemove}
            />
        </StyledView>
    )
}

const TaskList = (props: TaskListProps) => {
    const { data, editingItemId, onToggleItem, onChangeSubject, onFinishEditing, onPressLabel, onRemoveItem } = props
    const refScrollView = useRef(null)
    return (
        <StyledScrollView w='full'>
            <AnimatePresence>
                {data.map(item => (
                    <AnimatedTaskItem
                        key={item.id}
                        data={item}
                        simultaneousHandlers={refScrollView}
                        isEditing={item.id === editingItemId}
                        onToggleItem={onToggleItem}
                        onChangeSubject={onChangeSubject}
                        onFinishEditing={onFinishEditing}
                        onPressLabel={onPressLabel}
                        onRemove={onRemoveItem}
                    />
                ))}
            </AnimatePresence>
        </StyledScrollView >
    )
}

export default TaskList