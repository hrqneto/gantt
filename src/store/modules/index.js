import dashboard from './dashboard'

const vuex = {
  dashboard
}

const keys = Object.keys(vuex)

const modules = keys.reduce((acc, key) => ({ ...acc, [key]: vuex[key].module }), {})

export default { modules }
