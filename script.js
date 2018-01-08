var produse = [];

var nume_span;
var prenume_span;

var services = {
    produse: null
};

window.onload = function () {
    nume_span = document.getElementById('nume');
    prenume_span = document.getElementById('prenume');

    // document.getElementById('buton-get').addEventListener("click", get_data);
    document.getElementById('buton-post').addEventListener("click", post_data);


    services.produse = ProduseService();

    get_data();
};

function get_data(){

    document.getElementById('produse').innerHTML = "";

    services.produse.get(function(data){
        // console.table(data);
        for(var i=0; i<data.length; i++){
            createProdusElement(data[i]);
        }
    });


}
function post_data(){
    var mydata = {};
    mydata.nume = document.getElementById('input-nume').value;
    mydata.cantitate = document.getElementById('input-cantitate').value;
    mydata.um = document.getElementById('input-um').value;
    mydata.pret_unitar = document.getElementById('input-pret').value;
    mydata.image = document.getElementById('input-image').value ? document.getElementById('input-image').value : "https://www.hsjaa.com/images/joomlart/demo/default.jpg";

    services.produse.post(mydata, function(response){
        createProdusElement(response);

        document.getElementById('input-nume').value = "";
        document.getElementById('input-cantitate').value = "";
        // document.getElementById('input-um').value = "";
        document.getElementById('input-pret').value = "";
        document.getElementById('input-image').value = "";
    });

}




function createProdusElement(data){

    var outer_div = document.createElement("div");
    outer_div.setAttribute("class", "produs-container");
    document.getElementById('produse').appendChild(outer_div);


    // create image
    var div1 = document.createElement("div");
    div1.setAttribute('class', 'image');
    outer_div.appendChild(div1);
    var img = document.createElement("img");
    img.setAttribute("src", data.image);
    div1.appendChild(img);


    // create name
    var div2 = document.createElement("div");
    div2.setAttribute('class', 'name');

    var span2 = document.createElement('span');
    span2.innerHTML = "<strong>"+data.nume+"</strong>";
    div2.appendChild(span2);

    outer_div.appendChild(div2);
    span2.addEventListener('click', function(){
       var input2 = document.createElement("input");
       input2.setAttribute('value', data.nume);
       div2.innerHTML = "";
       div2.appendChild(input2);


        if( !('update' in outer_div.lastChild.classList)){
            var update_btn = document.createElement("button");
            update_btn.setAttribute('class', 'update');
            update_btn.innerHTML = "✓";
            update_btn.addEventListener("click", function(){
                var updated_data = data;
                updated_data.nume = input2.value;

                services.produse.put(data.id, updated_data, function(response){
                    div1.firstElementChild.setAttribute('src', response.image);

                    span2.innerHTML = "<strong>"+response.nume+"</strong>";
                    div2.removeChild(input2);
                    div2.appendChild(span2);

                    div3.innerHTML = response.cantitate + "<span>"+response.um+"</span>";
                    div4.innerHTML = response.pret_unitar + "RON / "+response.um;

                    outer_div.removeChild(update_btn);
                });
            });
            outer_div.appendChild(update_btn);
        }

    });


    // create quatity
    var div3 = document.createElement("div");
    div3.setAttribute('class', 'cantitate');
    // div3.innerHTML = data.cantitate + "<span> "+data.um+"</span>";
    var span3_1 = document.createElement('span');
    span3_1.innerHTML = data.cantitate;
    div3.appendChild(span3_1);

    var span3_2 = document.createElement('span');
    span3_2.innerHTML = data.um;
    div3.appendChild(span3_2);

    outer_div.appendChild(div3);


    // create price
    var div4 = document.createElement("div");
    div4.setAttribute('class', 'pret');
    div4.innerHTML = data.pret_unitar + "RON / "+data.um;
    outer_div.appendChild(div4);


    // remove button
    var rem_btn = document.createElement("button");
    rem_btn.setAttribute('class', 'remove');
    rem_btn.innerHTML = "x";
    rem_btn.addEventListener("click", function(){
        services.produse.delete(data.id, function(){});
        document.getElementById('produse').removeChild(outer_div);
    });
    outer_div.appendChild(rem_btn);

}