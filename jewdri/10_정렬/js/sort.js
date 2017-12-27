function ArrayList(){
    this.array = [];
    this.sortTime = 0;
}
ArrayList.prototype.insert = function(item){
    this.array.push(item);
}
ArrayList.prototype.toString = function(){
    return this.array.join();
}
ArrayList.prototype.bubbleSort = function(){
    this.sortTime = 0;
    var length = this.array.length;
    for(var i=0; i<length; i++){
        for(var j=0; j<length-1; j++){
            if(this.array[j] > this.array[j+1]){
                this._swap(j, j+1);
            }
            this.sortTime++;
        }
    }
}
ArrayList.prototype.modifiedBubbleSort = function(){
    this.sortTime = 0;
    var length = this.array.length;
    for(var i=0; i<length; i++){
        for(var j=0; j<length-1-i; j++){
            if(this.array[j] > this.array[j+1]){
                this._swap(j,j+1);
            }
            this.sortTime++;
        }
    }
}
ArrayList.prototype.selectionSort = function(){
    this.sortTime = 0;
    var length = this.array.length;
    var indexMin;
    for(var i=0; i<length-1; i++){
        indexMin = i;
        for(var j=i; j<length; j++){
            if(this.array[indexMin] > this.array[j]){
                indexMin = j;
            }
            if(i !== indexMin){
                this._swap(i, indexMin);
            }
            this.sortTime++;
        }
    }
}
ArrayList.prototype.insertionSort = function(){
    this.sortTime = 0;
    var length = this.array.length;
    var j, temp;
    for(var i=1; i<length; i++){
        j=i;
        temp = this.array[i];
        while(j>0 && this.array[j-1] > temp){
            this.array[j] = this.array[j-1];
            j--;
            this.sortTime++;
        }
        this.array[j] = temp;
    }
}
ArrayList.prototype.mergeSort = function(){
    this.array = this.mergeSortRec(this.array);
}
ArrayList.prototype.mergeSortRec = function(array){
    this.sortTime = 0;
    var length = array.length;
    if(length === 1){
        return array;
    }
    var mid = Math.floor(length/2);
    var left = array.slice(0,mid);
    var right = array.slice(mid,length);

    return this.merge(this.mergeSortRec(left), this.mergeSortRec(right));
}
ArrayList.prototype.merge = function(left,right){
    var result = [];
    var il = 0;
    var ir = 0;
    while(il < left.length && ir < right.length){
        if(left[il] < right[ir]){
            result.push(left[il++]);
        }else{
            result.push(right[ir++]);
        }
        this.sortTime++;
    }

    while(il < left.length){
        result.push(left[il++]);
        this.sortTime++;
    }
    while(ir < right.length){
        result.push(right[ir++]);
        this.sortTime++;
    }
    return result;
}
ArrayList.prototype._swap = function(index1, index2){
    var aux = this.array[index1];
    this.array[index1] = this.array[index2];
    this.array[index2] = aux;
}

//퀵정렬
ArrayList.prototype.quickSort = function(){
    this.sortTime = 0;
    this.quick(this.array, 0, this.array.length-1);
}
ArrayList.prototype.quick = function(array, left, right){
    var index;

    if(array.length > 1){
        index = this.partition(array, left, right);

        if(left < index-1){
            this.quick(array, left, index-1);
            this.sortTime++;
        }

        if(index < right){
            this.quick(array, index, right);
            this.sortTime++;
        }
    }
}
ArrayList.prototype.partition = function(array, left, right){
    var pivot = array[Math.floor((right+left)/2)];
    var i = left;
    var j = right;

    while(i <= j){
        while(array[i] < pivot){
            i++;
        }
        while(array[j] > pivot){
            j--;
        }
        if( i <= j){
            this.swapQuickSort(array, i, j);
            i++;
            j--;
        }
    }
    return i;
}
ArrayList.prototype.swapQuickSort = function(array, index1, index2){
    var aux = array[index1];
    array[index1] = array[index2];
    array[index2] = aux;
}