function MinCoinChange(coins){
    this.coins = coins;
    this.cache = {};
}

MinCoinChange.prototype.makeChange = function(amount){
    var me = this;
    if(!amount){
        return [];
    }
    if(this.cache[amount]){
        return this.cache[amount];
    }
    var min = [];
    var newMin;
    var newAmount;

    for(var i=0; i<me.coins.length; i++){
        var coin = me.coins[i];
        newAmount = amount - coin;
        if(newAmount >= 0){
            newMin = me.makeChange(newAmount);
        }
        if(
            newAmount >= 0 &&
            (newMin.length < min.length-1 || !min.length)
            && (newMin.length || !newAmount)
        ){
            min = [coin].concat(newMin);
            console.log('new Min'+ min+' for' + amount);
        }
    }
    return (me.cache[amount] = min);

}

//욕심쟁이 알고리즘으로 최소동전 교환 문제
function MinCoinChange2(coins){
    this.coins = coins;
}

MinCoinChange2.prototype.makeChange = function(amount){
    var change = [];
    var total =0;
    for(var i=this.coins.length; i>=0; i--){
        var coin = this.coins[i];
        while(total + coin <= amount){
            change.push(coin);
            total += coin;
        }
    }
    return change;
}