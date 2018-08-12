$(document).ready( function(){
  var urlp = "/contador-productos";
  var urlc = "/contador-categorias";
  var urlm = "/contador-marcas";
  var urlpr = "/contador-proveedores";
	var urlup = "/ultimo-producto";
	var urluv = "/ultima-venta";

	$.getJSON(urlp, null, function(data){
	  $('#countProductos').html(data);
	});

  $.getJSON(urlc, null, function(data){
	  $('#countCategorias').html(data);
	});

  $.getJSON(urlm, null, function(data){
	  $('#countMarcas').html(data);
	});

  $.getJSON(urlpr, null, function(data){
	  $('#countProveedores').html(data);
	});

	$.getJSON(urlup, null, function(data){
	  $('#lastproduct').html(data.nom_prod);
	});

	$.getJSON(urluv, null, function(data){
	  $('#lastsale').html(data.total_venta);
	});

  var urlc = "/combobox-categorias";
	var urlm = "/combobox-marcas";
	var urlp = "/combobox-proveedores";
	// Populate dropdown with list of provinces
	$.getJSON(urlc, null, function(data){
	  $.each(data, function (i, item) {
	    $('#nuevo-categ-p').append('<option value="'+ item.id_categ +'">'+ item.nom_categ +'</option>');

			$('#edit-categ-p').append('<option value="'+ item.id_categ +'">'+ item.nom_categ +'</option>');
	  })
	});
	$.getJSON(urlm, null, function(data){
	  $.each(data, function (i, item) {
	    $('#nuevo-marca-p').append('<option value="'+ item.id_marca +'">'+ item.nom_marca +'</option>');
			$('#nuevo-marca-prov').append('<option value="'+ item.id_marca +'">'+ item.nom_marca +'</option>');

			$('#edit-marca-p').append('<option value="'+ item.id_marca +'">'+ item.nom_marca +'</option>');
	  })
	});
	$.getJSON(urlp, null, function(data){
	  $.each(data, function (i, item) {
	    $('#nuevo-prov-p').append('<option value="'+ item.id_prov +'">'+ item.nom_prov +'</option>');

			$('#edit-prov-p').append('<option value="'+ item.id_prov +'">'+ item.nom_prov +'</option>');
	  })
	});

  
    $('#categoriestable').DataTable({
      "processing": true,
      "serverSide": true,
      "ajax": "api/categories",
      "bLengthChange": true,
      "columns": [
        {data: "id_categ"},
        {data: "nom_categ"},
        {data: "desc_categ"},
        {"render": function(data, type, row) {
          return '<button type="button" class="btn btn-danger btn-sm" data-toggle="modal" data-target="#deleteModal" name="btn-to-delete" onClick="deleteCategoria(\''+row.nom_categ+'\');"><i class="far fa-trash-alt"></i></button>';
        }}
      ],
    });

    $('#brandstable').DataTable({
      "processing": true,
      "serverSide": true,
      "ajax": "api/brands",
      "bLengthChange": true,
      "columnDefs": [
        { "width": "5%", "targets": 0 },
        { "width": "5%", "targets": 4 }
      ],
      "columns": [
        {data: "id_marca"},
        {data: "nom_marca"},
        {data: "tel_marca"},
        {data: "web_marca"},
        {"render": function(data, type, row) {
          return '<button type="button" class="btn btn-danger btn-sm" data-toggle="modal" data-target="#deleteMarcaModal" name="btn-to-delete" onClick="deleteMarca(\''+row.nom_marca+'\');"><i class="far fa-trash-alt"></i></button>';
        }}
      ],
    });

    $('#productstable').DataTable({
      "processing": true,
      "serverSide": true,
      "ajax": "api/products",
      "bLengthChange": true,
      "columns": [
        {data: "id_prod"},
        {data: "nom_prod"},
        {data: "cant_prod"},
        {data: "precio_prod"},
        {data: "fechai_prod"},
        {data: "nom_categ"},
        {data: "nom_marca"},
        {data: "nom_prov"},
        {"render": function(data, type, row) {
          return '<button type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#editModalProducts" name="" onClick="editModal(\''+row.id_prod+'\', \''+row.nom_prod+'\', \''+row.cant_prod+'\', \''+row.precio_prod+'\', \''+row.fechai_prod+'\', \''+row.nom_categ+'\', \''+row.nom_marca+'\', \''+row.nom_prov+'\',);"><i class="far fa-edit"></i></button> '
          + '<button type="button" class="btn btn-danger btn-sm" data-toggle="modal" data-target="#deleteModal" name="" onClick="deleteProducto(\''+row.nom_prod+'\');"><i class="far fa-trash-alt"></i></button>';
        }}
      ],
    });

    $('#providerstable').DataTable({
      "processing": true,
      "serverSide": true,
      "ajax": "api/providers",
      "bLengthChange": true,
      "columnDefs": [
        { "width": "5%", "targets": 0 },
        { "width": "5%", "targets": 5 }
      ],
      "columns": [
        {data: "id_prov"},
        {data: "nom_prov"},
        {data: "tel_prov"},
        {data: "email_prov"},
        {data: "nom_marca"},
        {"render": function(data, type, row) {
          return '<button type="button" class="btn btn-danger btn-sm" data-toggle="modal" data-target="#deleteModal" name="btn-to-delete" onClick="deleteProveedor(\''+row.nom_prov+'\');"><i class="far fa-trash-alt"></i></button>';
        }}
      ],
    });

    $('#userstable').DataTable({
      "processing": true,
      "serverSide": true,
      "ajax": "api/users",
      "bLengthChange": true,
      //Esto es para el tamaño de las columnas, el 0 y el 4 son las primera y última columna
      "columnDefs": [
        { "width": "5%", "targets": 0 },
        { "width": "13%", "targets": 4 }
      ],
      "columns": [
        {data: "id"},
        {data: "name"},
        {data: "lastname"},
        {data: "email"},
        {"render": function(data, type, row) {
          return '<button type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#editModalUsers" name="btn-to-update" onClick="editModal(\''+row.name+'\', \''+row.lastname+'\', \''+row.email+'\');"><i class="far fa-edit"></i></button> '
          + '<button type="button" class="btn btn-danger btn-sm" data-toggle="modal" data-target="#deleteModal" name="btn-to-delete" onClick="deleteModal(\''+row.name+'\');"><i class="far fa-trash-alt"></i></button>';
        }}
      ],
    });
});

deleteCategoria = function(nom){
 $('#preguntaBorrarCategoria').html(nom);
 $('#hd-categ').val(nom);
}

deleteMarca = function(nom){
  $('#borrarMarca').html(nom);
  $('#hd-marca').val(nom);
}

deleteProducto = function(nom){
  $("#preguntaBorrarProd").html(nom);
  $("#hd-prod").val(nom);
}

editModal = function(id, nom, cant, precio, fecha, categ, prove, marca){
  $("#edit-id-p").val(id);
  $("#edit-nombre-p").val(nom);
  $("#edit-cant-p").val(cant);
  $("#edit-precio-p").val(precio);
  $("#edit-fecha-p").val(fecha);
  $("#edit-categ-p option:selected").val(categ);
  $("#edit-marca-p option:selected").val(marca);
  $("#edit-prov-p option:selected").val(prove);
}

deleteProveedor = function(nom){
  $('#preguntaBorrarProv').html(nom);
  $('#hd-prov').val(nom);
}

editModal = function(nom, apel, email){
  $("#edit-nombre-u").val(nom);
  $("#edit-apellido-u").val(apel);
  $("#edit-email-u").val(email);
}
