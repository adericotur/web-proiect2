function ProduseService(){
    var endpoint = 'http://localhost:3000/produse';

    var res = {
        get: getObj,
        post: postObj,
        put: putObj,
        delete: deleteObj
    };

    function getObj(response) {
        return getAjax(endpoint, function(data)
        {
            res = JSON.parse(data);
            response(res);
        });
    }

    function postObj(data, response) {
        return postAjax(endpoint, data, function(data){
            res = JSON.parse(data);
            response(res);
        });
    }

    function putObj(id, data, response) {
        return putAjax(endpoint+'/'+id, data, function(data){
            res = JSON.parse(data);
            response(res);
        });
    }

    function deleteObj(id, response) {
        return deleteAjax(endpoint+'/'+id, function(data){
            response(data);
        });
    }

    return res
}