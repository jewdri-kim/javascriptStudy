function Graph(){
   this.vertices = [];
   this.adjList = new Dictionary;
   this.DFStime = 0;       //{1}
   this.DFSFinished = new stack;

}

Graph.prototype.addVertex = function(v){
    this.vertices.push(v);
    this.adjList.set(v,[]);
}
Graph.prototype.addEdge = function(v, w){
    this.adjList.get(v).push(w);
    this.adjList.get(w).push(v);
}
Graph.prototype.toString = function(){
    var s = '';
    for(var i=0; i<this.vertices.length; i++){
        s += this.vertices[i] + ' -> ';
        var neighbors = this.adjList.get(this.vertices[i]);
        for(var j=0; j<neighbors.length; j++){
            s += neighbors[j] + ' ';
        }
        s += '\n';
    }
    return s;
}
Graph.prototype.initializeColor = function(){
    var color = {};
    for(var i=0; i<this.vertices.length; i++){
        color[this.vertices[i]] = 'white';
    }
    return color;
}
Graph.prototype.bfs = function(v, callback){
    var color = this.initializeColor();
	console.log('color');
	console.log(color);
    var queue = new Queue();
    queue.enqueue(v);

    while(!queue.isEmpty()){
        var u = queue.dequeue();
        var neighbors = this.adjList.get(u);

        color[u] = 'grey';
        for(var i=0; i< neighbors.length; i++){
            var w = neighbors[i];
            if(color[w] === 'white'){
                color[w] = 'grey';
                queue.enqueue(w);
            }
            color[u] = 'black';
            if(callback){
                callback(u);
            }
        }
    }
}

Graph.prototype.BFS = function(v, callback){
    var color = this.initializeColor();
    var queue = new Queue();
    var d = [];     //{1}
    var pred = [];     //{2}
    queue.enqueue(v);

    for(var i=0; i<this.vertices.length; i++){   //{3}
        d[this.vertices[i]] = 0;                //{4}
        pred[this.vertices[i]] = null;             //{5}
    }

    while(!queue.isEmpty()){
        var u = queue.dequeue();
        var neighbors = this.adjList.get(u);

        color[u] = 'grey';
        for(var i=0; i< neighbors.length; i++){
            var w = neighbors[i];
            if(color[w] === 'white'){
                color[w] = 'grey';
                d[w] = d[u]+1;       //{6}
                pred[w] = u;         //{7}
                queue.enqueue(w);
            }
        }
        color[u] = 'black';
    }
    return {
        distance: d,
        predecessor: pred
    }
}

Graph.prototype.dfs = function(callback){
    var color = this.initializeColor();
    for(var i=0; i<this.vertices.length; i++){
        if(color[this.vertices[i]] === 'white'){
            this.dfsVisit(this.vertices[i], color, callback);
        }
    }
}
Graph.prototype.dfsVisit = function(u, color, callback){
    color[u] = 'grey';
    if(callback){
        callback(u);
    }
    var neighbors = this.adjList.get(u);
    for(var i=0; i<neighbors.length; i++){
        var w = neighbors[i];
        if(color[w] === 'white'){
            this.dfsVisit(w,color,callback);
        }
    }
    color[u] = 'black';
}


Graph.prototype.DFS = function(){
    var color = this.initializeColor();
    var d = [];          //{2}
    var f = [];
    var p = [];
    this.DFStime = 0;

    for(var i=0; i<this.vertices.length; i++){      //{3}
        f[this.vertices[i]] = 0;
        d[this.vertices[i]] = 0;
        p[this.vertices[i]] = null;
    }

    for(i=0; i<this.vertices.length; i++){
        if(color[this.vertices[i]] === 'white'){
            this.DFSVisit(this.vertices[i],color,d,f,p);
        }
    }

    var finished = this.DFSFinished.print();
    return{         //{4}
        discovery: d,
        finished: f,
        predecessors : p,
        finishedStack : finished
    }
}

Graph.prototype.DFSVisit = function(u, color, d, f, p){
    console.log('방문'+u);
    color[u] = 'grey';
    d[u] = ++this.DFStime;      //{5}
    var neighbors = this.adjList.get(u);
    for(var i=0; i<neighbors.length; i++){
        var w = neighbors[i];
        if(color[w] === 'white'){
            p[w] = u;       //{6}
            this.DFSVisit(w, color, d, f,p);
        }
    }
    color[u] = 'black';
    f[u] = ++this.DFStime;          //{7}
    this.DFSFinished.push(u);
    console.log('탐색'+u);
}