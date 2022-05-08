let lastUrl = location.href;
const stopBtnId = 'watch-kinopoisk-stop-btn';
const playerTailId = 'watch-kinopoisk-player-tail';
const playerLayerId = 'watch-kinopoisk-player-layer';
const bodyClassOnPlayerEnable = 'watch-kinopoisk-body-player-on'
const playerId = 'watch-kinopoisk-player';
const movieTypes = ['film', 'series'];
const closeBtnImage = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="100%" height="100%" viewBox="0 0 256 256" xml:space="preserve"><g transform="translate(128 128) scale(0.72 0.72)" style=""><g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(-175.05 -175.05000000000004) scale(3.89 3.89)" ><path d="M 6 90 c -1.536 0 -3.071 -0.586 -4.243 -1.758 c -2.343 -2.343 -2.343 -6.142 0 -8.484 l 78 -78 c 2.342 -2.343 6.143 -2.343 8.484 0 c 2.344 2.343 2.344 6.142 0 8.485 l -78 78 C 9.071 89.414 7.536 90 6 90 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" /><path d="M 84 90 c -1.535 0 -3.071 -0.586 -4.242 -1.758 l -78 -78 c -2.343 -2.343 -2.343 -6.142 0 -8.485 c 2.343 -2.343 6.143 -2.343 8.485 0 l 78 78 c 2.344 2.343 2.344 6.142 0 8.484 C 87.071 89.414 85.535 90 84 90 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" /></g></g></svg>`;
const tailImage = `<svg width="100%" height="100%" viewBox="0 0 128 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path id="Banner" d="M128,0L0,0L0,512L64,480L128,512L128,0Z" style="fill:url(#_Linear1);"/><g transform="matrix(6.57572e-17,1.0739,-1.08204,6.62559e-17,327.734,298.698)"><g><path d="M78.752,202.827L99.504,239.449L120.551,275.899L78.752,275.727L36.953,275.899L58.001,239.449L78.752,202.827Z" style="fill:url(#_Linear2);"/></g></g><defs><linearGradient id="_Linear1" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(128,512,-2048,512,0,0)"><stop offset="0" style="stop-color:rgb(248,59,24);stop-opacity:1"/><stop offset="1" style="stop-color:rgb(157,255,51);stop-opacity:1"/></linearGradient><linearGradient id="_Linear2" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(96.5309,0,0,97.4299,30.4868,251.542)"><stop offset="0" style="stop-color:rgb(248,46,23);stop-opacity:1"/><stop offset="1" style="stop-color:rgb(218,173,52);stop-opacity:1"/></linearGradient></defs></svg>`;

function mountPlayer(movieId) {
    removeElement(playerLayerId);

    const stopBtn = document.createElement('div');
    stopBtn.id = stopBtnId;
    stopBtn.innerHTML = closeBtnImage;
    stopBtn.title = 'Закрыть плеер';
    stopBtn.addEventListener('click', () => removePlayer());

    const player = document.createElement('div');
    player.id = playerId;
    player.dataset.kinopoisk = movieId;

    const playerLayer = document.createElement('div');
    playerLayer.id = playerLayerId;
    playerLayer.appendChild(stopBtn);
    playerLayer.appendChild(player);

    document.body.classList.add(bodyClassOnPlayerEnable);
    document.body.appendChild(playerLayer);
    yo();
}

function removePlayer() {
    removeElement(playerLayerId);
    document.body.classList.remove(bodyClassOnPlayerEnable);
}

function mountPlayerTail(movieId) {
    const playerTile = document.createElement('div');
    playerTile.id = playerTailId;
    playerTile.innerHTML = tailImage;
    playerTile.addEventListener('click', () => mountPlayer(movieId));
    playerTile.addEventListener('mouseover', () => { playerTile.style.top = '0px' });
    playerTile.addEventListener('mouseout', () => { playerTile.style.top = '-32px' });

    setTimeout(() => {
        playerTile.style.top = '-32px';
    }, 100);

    document.body.appendChild(playerTile);
}

function removeElement(elementId) {
    if (document.contains(document.getElementById(elementId))) {
        document.getElementById(elementId).remove();
    }
}

function kinopoiskPageHandler() {
    const pathname = window.location.pathname.substr(1).split('/');
    const movieId = pathname[1];
    const movieType = pathname[0];
    const isMovieIdNum = /^\d+$/.test(movieId);

    if (typeof movieId === 'undefined'
        || typeof movieType === 'undefined'
        || !isMovieIdNum
    ) {
        console.error('Watch kinopoisk wrong movie data');
        removeElement(playerTailId);

        return;
    }

    console.log('Watch kinopoisk movie id: ' + movieId);
    if (movieTypes.includes(movieType)) {
        mountPlayerTail(movieId);
    } else {
        removeElement(playerTailId);
    }
}

new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
        lastUrl = url;
        removePlayer();
        kinopoiskPageHandler();
    }
}).observe(document, {subtree: true, childList: true});

document.addEventListener('keyup', function(e) {
    if (e.code === 'Escape') {
        removePlayer();
    }
});

window.addEventListener('load', kinopoiskPageHandler)
