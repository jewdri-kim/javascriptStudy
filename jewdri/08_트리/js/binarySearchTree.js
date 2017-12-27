var Node = function(key){
    this.key = key;
    this.left = null;
    this.right = null;
}

function BinarySearchTree(area){
    this.root = null;
    this.area = $(area);
    this.depth = null;
}
// 트리에 키 삽입하기
BinarySearchTree.prototype.insert = function(key){
    var newNode = new Node(key);

    if(this.root === null){
        this.root = newNode;
    }else{
        this._insertNode(this.root, newNode);
    }
}
BinarySearchTree.prototype._insertNode = function(node, newNode){
    if(newNode.key < node.key){
        if(node.left === null){
            node.left = newNode;
        }else{
            this._insertNode(node.left, newNode);
        }
    }else{
        if(node.right === null){
            node.right = newNode;
        }else{
            this._insertNode(node.right, newNode);
        }
    }
}
BinarySearchTree.prototype.printNode = function(value,type){
    console.log(value,type);
}

//트리순회 - 중위순회
BinarySearchTree.prototype.inOrderTraverse = function(callback){
    this.inOrderTraverseNode(this.root,callback,'root');
}
BinarySearchTree.prototype.inOrderTraverseNode = function(node, callback,type){
    if(node != null){
        this.inOrderTraverseNode(node.left, callback,'left');
        callback(node.key,type);
        this.inOrderTraverseNode(node.right, callback,'right');
    }

}
//트리순회 - 전위순회
BinarySearchTree.prototype.preOrderTraverse = function(callback){
    this.preOrderTraverseNode(this.root,callback,'root');
}
BinarySearchTree.prototype.preOrderTraverseNode = function(node, callback, type){
    if(node != null){
        callback(node.key,type);
        this.preOrderTraverseNode(node.left,callback,'left');
        this.preOrderTraverseNode(node.right,callback,'right');
    }
}
//트리순회 - 후위순회
BinarySearchTree.prototype.postOrderTraverse = function(callback){
    this.postOrderTraverseNode(this.root, callback,'root');
}
BinarySearchTree.prototype.postOrderTraverseNode = function(node, callback, type){
    if(node != null){
        this.postOrderTraverseNode(node.left, callback,'left');
        this.postOrderTraverseNode(node.right, callback,'right');
        callback(node.key,type);
    }
}
//트리그리기
/*
BinarySearchTree.prototype.treeView = function(){
    var tag = '<ol class="tree"><li class="depth0"><span>'+this.root.key+'</span></li></ol>';
    this.area.append(tag);
    this.treeViewNode(this.root,0);
    this.depth = 0;
}
BinarySearchTree.prototype.treeViewNode = function(node,depStep){
    var Uidepth = depStep + 1;
    var depthClass = 'depth'+Uidepth;
    var tag = '<ol class="'+depthClass+'">';
    if(node.left != null){
        tag += '<li class="'+depthClass+'left"><span>'+node.left.key+'</span></li>';
        //if(Uidepth == 1) this.treeViewNode(node.left,Uidepth);
    }
    if(node.right != null){
        tag += '<li class="'+depthClass+'right"><span>'+node.right.key+'</span></li>';
    }
    tag += '</ol>';
    var find = '.depth'+Number(this.depth);
    console.log(find);
    var area = this.area.find(find);
    area.append(tag);
    this.depth = Uidepth;

}*/
//최대, 최소값 찾기
BinarySearchTree.prototype.min = function(){
    return this.minNode(this.root);
}
BinarySearchTree.prototype.minNode = function(node){
    if(node){
        while(node && node.left !== null){
            node = node.left;
        }
        return node.key
    }
    return null;
}
BinarySearchTree.prototype.max = function(){
    return this.maxNode(this.root);
}
BinarySearchTree.prototype.maxNode = function(node){
    if(node){
        while(node && node.right !== null){
            node = node.right;
        }
        return node.key
    }
    return null;
}
//특정값 찾기
BinarySearchTree.prototype.search = function(key){
    return this.searchNode(this.root, key);
}
BinarySearchTree.prototype.searchNode = function(node, key){
    if(node === null){
        return false;
    }
    if( key < node.key){
        return this.searchNode(node.left, key);
    }else if(key > node.key){
        return this.searchNode(node.right, key);
    }else{
        return true;
    }
}

//노드 삭제
BinarySearchTree.prototype.remove = function(key){
    this.root = this.removeNode(this.root, key);
}
BinarySearchTree.prototype.removeNode = function(node, key){
    if(node === null){
        return null;
    }
    if(key < node.key){
        node.left = this.removeNode(node.left, key);
        return node;
    }
    else if(key > node.key){
        node.right = this.removeNode(node.right, key);
        return node;
    }else{
        if(node.left === null && node.right === null){
            node = null;
            return node;
        }

        if(node.left === null){
            node = node.right;
            return node;
        }else if(node.right === null){
            node = node.left;
            return node;
        }

        var aux = this.findMinNode(node.right);
        node.key = aux.key;
        node.right = this.removeNode(node.right, aux.key);
        return node;
    }
}
BinarySearchTree.prototype.findMinNode = function(node){
    if(node){
        while(node && node.left !== null){
            node = node.left;
        }
        return node
    }
    return null;
}