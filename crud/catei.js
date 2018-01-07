function CateiService(){
    var endpoint = 'http://localhost:3000/catei';

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

    function postObj() {

    }

    function putObj() {

    }

    function deleteObj() {

    }

    return res
}