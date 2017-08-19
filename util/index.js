const limitLength=(array,len)=>{
    if(array&&array.length&&array.length>len) array.length=len;
}

module.exports={
    limitLength
}