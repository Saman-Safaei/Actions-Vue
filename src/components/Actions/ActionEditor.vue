<template>
  <div class="editor bg-slate-200">
    <div :id="props.editorId" ref="textContainer">
      <slot>
        <p><br></p>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps(["editorId"]);
const emits = defineEmits(["textChanged"]);
const textContainer = ref(null);

const toolbarOptions = [
  [{ header: [1, 2, 3, 4, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ 'direction': 'rtl' }, { align: [] }]
];

onMounted(() => {
  const quill = new Quill("#" + props.editorId, {
    theme: "snow",
    modules: {
      toolbar: toolbarOptions
    }
  });

  quill.on('text-change', () => {
    emits("textChanged", textContainer.value.getElementsByClassName("ql-editor")[0].innerHTML);
  });
});

</script>

<style lang="scss" scoped>
// @import "../../assets/styles/base/variables";

// .editor {
//   background-color: $light;
// }
</style>
