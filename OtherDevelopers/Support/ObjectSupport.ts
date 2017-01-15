function idObject(){
    var lastStorageId = 0;

    this.Object.hash = function(object) {
        var hash = object.__id;

        if (!hash)
            hash = object.__id = lastStorageId++;

        return '#' + hash;
    };
}
export {idObject}