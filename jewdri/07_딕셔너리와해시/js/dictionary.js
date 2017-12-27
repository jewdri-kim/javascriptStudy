function Dictionary(){
   this.items = {};
   this.length = 0;
}

Dictionary.prototype.has = function(key){
    return key in this.items;
}
Dictionary.prototype.set = function(key, value){
    if(!this.has(key)){
        this.items[key] = value;
        this.length += 1;
        return true;
    }else
        return false;
}
Dictionary.prototype.remove = function(key){
    if(this.has(key)){
        delete this.items[key];
        this.length -= 1;
        return true;
    }
    return false;
}
Dictionary.prototype.get = function(key){
    return this.has(key) ? this.items[key] : undefined;
}
Dictionary.prototype.values = function(){
    var values = [];
    for(var k in this.items){
        if(this.has(k)){
            values.push(this.items[k]);
        }
    }
    return values;
}
Dictionary.prototype.keys = function(){
    var keys = [];
    for(var k in this.items){
        if(this.has(k)){
            keys.push(k);
        }
    }
    return keys;
}
Dictionary.prototype.clear = function(){
    this.items = {};
}
Dictionary.prototype.size = function(){
    return this.length;
}
Dictionary.prototype.getItems = function(){
    return this.items;
}