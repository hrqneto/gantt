import axios from "axios";
import * as types from './mutations-types'
import tasks from '../../../assets/json_response.json'

export const setPeriodMode = ({ commit }, data) => {
  commit(types.SET_PERIOD_MODE, data)
}

export const setCell = ({ commit }, data) => {
  commit(types.SET_CELL, data)
}

export const setGridRows = ({ commit }, data) => {
  commit(types.SET_GRID_ROWS, data)
}

export const loadTasks = async ({ commit }) => {
  try {
    throw new Error("SKIPPING")
    // eslint-disable-next-line no-unreachable
    commit(types.LOAD_TASKS, await axios.request({
      baseURL: 'http://10.100.0.151:3020/service/v1/production-plan/',
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET',
      url: '/search/787'
    }))
  } catch (error) {
    console.error(error)
    commit(types.LOAD_TASKS, tasks)
  }
}

export const simulateTask = async ({ commit }, data) => {
  try {
    throw new Error("SKIPPING")
    // eslint-disable-next-line no-unreachable
    commit(types.LOAD_TASKS, await axios.request({
      baseURL: 'http://10.100.0.151:3020/service/v1/production-plan/',
      data,
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      url: '/load-simulation'
    }))
  } catch (error) {
    console.error(error)
    commit(types.LOAD_TASKS, tasks)
  }
}
