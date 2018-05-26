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
        this.table[position] = new LinkedList();
    }
    this.table[position].append(new ValuePair(key,value));
}
HashTable.prototype.get = function(key){
    var position = this._loseloseHasnCode(key);

    if(this.table[position] !== undefined){
        var current = this.table[position].getHead();
        while(current.next){
            if(current.element.key === key){
                return current.element.value;
            }
            current = current.next;
        }
        //처음이나 마지막 원소일 경우
        if(current.element.key === key){
            return current.element.value;
        }

    }
    return undefined;
}
HashTable.prototype.remove = function(key){
    var position = this._loseloseHasnCode(key);

    if(this.table[position] !== undefined){
        var current = this.table[position].getHead();
        while(current.next){
            if(current.element.key === key){
                this.table[position].remove(current.element);
                if(this.table[position].isEmpty()){
                    this.table[position] = undefined;
                }
                return true;
            }
            current = current.next;
        }
        //처음이나 마지막 원소일 경우
        if(current.element.key === key){
            this.table[position].remove(current.element);
            if(this.table[position].isEmpty()){
                this.table[position] = undefined;
            }
            return true;
        }
    }
    return false;
}

HashTable.prototype.print = function(){
    for(var i=0; i<this.table.length; i++){
        if(this.table[i] !== undefined){
            console.log(i+':'+this.table[i]);
        }
    }
}
/* 체이닝 기법 */
function ValuePair(key, value){
    this.key = key;
    this.value = value;
}

ValuePair.prototype.toString = function(){
    return '['+this.key+'-'+this.value+']';

}