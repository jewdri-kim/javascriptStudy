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

    if(this.table[position] == undefined){
        this.table[position] = new ValuePair(key,value);
    }else{
        var index = ++position;
        while(this.table[index] != undefined){
            index++;
        }
        this.table[index] = new ValuePair(key, value);
    }
}
HashTable.prototype.get = function(key){
    var position = this._loseloseHasnCode(key);

    if(this.table[position] !== undefined){
        if(this.table[position].key === key){
            return this.table[position].value;
        }else{
            var index = ++position;
            while(this.table[index] === undefined || this.table[index].key !== key){
                index++;
            }
            if(this.table[index].key === key){
                return this.table[index].value;
            }
        }
    }
    return undefined;
}
HashTable.prototype.remove = function(key){
    var position = this._loseloseHasnCode(key);

    if(this.table[position] !== undefined){
        if(this.table[position].key === key){
            this.table[index] = undefined;
        }else{
            var index = ++position;
            while(this.table[index] === undefined || this.table[index].key !== key){
                index++;
            }
            if(this.table[index].key === key){
                this.table[index] = undefined;
            }
        }
    }
    return undefined;
}
HashTable.prototype.print = function(){
    for(var i=0; i<this.table.length; i++){
        if(this.table[i] !== undefined){
            console.log(i+':'+this.table[i]);
        }
    }
}
function ValuePair(key, value){
    this.key = key;
    this.value = value;
}

ValuePair.prototype.toString = function(){
    return '['+this.key+'-'+this.value+']';

}