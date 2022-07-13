import { onMounted } from 'vue';

export function useAnimate() {
  let animatedElems = [];

  onMounted(() => {
    animatedElems = [...document.getElementsByClassName('animated')];
    animate();
  });

  function animate() {
    const { innerHeight, scrollY } = window;

    animatedElems.forEach(element => {
      const elemDistance = scrollY + element.getBoundingClientRect().top;

      if (
        elemDistance < scrollY + innerHeight - 150 &&
        element.classList.contains('animated')
      ) {
        element.classList.remove('invisible', 'animated');
        element.classList.add('fade-show');
        animatedElems = animatedElems.filter(
          filteredElem => filteredElem !== element
        );
      }
    });
  }

  return { animate };
}
