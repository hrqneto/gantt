<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="navbar-menu"
      mode="horizontal"
      @select="handleSelect"
      background-color="#880221"
      text-color="#fff"
      active-text-color="#fff">
      <el-menu-item>
        <img class="img-logo" src="../../../assets/images/dass-logo-dashboard.png" alt="">
      </el-menu-item>
      <el-menu-item index="1">Dashboard</el-menu-item>
      <el-menu-item index="2">Cadastros</el-menu-item>
      <el-menu-item index="3">Movimentações</el-menu-item>
      <el-menu-item index="4">Consultas</el-menu-item>
      <el-menu-item index="5">Relatórios</el-menu-item>
      <el-menu-item index="6">Configurações</el-menu-item>
      <div class="loggout-menu">
        <el-menu-item index="7" @click="loggout()">Sair</el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'navbar',

  data() {
    return {
      activeIndex: '1'
    };
  },
  methods: {
    // handleSelect(key, keyPath) {
    //   console.log(key, keyPath)
    // },
    loggout () {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
  .navbar-menu {
    .img-logo {
      height: 99%;
    }
    .loggout-menu {
      display: flex;
      justify-content: flex-end;
      background-color: #880221;
    }
  }
</style>