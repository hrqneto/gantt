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
