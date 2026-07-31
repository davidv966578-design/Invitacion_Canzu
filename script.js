// script.js — interacciones simples para la invitación
document.addEventListener('DOMContentLoaded', function(){
  const yes = document.getElementById('rsvp-yes');
  const no = document.getElementById('rsvp-no');

  yes.addEventListener('click', function(){
    const name = prompt('¿Cuál es tu nombre?');
    if(name){
      // Aquí podrías conectar con un formulario real o una API
      alert(`¡Gracias, ${name}! Tu asistencia ha sido registrada.`);
      yes.textContent = 'Confirmado';
      yes.disabled = true;
    } else {
      alert('No se registró un nombre. Intenta de nuevo si quieres confirmar.');
    }
  });

  no.addEventListener('click', function(){
    alert('Gracias por avisar. ¡Tal vez en otra ocasión!');
    no.textContent = 'No asistiré';
    no.disabled = true;
  });
});
