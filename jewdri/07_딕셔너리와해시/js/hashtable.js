function HashTable(){
    this.table = [];
}

HashTable.prototype._loseloseHasnCode = function(key){
    var hash = 0;
    for(var i=0; i<key.length; i++){
        hash += key.charCodeAt(i);
    }
    return hash%37;
}

HashTable.prototype.put = function(key, value){
    var position = this._loseloseHasnCode(key);
    console.log(position+'-'+key);
    this.table[position] = value;
}
HashTable.prototype.get = function(key){
    return this.table[this._loseloseHasnCode(key)];
}
HashTable.prototype.remove = function(key){
    this.table[this._loseloseHasnCode(key)] = undefined;
}