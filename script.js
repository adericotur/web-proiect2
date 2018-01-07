var persoane = [];

var nume_span;
var prenume_span;

var services = {
    persoane: null,
    catei: null
};

window.onload = function () {
    nume_span = document.getElementById('nume');
    prenume_span = document.getElementById('prenume');

    document.getElementById('buton-get').addEventListener("click", get_data);
    document.getElementById('buton-post').addEventListener("click", post_data);
    document.getElementById('buton-put').addEventListener("click", put_data);
    // document.getElementById('buton-delete').addEventListener("click", delete_data);


    services.persoane = PersoaneService();
    services.catei = CateiService();
};

function get_data(){

    services.persoane.get(function(data){
        console.table(data);
        for(var i=0; i<data.length; i++){
            createPersoanaElement(data[i]);
        }
    });


}
function post_data(){
    var mydata = {};
    mydata.nume = document.getElementById('input-nume').value;
    mydata.prenume = document.getElementById('input-prenume').value;

    services.persoane.post(mydata, function(response){
        createPersoanaElement(response);
    });

}
function put_data(){
    var mydata = {
        id: 4,
        nume: "Cordescu",
        prenume: "Octavian"
    };

    services.persoane.put(2, mydata, function(){});
}
function delete_data(){
    services.persoane.delete(1, function(){});
}



function createPersoanaElement(data){

    var outer_div = document.createElement("div");
    outer_div.setAttribute("class", "persoana");
    document.body.appendChild(outer_div);



    var prenume_span = document.createElement("span");
    prenume_span.innerHTML = data.prenume;
    outer_div.appendChild(prenume_span);
    prenume_span.addEventListener("click", function () {
       var prenume_input = document.createElement("input");
       prenume_input.value = prenume_span.innerText;

       outer_div.appendChild(prenume_input);
       outer_div.removeChild(prenume_span);
    });




    var nume_span = document.createElement("span");
    nume_span.innerHTML = "<strong> "+data.nume+"</strong>";
    outer_div.appendChild(nume_span);




    var buton = document.createElement("button");
    buton.innerHTML = "x";
    buton.addEventListener("click", function(){
        services.persoane.delete(data.id, function(){});
        document.body.removeChild(outer_div);
    });
    outer_div.appendChild(buton);

}