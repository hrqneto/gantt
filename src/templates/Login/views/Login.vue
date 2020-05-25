<template>
  <div class="login">
    <div slot="header" class="card-header">
      Planejamento de Produção
    </div>
    <div class="box-card">
      <generic-input
        class="input-user"
        type="text"
        label="Usuário"
        @input="receiveUser($event)"
      ></generic-input>
      <generic-input
        class="input-password"
        type="password"
        label="Senha"
        @input="receivePassword($event)"
      ></generic-input>
      <generic-button
        class="enter-button"
        color="green"
        @click="submitLogin(user, password)"
      >Entrar</generic-button>
    </div>
  </div>
</template>

<script>
import GenericInput from '@/components/atoms/GenericInput'
import GenericButton from '@/components/atoms/GenericButton'
export default {
  name: 'login',

  components: {
    'generic-input': GenericInput,
    'generic-button': GenericButton
  },

  data () {
    return {
      user: '',
      password: ''
    }
  },

  methods: {
    receiveUser (event) {
      this.user = event
    },
    receivePassword (event) {
      this.password = event
    },
    submitLogin (user, password) {
      if (user === 'dev' && password === 'dev123') {
        this.$router.push('/dashboard')
      }else {
        this.$notify({
          title: 'Credenciais Inválidas',
           position: 'top-left',
          type: 'warning'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  $red: #b0042b;
  $box-radius: 15px;
  .login {
    width: 100%;
    height: 100vh;
    background-image: linear-gradient(
        to bottom,
        rgba(176, 4, 43, 0.2),
        rgba(192, 196, 204, 0.3)
      ),
      url("../../../assets/images/dass-creative-center.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    position: relative;
    z-index: 1;

    display: flex;
    flex-direction: column;
    align-items: flex-end;
    .card-header {
      margin-top: 70px;
      margin-right: 70px;
      width: 300px;
      padding: 15px 40px 15px 40px;
      background-color: $red;
      border-top-left-radius: $box-radius;
      border-top-right-radius: $box-radius;
      color: white;
      display: flex;
      justify-content: center;
      font-weight: bold;
    }
    .box-card {
      margin-right: 70px;
      width: 300px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      padding: 40px;
      border-bottom-left-radius: $box-radius;
      border-bottom-right-radius: $box-radius;
      .input-password {
        margin-top: 20px;
      }
      .enter-button {
        width: 100%;
        height: 40px;
      }
    }
  }
</style>
