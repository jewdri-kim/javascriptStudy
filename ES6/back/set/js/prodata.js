function Productdata(data, listarea){
   this._proData = new Array;
   this._setData(data);
   this._srchTag = new Set;
   this._srchData = new Array;
   this.listarea = listarea;
   this.init(listarea, this._proData);
}
Productdata.prototype._setData = function(data){
    for(var i=0; i<data.length; i++){
         var temp = {};
        temp.name = data[i].name;
        temp.img = data[i].img;
        temp.tag = new Set();
        for(var k=0; k<data[i].tag.length; k++){
            temp.tag.add(data[i].tag[k]);
        }
        this._proData[i] = temp;
    }
}
Productdata.prototype.init = function(listarea, list){
    var listTemplate = '<li><a href="#"><img src="{img}" alt="">\
                        <dl><dt>{name}</dt>\
                        <dd>{tag}</dd></dl></a></li>';
    var tagList = '';
    if(list.length != 0){
        console.log('데이터개수 '+list.length);
        for(var i=0; i<list.length; i++){
            var tempTag = '';
            var tempTagArray = list[i].tag.setArry();
            for(var k=0; k<tempTagArray.length; k++){
                tempTag += '<span>#'+tempTagArray[k]+'</span>';
            }

            tagList += listTemplate.replace('{img}',list[i].img).replace('{name}',list[i].name).replace('{tag}',tempTag);
        }
        $(listarea).prev('p').remove();
        $(listarea).html(tagList);
    }else{
        tagList ='<p>리스트가 없습니다.</p>'
        $(listarea).html('');
        $(listarea).parent().prepend(tagList);
    }


}
Productdata.prototype.addSrch = function(tag){
    this._srchTag.add(tag);
}
Productdata.prototype.removeSrch = function(tag){
    this._srchTag.remove(tag);
}
Productdata.prototype.andSrch = function(){
    this._srchData = [];
    var count = 0;
    for(var i=0; i<this._proData.length; i++){
        var result = this._srchTag.subset(this._proData[i].tag);    //부분집합
        if(result){
            this._srchData[count] = this._proData[i];
            count++;
        }
    }
    console.log('AND 검색 완료');
    this.init(this.listarea, this._srchData);
}
Productdata.prototype.orSrch = function(){
    this._srchData = [];
    var count = 0;
    for(var i=0; i<this._proData.length; i++){
        var result = this._srchTag.intersection(this._proData[i].tag); //교집합
        if(result.size() > 0){
            this._srchData[count] = this._proData[i];
            count++;
        }
    }
    console.log('OR 검색 완료');
    this.init(this.listarea, this._srchData);
}