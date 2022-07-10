import { onMounted } from 'vue';

export function useAnimate() {
  const { innerHeight, scrollY } = window;
  let animatedElems = null;

  onMounted(() => {
    animatedElems = document.querySelectorAll('.animated');
    animate();
  });

  function animate() {
    for (let i = 0; i < animatedElems.length; i++) {
      const animatedElem = animatedElems[i];
      const elemDistance = scrollY + animatedElem.getBoundingClientRect().top;

      if (
        elemDistance < scrollY + innerHeight - 200 &&
        animatedElem.classList.contains('animated')
      ) {
        animatedElems[i].classList.remove('invisible', 'animated');
        animatedElems[i].classList.add('fade-show');
      }
    }
  }

  return { animate };
}
