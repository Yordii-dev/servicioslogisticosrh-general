<template>
  <div class="p-1 d-flex justify-content-between align-items-center">
    <div class="d-flex w-75 justify-content-end">
      <p class="m-0 alert-warning px-2 text-right">
        Gestion para operadores en
        <a target="_blank" :href="url + userId">{{ url + userId }}</a>
      </p>
    </div>
    <button
      class="btn btn-primary"
      data-toggle="modal"
      data-target="#modalNewUser"
    >
      Crear operador
    </button>
    <OperatorModal />
  </div>
  <br />
</template>

<script>
import { mapMutations } from "vuex";
import OperatorModal from "../modals/OperatorModal.vue";
export default {
  components: { OperatorModal },
  data() {
    return {
      token: localStorage.getItem("token_user"),
      url: "http://arequepay.com/manage/",
      userId: "...",
    };
  },

  methods: {
    ...mapMutations(["setAppError"]),
    async getThisUser() {
      try {
        const URL = `${process.env.VUE_APP_API_USER}/users-self`;

        let res = await fetch(URL, {
            headers: {
              Authorization: "Bearer " + this.token,
            },
          }),
          response = await res.json();
        if (response.error) throw response;
        return response;
      } catch (error) {
        let message =
          error.statusText ||
          `Error de Front: Al obtener datos del actual usuario`;
        this.setAppError(message);
      }
    },
  },
  async mounted() {
    let response = await this.getThisUser();

    if (typeof response == "undefined") return;

    if (response.status == "success") {
      this.userId = response.data.user.id;
    }
  },
};
</script>
