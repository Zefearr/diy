class Mobile {
    constructor() {
        this.mobileIcon = document.querySelector('.site-header__menu-icon');
        this.mainMenu = document.querySelector('.site-header__menu');
        this.events();   
    }

    events() {  
        this.mobileIcon.addEventListener('click', () => this.toggleMenu())
    }
    
    toggleMenu() {
        this.mainMenu.classList.toggle('site-header__menu--visible');
        this.mobileIcon.classList.toggle('site-header__menu-icon--close-x');
    }
}
export default Mobile;