export const NEWTASKDESCRIPTION_CHANGE = 'NEWTASKDESCRIPTION_CHANGE'
export const NEWTASKNAME_CHANGE = 'NEWTASKNAME_CHANGE'
export const TASKSBYID_CHANGE = 'TAKSKSBYID_CHANGE'

export const handleTaskChangeName = (name) => ({ 
  type: NEWTASKNAME_CHANGE,
  payload: name
})

export const handleTaskChangeDescription = (desc) => ({ 
    type: NEWTASKDESCRIPTION_CHANGE,
    payload: desc
  })

export const handleNewTaskAdd = (projectId) => ({
  type: TASKSBYID_CHANGE,
  payload: projectId
})
