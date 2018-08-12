$(document).ready(function(){
    $("#btn-enviar").on('click', function(e){
      e.preventDefault();
        var nom = $("#nombreContacto").val();
        var asu = $("#asuntoContacto").val();
        var msj = $("#mensajeContacto").val();
        if(nom != "" && asu != "" && msj != ""){
            $.ajax({
                url: base_url + 'Contact/sendemail',
                method:'POST',
                data:$("#formulariocontacto").serialize(),
                dataType: 'text',
                success:function(res){
                  if (res == "ok") {
                    $("#alerta").removeClass('invisible');
                    $('#formulariocontacto')[0].reset();
                  } else {
                    alert('Error al enviar.');
                  }
                }
            });
        }else{
          alert('Por favor, llene todos los campos.');
        }
    });
});
