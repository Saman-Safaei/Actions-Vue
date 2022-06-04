<template>
  <div class="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 p-3">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
// @import "../../assets/styles/base/variables";

// .actions-layout {
//   display: grid;
//   grid-template-columns: 1fr;
//   gap: 0.6rem;
//   padding: 1rem;

//   @media screen and (min-width: $sm) {
//     grid-template-columns: 1fr 1fr;
//   }

//   @media screen and (min-width: $md) {
//     grid-template-columns: 1fr 1fr 1fr;
//   }

//   @media screen and (min-width: $lg) {
//     grid-template-columns: 1fr 1fr 1fr 1fr;
//   }
// }
</style>
