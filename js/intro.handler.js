export default function IntroHandler(show, type){
    const intro = document.getElementById('intro');
    const introIcon = document.getElementById('intro-icon');
    const introTitle = document.getElementById('intro-title');

    intro.classList.add('d-none');
    introIcon.classList.add('ri-camera-lens-fill');
    introIcon.classList.remove('ri-search-eye-line');
    introTitle.textContent = 'Start exploring';

    if(type === 'not-found'){
        introIcon.classList.remove('ri-camera-lens-fill');
        introIcon.classList.add('ri-search-eye-line');
        introTitle.textContent = 'Not Found';
    }

    if(show) intro.classList.remove('d-none');
    
}