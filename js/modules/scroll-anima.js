import debounce from './debounce.js';

export default class ScrollAnima {
  constructor(sections) {
    this.sections = document.querySelectorAll(sections);
    this.windowMetade = window.innerHeight * 0.6;

    this.checkDistance = debounce(this.checkDistance.bind(this), 50);
  }

  // Pega a distância de cada item em relação ou topo do site
  getDistance() {
    this.distance = [...this.sections].map((section) => {
      const offser = section.offsetTop;
      return {
        element: section,
        offser: Math.floor(offser - this.windowMetade),
      };
    });
  }

  // Verifica a distancia em cada objeto em relação ao scroll do site
  checkDistance() {
    this.distance.forEach((item) => {
      if (window.pageYOffset > item.offser) {
        item.element.classList.add('ativo');
      } else if (item.element.classList.contains('ativo')) {
        item.element.classList.remove('ativo');
      }
    });
  }

  init() {
    if (this.sections.length) {
      this.getDistance();
      this.checkDistance();
      window.addEventListener('scroll', this.checkDistance);
    }
    return this;
  }

  // Remove o evento de scroll
  stop() {
    window.removeEventListener('scroll', this.checkDistance);
  }
}
