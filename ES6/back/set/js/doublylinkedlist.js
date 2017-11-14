function DoublyLinkedList(){
    this.length = 0;
    this.head = null;
    this.tail = null;   //new
}

var Node =  function(element){
    this.element = element;
    this.next = null;
    this.prev = null;   //new
}

DoublyLinkedList.prototype.append = function(element){
    var node = new Node(element);
    var current;

    if(this.head == null){
        this.head = node;
        this.tail = node; //new
    }else{
        current = this.head;

        while(current.next){
            current = current.next;
        }
        current.next = node;
        node.prev = current;
        this.tail = node;
    }
    this.length++;
}

DoublyLinkedList.prototype.removeAt = function(position){
    if(position > -1 && position < this.length){
        var current = this.head;
        var previous;
        var index = 0;

        if(position === 0){
            this.head = current.next;
            //new 원소 하나인 경우
            if(this.length === 1){
                this.tail = null;
            }else{
                this.head.prev = null;
            }

        }else if(position == this.length-1){    //new 마지막원소
            current = this.tail;
            this.tail = current.prev;
            this.tail.next = null;

        }else{
            while(index++ < position){
                previous = current;
                current = current.next;
            }
            previous.next = current.next;
            current.next.prev = previous;   //new
        }
        this.length--;

        return current.element;
    }else{
        return null;
    }
}
DoublyLinkedList.prototype.insert = function(position, element){

    if(position >= 0 && position <= this.length){
        var node = new Node(element);
        var current = this.head;
        var previous = 0;
        var index = 0;

        if(position === 0){
            if(!this.head){         //new
                this.head = node;
                this.tail = node;
            }else{
                node.next = current;
                current.prev = node;    ///new
                this.head = node;
            }
        }else if (position == this.length){     //new //마지막
            console.log('꼬리'+this.tail);
            current = this.tail;
            current.next = node;
            node.prev = current;
            this.tail = node;
        }else{
            while(index++ < position){
                previous = current;
                current = current.next;
            }
            node.next = current;
            previous.next = node;
            current.prev = node;    //new
            node.prev = previous;   //new
        }
        this.length++;
        return true;

    }else{
        console.log('범위값외');
        return false;
    }
}

DoublyLinkedList.prototype.remove = function(element){
    var index = this.indexOf(element);
    return this.removeAt(index);
}

DoublyLinkedList.prototype.indexOf = function(element){
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

DoublyLinkedList.prototype.isEmpty = function(){
    return this.length === 0;
}
DoublyLinkedList.prototype.size = function(){
    return this.length;
}

DoublyLinkedList.prototype.toString = function(){
    var current = this.head;
    var string = '';

    while(current){
        string += current.element+' ';
        current = current.next;
    }
    return string;
}

DoublyLinkedList.prototype.print = function(){
    console.log(this.toString());
}

DoublyLinkedList.prototype.getHead = function(){
    return this.head;
}

