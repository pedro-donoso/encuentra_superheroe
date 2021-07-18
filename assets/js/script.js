$(document).ready(function(){
    $('.btn').click( () => {
        var my_heroe = $('.heroe').val();
        
        let resultados = validar(my_heroe);

        if(resultados == true){
            $('.resulta'); 
            pedidos(my_heroe);
        }
    });

    function validar(my_heroe){
        let validacion = true;

        const codigos = new RegExp(/^[0-9]+$/, "gm");

        if(codigos.test(my_heroe) == false || my_heroe < 1 || my_heroe > 731){
            validacion = false;
            alert('solo busquedas desde 1 hasta 731');
        }

        return validacion;
    }
    
    function pedidos(my_heroe){
  
        $.ajax({
            type: 'GET',
            url: `https://superheroapi.com/api.php/10225249018669196/${my_heroe}`,
            dataType: 'json',
            success: function(data){
                $('.imagen').html(`<img src="${data.image.url}" class="card-img" alt="hero">`);
                  $('.heroe__nombre').text(data.name);
               $('.heroe__completo').text(`Nombre completo: ${data.biography['full-name']}`);
     
                              $('.heroe__alias').text(`Alias: ${data.biography.aliases}`);
                $('.heroe__peso').text(`Peso: ${data.appearance.weight}`);
                $('.heroe__altura').text(`Altura: ${data.appearance.height}`);
                $('.heroe__aparicion').text(`Primera aparición: ${data.biography['first-appearance']}`);
                $('.heroe__ocupacion').text(`Ocupación: ${data.work.occupation}`);
                             $('.heroe__publisher').text(`Publicado por: ${data.biography.publisher}`);
                $('.heroe__conexiones').text(`Conexiones: ${data.connections['group-affiliation']}`);
   
             
                $('.heroe__genero').text(`Genero: ${data.appearance['gender']}`);
                $('.heroe__raza').text(`Raza: ${data.appearance['race']}`);
                $('.heroe__ojos').text(`Ojos: ${data.appearance['eye-color']}`);
                $('.heroe__pelo').text(`Pelo: ${data.appearance['hair-color']}`);

                let chart = new CanvasJS.Chart("chartContainer", {
                        title:{
                            text: `Estadísticas de Poder de ${data.name}:`
                        },
                        data: [
                            {
                                type: "doughnut",
                                showInLegend: false,
                                legendText: "{indexLabel}",
                                dataPoints: [
                                    { y: `${data.powerstats.intelligence}`, indexLabel: "Inteligencia" },
                                    { y: `${data.powerstats.strength}`, indexLabel: "Fuerza" },
                                    { y: `${data.powerstats.speed}`, indexLabel: "Velocidad" },
                                    { y: `${data.powerstats.durability}`, indexLabel: "Durabilidad"},
                                    { y: `${data.powerstats.power}`, indexLabel: "Energía" },
                                    { y: `${data.powerstats.combat}`, indexLabel: "Combate"}
                                ]
                            }
                        ]
                });
                chart.render();
            },
            error: function(error){
                alert(`Error: ${error}`);
            }
        });
    }
});