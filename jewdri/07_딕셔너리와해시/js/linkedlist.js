function LinkedList(){
    this.length = 0;
    this.head = null;
}

var Node =  function(element){
        this.element = element;
        this.next = null;
}

LinkedList.prototype.append = function(element){
    var node = new Node(element);
    var current;

    if(this.head == null){
        this.head = node;
    }else{
        current = this.head;

        while(current.next){
            current = current.next;
        }
        current.next = node;
    }
    this.length++;
}

LinkedList.prototype.removeAt = function(position){
    if(position > -1 && position < this.length){
        var current = this.head;
        var previous;
        var index = 0;

        if(position === 0){
            this.head = current.next;
        }else{
            while(index++ < position){
                previous = current;
                current = current.next;
            }
            previous.next = current.next;
        }
        this.length--;

        return current.element;
    }else{
        return null;
    }
}
LinkedList.prototype.insert = function(position, element){

    if(position >= 0 && position <= this.length){
        var node = new Node(element);
        var current = this.head;
        var previous = 0;
        var index = 0;

        console.log('범위값');

        if(position === 0){
            node.next = current;
            this.head = node;
        }else{
            while(index++ < position){
                previous = current;
                current = current.next;
            }
            node.next = current;
            previous.next = node;
        }
        this.length++;
        return true;

    }else{
        console.log('범위값외');
        return false;
    }
}

LinkedList.prototype.remove = function(element){
    var index = this.indexOf(element);
    return this.removeAt(index);
}

LinkedList.prototype.indexOf = function(element){
    var current = this.head;
    var index = 0; //?책에서 -1은 오타?
    while(current){
        if(element === current.element){
            return index;
        }
        index++;
        current = current.next;
    }
    return -1;
}

LinkedList.prototype.isEmpty = function(){
    return this.length === 0;
}
LinkedList.prototype.size = function(){
    return this.length;
}

LinkedList.prototype.toString = function(){
    var current = this.head;
    var string = '';

    while(current){
        string += current.element+' ';
        current = current.next;
    }
    return string;
}

LinkedList.prototype.print = function(){
    console.log(this.toString());
}

LinkedList.prototype.getHead = function(){
    return this.head;
}

