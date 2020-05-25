import * as types from './mutations-types'

export default {
  [types.SET_PERIOD_MODE] (state, data) {
    state.dashboard.mode = data
  },
  [types.SET_CELL] (state, data) {
    state.dashboard.cell = data
  },
  [types.SET_GRID_ROWS] (state, data) {
    state.dashboard.gridRows = data
  }
}
