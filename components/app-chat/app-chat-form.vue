<template>
  <div class="form">
    <div class="form__text-field">
      <div class="form__text-field__container">
        <v-img src="logo3_big.png" max-height="128" contain></v-img>
        <span>{{
          username
            ? 'Podaj nowy nick:'
            : 'Aby korzystać z shoutboxa, musisz ustawić swój nick:'
        }}</span>
        <div>
          <v-text-field
            v-model="newUsername"
            hide-details
            placeholder="Twój nick"
            @keyup.enter="onSend"
          ></v-text-field>
        </div>
      </div>
    </div>
    <div class="form__btn">
      <v-btn color="accent" :disabled="!newUsername" @click="onSubmit"
        >Zapisz</v-btn
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppChatForm',
  props: {
    username: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      newUsername: '',
    }
  },
  beforeMount() {
    this.newUsername = this.username
  },
  methods: {
    onSubmit() {
      this.$emit('submit', this.newUsername)
    },
  },
}
</script>
<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  // justify-content: flex-end;
  &__text-field {
    display: flex;
    flex: 1 0 auto;
    margin: 8px 16px;
    // margin: 8px 16px;
    &__container {
      margin-top: 40px;
      display: flex;
      // flex: 1 0 auto;
      flex-direction: column;
      // justify-content: center;
      width: 100%;
    }
  }
  &__btn {
    display: flex;
    flex: 0 1 auto;
    justify-content: flex-end;
    margin: 8px 16px;
  }
}
</style>
