const abanico = document.getElementById("abanico");
const titulo = document.querySelector(".titulo");
const mensaje = document.getElementById("mensajeAbrir");
const musica = document.getElementById("musica");
const canvas = document.getElementById("petalos");
const ctx = canvas.getContext("2d");

// Precargar los 10 frames
const frames = [];
for (let i = 1; i <= 10; i++) {
    const img = new Image();
    img.src = `img/frame${i}.webp`;
    frames.push(img);
}

// Tiempos de cada frame en ms
const tiempos = [90, 70, 70, 70, 70, 70, 70, 70, 100, 70];
let iniciado = false;

function reproducirFrame(numero) {
    if (numero >= frames.length) {
        setTimeout(() => { iniciarPetalos(); }, 500);
        return;
    }
    abanico.src = frames[numero].src;
    setTimeout(() => { reproducirFrame(numero + 1); }, tiempos[numero]);
}

function iniciarInvitacion() {
    if (iniciado) return;
    iniciado = true;

    titulo.classList.add("ocultar");
    mensaje.classList.add("ocultar");

    musica.volume = 0.4;
    musica.play().catch(() => {});

    reproducirFrame(0);
}

abanico.addEventListener("click", iniciarInvitacion);

// SISTEMA DE PÉTALOS SAKURA
let listaPetalos = [];
let animandoPetalos = false;

function ajustarCanvas() {
    const t = abanico.getBoundingClientRect();
    canvas.width = t.width;
    canvas.height = t.height;
}
window.addEventListener("resize", ajustarCanvas);
window.addEventListener("load", ajustarCanvas);

class Petalo {
    constructor() { this.reiniciar(true); }

    reiniciar(inicio) {
        this.x = Math.random() * canvas.width;
        this.y = inicio? Math.random() * canvas.height : -20;
        this.tamaño = 7 + Math.random() * 9;
        this.velocidad = 0.7 + Math.random() * 0.7;
        this.viento = -0.6 + Math.random() * 1.2;
        this.rotacion = Math.random() * Math.PI * 2;
        this.giro = -0.02 + Math.random() * 0.04;
    }

    actualizar() {
        this.y += this.velocidad;
        this.x += this.viento;
        this.rotacion += this.giro;
        if (this.y > canvas.height + 30) { this.reiniciar(false); }
    }

    dibujar() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotacion);
        const t = this.tamaño;
        for (let i = 0; i < 5; i++) {
            ctx.save();
            ctx.rotate((Math.PI * 2 / 5) * i);
            ctx.beginPath();
            ctx.fillStyle = "rgba(255, 192, 220, 0.7)";
            ctx.moveTo(0, 0);
            ctx.ellipse(0, -t, t * 0.55, t, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
        ctx.beginPath();
        ctx.fillStyle = "rgba(255, 230, 180, 0.6)";
        ctx.arc(0, 0, t * 0.18, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function iniciarPetalos() {
    if (animandoPetalos) return;
    ajustarCanvas();
    animandoPetalos = true;
    for (let i = 0; i < 30; i++) { listaPetalos.push(new Petalo()); }
    animarPetalos();
}

function animarPetalos() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    listaPetalos.forEach(p => { p.actualizar(); p.dibujar(); });
    if (animandoPetalos) { requestAnimationFrame(animarPetalos); }
}