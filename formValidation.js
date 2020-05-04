/*notnull:*/

function ktraHopLe(nodeCha){
    var hople = true;
    var danhSachInput = nodeCha.getElementsByTagName('input');
    for(var i = 0; i < danhSachInput.length; i++){
        var nodeError = danhSachInput[i].nextElementSibling;
        var tenInput = danhSachInput[i].getAttribute('name');
        if(danhSachInput[i].hasAttribute('notnull')){                    
            if(danhSachInput[i].value.length == 0){
                nodeError.innerHTML = tenInput + ' không được bỏ trống.';
                hople = false;
                continue;
            }
        }
        if(danhSachInput[i].hasAttribute('khongam')){
            if(parseInt(danhSachInput[i].value) < 0){
                nodeError.innerHTML = tenInput + ' không âm';
                hople = false;
                continue;
            }
        }
        if(danhSachInput[i].hasAttribute('quagioihan')){
            var phanTram = parseInt(danhSachInput[i].value);
            if( phanTram > 100 ){
                nodeError.innerHTML = tenInput + ' trong khoảng 0 đến 100%';
                hople = false;
            }
        }
    }
    return hople;
}

function Onvaluechange(){
    var nodeError = event.target.nextElementSibling;
    nodeError.innerHTML = '';
}