calendariojim = {

constantes : {
        meses: ['Enero','Febrero','Marzo',
                'Abril','Mayo','Abril',
                'Junio','Julio','Agosto'
                ,'Septiembre','Octubre'
                ,'Noviembre','Diciembre'],
        
        mesesCorto: ['Ene','Feb','Mar',
                    'Abr','May','Abr',
                    'Jun','Jul','Agos'
                    ,'Sept','Oct'
                    ,'Nov','Dic'],

        semana: ['Lunes','Martes','Miercoles',
                'Jueves','Viernes','Sabado','Domingo'],
        
        semanaCorta:['L','M','X','J','V','S','D'],
        
        formatoFecha: 'dd/mm/yyyy',

        fechaSeleccionada: new Date(new Date().getFullYear(), new Date().getMonth(),new Date().getDate()),

        

        sabado:5,
        domingo:6
},

classes :{
    FECHA_SELECCIONADA: 'fechaseleccionada',
    TABLA: 'jim-tabla',
    FECHA_ACTUAL: 'fechaactual',
    FIN_DE_SEMANA: 'findesemana'
},


Calendario:function(padre){

var wrapper = document.getElementById(padre);
this.CrearCalendario(wrapper);




},



CrearCalendario:function(wrapper){
    var fecha = new Date();
    var diaActual = fecha.getDay();
    var mesAtual =  fecha.getMonth();
    var anioActual = fecha.getFullYear();
    var nodoTabla = document.createElement('table');
    var totalDiasMes = this.ObtenerDiasMes(mesAtual,anioActual);

    nodoTabla.classList.add('jim-tabla')
    this.CrearCabecera(nodoTabla);

   
    
    
    nodoRow = document.createElement('tr');
    nodoCel = document.createElement('th');
    nodoTabla.appendChild(nodoRow);
    wrapper.appendChild(nodoTabla);
    var posicionactual = 1;
    var diasemanaActual = 1;
    var terminar = false;
    
    
    
    while(posicionactual<totalDiasMes){
        console.log(this.constantes.fechaSeleccionada);
        var filames = this.CrearFila();
        var row = document.createElement('tr');
        for(var i=0; i<7; i++){
           
            
            if(i===this.ObtenerDiaSemana(anioActual,mesAtual,posicionactual ) && posicionactual <= totalDiasMes){
               
                var diatexto = document.createTextNode(posicionactual);
                filames[i].appendChild(diatexto);

                //añadir eventos click
                filames[i].addEventListener('click', this.eventoClickDia, false);


                //Días fin de semana
                if(i===this.constantes.sabado || i===this.constantes.domingo){
                    filames[i].classList.add(this.classes.FIN_DE_SEMANA);
                }
                //Día actual
                if(this.EsHoy(anioActual,mesAtual,posicionactual)){
                    filames[i].classList.add(this.classes.FECHA_ACTUAL);
                }
                if(this.EsDiaSeleccionado(anioActual,mesAtual,posicionactual)){
                    filames[i].classList.add(this.classes.FECHA_SELECCIONADA);
                }
                posicionactual++;
                
            }
            row.appendChild(filames[i]);
        }
        nodoTabla.appendChild(row);
        
         
    } 
},
CrearCabecera:function(table){
    var row = document.createElement('thead');
    for(var i=0;i<7;i++){
        var cell = document.createElement('th');
        var texto = document.createTextNode(this.constantes.semanaCorta[i]);
        cell.appendChild(texto);
        row.appendChild(cell);
    }
    table.appendChild(row);
},

eventoClickDia:function (event){
    console.log('click');
    //eliminamos la fecha seleccionada y selecionamos la nueva
    console.log(this.classes.FECHA_SELECCIONADA);
   var fecselec =  document.getElementsByClassName(this.classes.FECHA_SELECCIONADA); 
   fecselec[0].classList.remove(this.classes.FECHA_SELECCIONADA);
   //seleccionamos la nueva
   this.classList.add(this.classes.FECHA_SELECCIONADA);

},
EsHoy:function(anio,mes,dia){
    var fecha = new Date(anio,mes,dia);
    var fechaactual = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate());
    return (fechaactual.getFullYear()===anio && fechaactual.getMonth()===mes && fechaactual.getDate() === dia);
},

CrearFila: function(){
    var fila = []
    for(var i=0; i<7;i++){
        fila[i] = document.createElement('td'); 
    }
    return fila;
},

CompletarZero:function(numero,tamanio){
    var patron  = '000000000000000';
    
    if(tamanio<0){
        patron = patron + numero.toString();
    }else{
        patron =  numero.toString() + patron;
    }
    
    var totalCadena = patron.length;
    if(tamanio<0){
        return patron.substring(totalCadena+tamanio,totalCadena);
    }else{
        return patron.substring(0,tamanio);
    }
    
     
},

 ObtenerDiasMes : function(month,year) {
    
    return new Date(year, month, 0).getDate()+1;
  
  },
  ObtenerDiaSemana:function(year,month,day){
   
    var diasemana = new Date(year, month, day).getDay();
    diasemana = diasemana-1;
    if(diasemana<0) diasemana = 6;
    return diasemana;

  },
  EsDiaSeleccionado:function(anio,mes,dia){
    return this.constantes.fechaSeleccionada.getFullYear() === anio 
            && this.constantes.fechaSeleccionada.getMonth() === mes
           && this.constantes.fechaSeleccionada.getDate() === dia;
  }


}