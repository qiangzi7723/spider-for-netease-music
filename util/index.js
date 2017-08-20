const limitLength=(array,len)=>{
    if(array&&array.length&&array.length>len) array.length=len;
}

const splitId=(href)=>{
    return href.split('?id=')[1];
}

module.exports={
    limitLength,
    splitId
}