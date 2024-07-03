/**
 * 2C = Two of Clubs (Tréboles)
 * 2D = Two of Diaminds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Espadas)
 * 
 */
let deck         = [];
const tipos      = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0;
let puntosComputadora = 0;
// Referencia del HTML

const btnDetener = document.querySelector('#btnDetener');
const btnPedir = document.querySelector('#btnPedir');
const puntos = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

// Esta funcion crea un nuevo deck
const crearDeck = () => {

    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    }

    for (let tipo of tipos) {
        for (let esp of especiales) {
            deck.push(esp + tipo)
        }
    }
    console.log(deck);

    deck = _.shuffle(deck);
    //console.log(deck);

    return deck;
}
crearDeck();

//esta funcion permite tomar una carta

const pedirCarta = () => {

    if (deck.length === 0) {

        throw 'No hay cartas en el deck'

    }
    const carta = deck.pop();

    // console.log(deck);
    // console.log(carta);

    return carta;
}

pedirCarta();
///////////////////////********************    codigo para asignar valor a la carta     *************** */
//codigo original 

// const valorCarta = ( carta ) => {
    
//     const valor = carta.substring(0, carta.length -1);
//     let puntos  = 0;
//     if( isNaN( valor )){
//         puntos = (valor === 'A') ? 11: 10;
//     }
//     else{
//         puntos = valor * 1;
//     }

//     const puntaje = isNaN(valor)? (puntos = (valor === 'A') ? 11: 10) : puntos = valor *1 ;

//     console.log(puntos);
//     return puntaje;

// }


//codigo reducido
const valorCarta = ( carta ) => {
    
    const valor = carta.substring(0, carta.length -1);
    return ( isNaN(valor) )? 
            ( valor === 'A' ) ? 11: 10
            :valor *1 ;

}

//const valor = valorCarta( pedirCarta() );
// console.log({valor});
// console.log(valor);



// Turno de la Computadora



const turnoComputador = ( puntosMinimos ) => {

    do {

        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntos[1].innerText = puntosComputadora;
    
        // <img class="carta" src="assets/cartas/2C.png"></img>
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append( imgCarta );
    
        if( puntosMinimos > 21 ){
            break;
        }

    } while ( (puntosMinimos > puntosComputadora) && (puntosJugador <= 21) ) ;
    
    setTimeout(() =>{
        if( puntosComputadora === puntosMinimos){
            alert('EMPATE, NADIE GANA');
        } else if ( puntosMinimos > 21 ){
            alert('PERDISTE, GANA COMPUTADORA')
        } else if ( puntosComputadora > 21 ){
            alert('HAS GANADO!!!');
        } else{
            alert('PERDISTE, GANA COMPUTADORA')
        }

    }, 40 );
}


//Eventos
btnPedir.addEventListener('click',() => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    puntos[0].innerText = puntosJugador;

    // <img class="carta" src="assets/cartas/2C.png"></img>
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if( puntosJugador > 21 ){
        console.warn('PERDISTE!!');
        btnPedir.disabled   = true;
        btnDetener.disabled = true;
        turnoComputador(puntosJugador);
        
    } else if ( puntosJugador === 21 ) {
        console.warn('GANASTE')
        btnPedir.disabled   = true;
        btnDetener.disabled = true;
        turnoComputador(puntosJugador);
    }
});

btnDetener.addEventListener('click', () =>{
    //alert('Detuviste el Juego.... ahora es turno de la computadora');
    btnPedir.disabled = true;
    turnoComputador(puntosJugador);
    btnDetener.disabled = true;
    //defineGanador(puntosComputadora, puntosJugador);
})

btnNuevo.addEventListener('click', () => {
    console.clear();
    deck = [];
    deck = crearDeck();

    puntosJugador = 0;
    puntosComputadora = 0;

    puntos[0].innerText=0;
    puntos[1].innerText=0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

    btnPedir.disabled   = false;
    btnDetener.disabled = false;
});


// function defineGanador(puntosComputadora, puntosJugador) {
//     const resultado = 
//         (puntosJugador > 21) ? alert('PERDISTE!, COMPUTADORA GANA') :
//         (puntosComputadora > 21) ? alert('HAS GANADO!!!') :
//         (puntosJugador === puntosComputadora) ? 'HAN EMPATADO!!!' :
//         (puntosJugador === 21 && puntosComputadora !== 21) ? alert('HAS GANADO!!!') :
//         (puntosJugador < 21 && puntosJugador > puntosComputadora) ? alert('HAS GANADO!!!') :
//         alert('PERDISTE!, COMPUTADORA GANA');
//         console.log(puntosComputadora, puntosJugador);
//     console.warn(resultado);
// }



