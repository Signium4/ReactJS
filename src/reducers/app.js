import { NEWPROJECTNEAME_CHANGE, PROJECTSBYID_CHANGE } from "../actions/project_list"
import { NEWTASKNAME_CHANGE, NEWTASKDESCRIPTION_CHANGE, TASKSBYID_CHANGE } from "../actions/task_list"
import { TASKSTATUS_CHANGE } from "../actions/task"
import { THEME_CHANGE } from "../actions/theme"

const projects = [
    {
        id: 1,
        name: 'Универ',
        tasks: [
            {
                id: 1,
                name: 'Домашняя работа по ReactJS',
                description: 'Сделать ДЗ3 к 22.04 ',
                completed: false
            },
            {
                id: 2,
                name: 'GitHub',
                description: 'Посмотреть парочку статей про работу с GitHub, что-нибудь на YouTube',
                completed: false
            },
            {
                id: 3,
                name: 'Экзамен на военке',
                description: 'Посмотреть материалы по всп, написать билеты',
                completed: true
            },
            {
                id: 4,
                name: 'ДЗ по менеджменту',
                description: 'Выбрать сферу компаний для дз по стратегическому менеджменту',
                completed: true
            },
        ]
    },
    {
        id: 2,
        name: 'Домашние дела',
        tasks: [
            {
                id: 5,
                name: 'Уборка квартиры',
                description: 'Пропылесосить, стереть пыль, помыть полы в квартире',
                completed: true
            },
            {
                id: 6,
                name: 'Уход за домашним скотом',
                description: 'Налить воды муравьям и улиткам, покормить улиток',
                completed: false
            },
            {
                id: 7,
                name: 'Поход',
                description: 'Сходить в магазин за продуктами',
                completed: false
            }
        ]
    },
    {
        id: 3,
        name: 'Всякие свои дела',
        tasks: [
            {
                id: 8,
                name: 'Прослушка',
                description: 'Послушать новый небольшой мюзикл от группы "Дайте Танк (!)"',
                completed: false
            },
            {
                id: 9,
                name: 'План',
                description: 'Составить список дел',
                completed: true
            },
        ]
    }
]


const normalize = (arr) => {
    const normalizedProjects = {};
    const normalizedTasks = {};
    arr.map(
        project => {
            const projectNormalized = {
                id: project.id,
                name: project.name,
                tasks: project.tasks.map(task => task.id)
            }
            normalizedProjects[projectNormalized.id] = projectNormalized;
            project.tasks.map(
                task => {
                    const taskNormalized = {
                        id: task.id,
                        name: task.name,
                        description: task.description,
                        completed: task.completed,
                    }
                    normalizedTasks[taskNormalized.id] = taskNormalized;
                }
            )
        }
    )
    const normalizedState = {
        theme: 'light',
        projectsById: normalizedProjects,
        tasksById: normalizedTasks,
        newProject: {
            id: projects.length + 1,
            name: '',
            tasks: []
        },
        newTask: {
            id: Object.keys(normalizedTasks).length + 1,
            name: '',
            description: '',
            completed: false,
        }
    }
    return normalizedState;
}


const normalizedProjects = normalize(projects);
const initialState = normalizedProjects;

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case NEWPROJECTNEAME_CHANGE: {
            return {
                projectsById: { ...state.projectsById },
                tasksById: { ...state.tasksById },
                newProject: { ...state.newProject, name: action.payload },
                newTask: { ...state.newTask },
                theme: state.theme
            }
        }
        case PROJECTSBYID_CHANGE: {
            return {
                projectsById: { ...state.projectsById, [action.payload + 1]: state.newProject },
                tasksById: { ...state.tasksById },
                newProject: {
                    id: action.payload + 2,
                    name: '',
                    tasks: []
                },
                newTask: { ...state.newTask },
                theme: state.theme
            }
        }
        case NEWTASKNAME_CHANGE: {
            return {
                projectsById: { ...state.projectsById },
                tasksById: { ...state.tasksById },
                newProject: { ...state.newProject },
                newTask: { ...state.newTask, name: action.payload },
                theme: state.theme
            }
        }
        case NEWTASKDESCRIPTION_CHANGE: {
            return {
                projectsById: { ...state.projectsById },
                tasksById: { ...state.tasksById },
                newProject: { ...state.newProject },
                newTask: { ...state.newTask, description: action.payload },
                theme: state.theme
            }
        }
        case TASKSBYID_CHANGE: {
            const lastTaskId = Object.keys(state.tasksById).length;
            const newTasks = [...state.projectsById[action.payload].tasks];
            newTasks.push(Number(lastTaskId + 1));
            const newState = {
                projectsById: { ...state.projectsById },
                tasksById: { ...state.tasksById, [lastTaskId + 1]: state.newTask },
                newProject: { ...state.newProject },
                newTask: {
                    id: lastTaskId + 2,
                    name: '',
                    description: '',
                    completed: false
                },
                theme: state.theme
            }
            newState.projectsById[action.payload] = { ...newState.projectsById[action.payload], tasks: newTasks }
            console.log(state)
            console.log(newState)
            return newState
        }
        case TASKSTATUS_CHANGE: {
            const taskIndex = state.tasksById[action.payload].id;

            const newState = {
                projectsById: { ...state.projectsById },
                tasksById: { ...state.tasksById },
                newProject: { ...state.newProject },
                newTask: { ...state.newTask },
                theme: state.theme
            }

            newState.tasksById[taskIndex] = {
                ...newState.tasksById[taskIndex], completed: !newState.tasksById[taskIndex].completed
            }
            return (newState)
        }
        case THEME_CHANGE: {
            return {
                ...state,
                theme: (String(action.payload) === 'light') ? 'dark' : 'light'
            }
        }
        default:
            return state
    }
}

export const taskListReducer = (state = initialState, action) => { }