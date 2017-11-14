function Set(){
   this.items = {};
}
/*
Set.prototype.has = function(value){
    return value in this.items;
}*/
Set.prototype.has = function(value){
    return this.items.hasOwnProperty(value);
}
Set.prototype.add = function(value){
    if(!this.has(value)){
        this.items[value] = value;
        return true;
    }
    return false;
}
Set.prototype.remove = function(value){
    if(this.has(value)){
        delete this.items[value];
        return true;
    }
    return false;
}

Set.prototype.clear = function(){
    this.items = {};
}
Set.prototype.size = function(){
    return Object.keys(this.items).length;
}
/* 상품검색때문에 생성 */
Set.prototype.setArry = function(){
    return Object.keys(this.items);
}

/* IE9 이상 */
Set.prototype.sizeLegacy = function(){
    var count = 0;
    for(var prop in this.items){
        if(this.items.hasOwnProperty(prop)) ++count;
    }
    return count;
}

/*최신 브라우저만 */
Set.prototype.values = function(){
    return Object.keys(this.items);
}
Set.prototype.valueLegacy = function(){
    var keys = [];
    for(var key in this.items){
        keys.push(key);	//여기 hasOwnproperty를 해야하지않나. 
    }
    return keys;
}

/* 합집합 */
Set.prototype.union = function(otherSet){
    var unionSet = new Set();
    var values =  this.values();
    for(var i=0; i<values.length; i++){
        unionSet.add(values[i]);
    }
    values =  otherSet.values();
     for(var i=0; i<values.length; i++){
        unionSet.add(values[i]);
    }
    return unionSet;
}
/* 교집합 */
Set.prototype.intersection = function(otherSet){
    var intersectionSet = new Set();
    var values = this.values();
    for(var i=0; i<values.length; i++){
        if(otherSet.has(values[i])){
            intersectionSet.add(values[i]);
        }
    }
    return intersectionSet;
}
/* 차집합 */
Set.prototype.difference = function(otherSet){
    var differenceSet = new Set();
    var values = this.values();
    for(var i=0; i<values.length; i++){
        if(!otherSet.has(values[i])){
            differenceSet.add(values[i]);
        }
    }
    return differenceSet;
}
/* 부분집합 */
Set.prototype.subset = function(otherSet){
    if(this.size() > otherSet.size()){
        return false;
    }else{
        var values = this.values();
        for(var i=0; i<values.length; i++){
            if(!otherSet.has(values[i])){
                return false;
            }
        }
        return true;
    }
}
