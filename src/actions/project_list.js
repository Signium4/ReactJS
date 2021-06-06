export const NEWPROJECTNEAME_CHANGE = 'NEWPROJECTNEAME_CHANGE'
export const PROJECTSBYID_CHANGE = 'PROJECTSBYID_CHANGE'

export const handleProjectNameChange = (newProjectName) => ({ 
  type: NEWPROJECTNEAME_CHANGE,
  payload: newProjectName
})

export const handleNewProjectAdd = (id) => ({
  type: PROJECTSBYID_CHANGE,
  payload: id
})
