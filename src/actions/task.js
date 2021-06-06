export const TASKSTATUS_CHANGE = 'TASKSTATUS_CHANGE'

export const handleTaskStatusChange = (taskId) => ({
    type: TASKSTATUS_CHANGE,
    payload: taskId
  })