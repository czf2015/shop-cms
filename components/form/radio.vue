<template>
  <a-radio-group :options="options" @change="onChange" v-model="value" />
</template>


<script>
const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
]

export default {
  data () {
    return {
      options,
      value: 'Apple',
    }
  },
  methods: {
    onChange (e) {
      console.log('radio checked', e.target.value)
    },
  },
}
</script>