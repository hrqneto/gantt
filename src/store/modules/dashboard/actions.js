import axios from "axios";
import * as types from './mutations-types'

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
    commit(types.LOAD_TASKS, await axios.request({
      baseURL: 'http://10.100.0.151:3020/service/v1/production-plan/',
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET',
      url: '/search/787',
      withCredentials: true
    }))
  } catch (error) {
    console.error(error)
  }
}

export const simulateTask = async ({ commit }, data) => {
  try {
    commit(types.LOAD_TASKS, await axios.request({
      baseURL: 'http://10.100.0.151:3020/service/v1/production-plan/',
      data,
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      url: '/load-simulation',
      withCredentials: true
    }))
  } catch (error) {
    console.error(error)
  }
}
