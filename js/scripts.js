$(document).ready(function(){
  $(window).scroll(function(){
    if(this.scrollY > 20) 
      $(".navbar").addClass("sticky");
    else
      $(".navbar").removeClass("sticky");
  });

  $('.menu-toggler').click(function(){
    $(this).toggleClass("active");
    $(".navbar-menu").toggleClass("active");
  });
});

function Contact(obj) {
  this.nombre = obj.nombre;
  this.correo = obj.correo;
  this.mensaje = obj.mensaje;
}

/*Conexion a API REST */
function guardardatos(){
  //Almacenamos la petición ajax en la variable request.
   nombre = document.getElementById('nombre').value
   correo = document.getElementById('correo').value
   mensaje = document.getElementById('mensaje').value

    console.log("nombre: ",nombre);
    console.log("correo: ",correo);
    console.log("mensaje: ",mensaje);
    
    var contacto = new Contact({
      nombre: nombre,
      correo: correo,
      mensaje: mensaje
    });
  
    var datos = JSON.stringify(contacto);
    console.log(datos);
    
    var datosenviar = JSON.parse(datos);
    console.log(datosenviar);

  var RUTA_SERVIDOR = "https://appanalitycs.azurewebsites.net/api/contact/v1/GuardaContacto";

   console.log(RUTA_SERVIDOR);
   
  
    postData(RUTA_SERVIDOR, contacto)
    .then(data => {
      console.log(data); 
      popupmsg(data.msg);
    })
    .catch(error =>{
      console.log(error); 
      popupmsg(error.msg);
    });

} 

/*Aplicando FETCH*/
async function postData(url = '', data = {}) {

  const response = await fetch(url,{
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    
    body: JSON.stringify(data) 
  });
  return response.json();
}

/* Mensaje a FrontEnd */
function popupmsg(texto) {
  var popup = document.getElementById("myPopup");
  document.getElementById('nombre').value = '';
  document.getElementById('correo').value = '';
  document.getElementById('mensaje').value = '';
   
  remove(popup);
  
  popup.appendChild( document.createTextNode(texto) );
  popup.classList.toggle("show");

}

function remove(popup){
  while( popup.firstChild ) {
    popup.removeChild( popup.firstChild );
  }
}

