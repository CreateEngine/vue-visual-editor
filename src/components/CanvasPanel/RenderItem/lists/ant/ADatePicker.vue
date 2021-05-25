<template>
  <div>
<a-week-picker placeholder="Select week" @change="onChange" />
  </div>
</template>
<script>

export default {
  name: "ADatePicker",
  methods: {
    onChange(date, dateString) {
      console.log(date, dateString);
    },
  },
};
</script>
