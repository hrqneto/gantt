const beforeEach = (to, from, next) => {
  document.title = `Grupo Dass - ${to.name}` 
  next()
}

export default beforeEach
