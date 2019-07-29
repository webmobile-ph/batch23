<template>
  <h1>{{ greetings }}</h1>
</template>

<script>
export default {
  props: [ 'hello' ],
  computed: {
    greetings () {
      return `Hello ${this.hello}, how may I help you?`
    }
  }
}
</script>
