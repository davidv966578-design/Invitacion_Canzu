/*=========================================
      INVITACIÓN SAKURA
      SCRIPT PRINCIPAL
==========================================*/

const abanico = document.getElementById("abanico");
const titulo = document.querySelector(".titulo"); // CAMBIO: era pantallaInicio
const mensaje = document.getElementById("mensajeAbrir");
const textoInvitacion = document.getElementById("textoInvitacion");
const musica = document.getElementById("musica");
const canvas = document.getElementById("petalos");
const ctx = canvas.getContext("2d");

/*=========================================
              FRAMES DEL ABANICO
==========================================*/

const frames = [
"imagenes/frame1.png", // CAMBIO: unifiqué a imagenes/
"imagenes/frame2.png",
"imagenes/frame3.png",
"imagenes/frame4.png",
"imagenes/frame5.png",
"imagenes/frame6.png",
"imagenes/frame7.png",
"imagenes/frame8.png",
"imagenes/frame9.png",
"imagenes/frame10.png"
];

const tiempos = [
300,300,300,300,300,300,300,300,400,300
];

let iniciado = false;

/*=========================================
              ANIMACIÓN ABANICO
==========================================*/

function reproducirFrame(numero){
    if(numero >= frames.length){
        // pequeña pausa antes de revelar texto
        setTimeout(()=>{
            textoInvitacion.style.opacity="1";
            textoInvitacion.style.transform = "translate(-50%,-50%)";
            iniciarPetalos();
        }, 300); // le di 300ms para que se vea mejor
        return;
    }

    abanico.src = frames[numero];

    setTimeout(()=>{
        reproducirFrame(numero+1);
    }, tiempos[numero]);
}

/*=========================================
              INICIO
==========================================*/

function iniciarInvitacion(){
    if(iniciado) return;
    iniciado=true;

    // ocultar texto inicial
    titulo.classList.add("ocultar");
    mensaje.classList.add("ocultar");

    // activar música
    musica.volume = 0.7;
    musica.play().catch(()=>{});

    // comenzar apertura
    reproducirFrame(0);
}

abanico.addEventListener("click", iniciarInvitacion);

/*=========================================
              PETALOS SAKURA
==========================================*/

let listaPetalos=[];
let animandoPetalos=false;

function ajustarCanvas(){
    const tamaño = abanico.getBoundingClientRect();
    canvas.width = tamaño.width;
    canvas.height = tamaño.height;
}

window.addEventListener("resize", ajustarCanvas);
window.addEventListener("load", ajustarCanvas); // NUEVO: para que mida bien al cargar

class Petalo{
    constructor(){
        this.reiniciar(true);
    }
    reiniciar(inicio){
        this.x = Math.random()*canvas.width;
        this.y = inicio? Math.random()*canvas.height : -20;
        this.tamaño = 5 + Math.random()*9;
        this.velocidad = 0.5 + Math.random()*0.5;
        this.viento = -0.6 + Math.random()*1.2;
        this.rotacion = Math.random()*Math.PI*2;
        this.giro = -0.03 + Math.random()*0.06;
    }
    actualizar(){
        this.y += this.velocidad;
        this.x += this.viento;
        this.rotacion += this.giro;
        if(this.y > canvas.height + 30){
            this.reiniciar(false);
        }
    }
    dibujar(){
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotacion);
        const tamaño = this.tamaño;
        for(let i = 0; i < 5; i++){
            ctx.save();
            ctx.rotate((Math.PI * 2 / 5) * i);
            ctx.beginPath();
            ctx.fillStyle = "rgba(255,185,215,0.613)";
            ctx.moveTo(0,0);
            ctx.ellipse(0, -tamaño, tamaño * 0.55, tamaño, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
        ctx.beginPath();
        ctx.fillStyle = "rgba(255,220,150,0.53)";
        ctx.arc(0, 0, tamaño*0.18, 0, Math.PI*2);
        ctx.fill();
        ctx.restore();
    }
}

function iniciarPetalos(){
    if(animandoPetalos) return;
    ajustarCanvas();
    animandoPetalos=true;
    for(let i=0; i<35; i++){
        listaPetalos.push(new Petalo());
    }
    animarPetalos();
}

function animarPetalos(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    listaPetalos.forEach(petalo=>{
        petalo.actualizar();
        petalo.dibujar();
    });
    if(animandoPetalos){
        requestAnimationFrame(animarPetalos);
    }
                        }
