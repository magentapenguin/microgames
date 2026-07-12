const home = '/microgames';
const style = `
.back-button {
    position: fixed;
    left: 8px;
    top: 8px;
    font-size: 1.2em;
    color: currentColor;
}
.back-button svg {
    width: 1em;
    height: 1em;
    vertical-align: -0.125em;
}
`
const button = document.createElement('a');
button.href = home;
button.className = 'back-button';
button.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" clip-rule="evenodd" />
</svg>
`;


if (window.location.pathname !== home) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            document.head.insertAdjacentHTML('beforeend', `<style>${style}</style>`);
            document.body.appendChild(button);
        });
    } else {
        document.head.insertAdjacentHTML('beforeend', `<style>${style}</style>`);
        document.body.appendChild(button);
    }
}
