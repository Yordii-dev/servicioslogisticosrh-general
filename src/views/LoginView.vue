<template>
  <form
    class="m-auto mt-5 p-4 card d-flex flex-column justify-content-between"
    v-on:submit.prevent="validate"
  >
    <div class="form-group">
      <label class="h6" for="exampleInputEmail1">Email address</label>
      <input
        name="email"
        type="email"
        class="form-control"
        placeholder="Enter email"
        v-model="name"
        required
      />
      <small
        v-if="isFetch"
        class="emailHelp form-text"
        :class="userExist && isFetch ? '' : 'text-danger'"
        >{{ userExist && isFetch ? '' : 'Correo desconocido' }}</small
      >
    </div>
    <br />

    <button class="btn-ingresar border-0 text-white w-100 py-2" type="submit">
      <span
        class="spinner-border spinner-border-sm mx-1"
        :class="spinnerButton ? '' : 'd-none'"
        role="status"
        aria-hidden="true"
      ></span>

      Iniciar sesión
    </button>
  </form>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'LoginView',
  data() {
    return {
      name: '',
      userExist: false,
      isFetch: false,
      spinnerButton: false,
    }
  },
  methods: {
    ...mapMutations(['setAppError']),
    async signin() {
      try {
        this.spinnerButton = true
        const URL = `${process.env.VUE_APP_API_USER}/signin`

        let res = await fetch(URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: this.name }),
          }),
          response = await res.json()

        if (response.error) throw response
        return response
      } catch (error) {
        let message =
          error.statusText || `Error de Front: Al iniciar sesion: ${error}`
        this.setAppError(message)
      }
    },
    async validate() {
      let response = await this.signin()

      this.isFetch = true
      if (typeof response === 'undefined') return
      if (response.status == 'success') {
        this.userExist = true
        localStorage.setItem('token_user', response.data.token)
        this.$router.push({ name: 'tracking' })
      }
      this.spinnerButton = false
    },

    async initialUsers() {
      try {
        const URL = `${process.env.VUE_APP_API_USER}/initial`

        let res = await fetch(URL, {
            method: 'POST',
          }),
          response = await res.json()

        if (response.error) throw response
        return response
      } catch (error) {
        let message =
          error.statusText ||
          `Error de Front: Al iniciar usuarios de Two en Apal: ${error}`
        this.setAppError(message)
      }
    },
  },

  async mounted() {
    //Inicio usuarios de Two en Apal
    await this.initialUsers()
  },
}
</script>

<style scoped>
.emailHelp {
  font-style: italic;
  color: rgb(172, 172, 172);
}
form {
  margin-top: 14vh !important;
  width: 500px;
  height: 200px !important;
}
form input {
  height: 50px;
}
.btn-ingresar {
  background: #142c8e;
  font-size: 20px;
  border-radius: 20px;
}
</style>
