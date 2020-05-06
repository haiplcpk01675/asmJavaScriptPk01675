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
                continue;
            }
        }
        if(danhSachInput[i].hasAttribute('khoanggioihan')){
            var ngay = parseInt(danhSachInput[i].value);
            if( ngay > 8 || ngay < 2 ){
                nodeError.innerHTML = tenInput + ' trong khoảng 2 đến 8';
                hople = false;
                continue;
            }
        }
        if(danhSachInput[i].hasAttribute('sodt')){
            var sdt = danhSachInput[i].value;
            if( sdt.length != 10 ){
                nodeError.innerHTML = tenInput + ' số điện thoại phải có 10 số.';
                hople = false;
                continue;
            }
        }
        if(danhSachInput[i].hasAttribute('quagioihan')){
            var phanTram = parseInt(danhSachInput[i].value);
            if( phanTram > 100 ){
                nodeError.innerHTML = tenInput + ' trong khoảng 0 đến 100%';
                hople = false;
                continue;
            }
        }
        if(danhSachInput[i].hasAttribute('email')){
            if(!ValidateEmail(danhSachInput[i].value)){
                nodeError.innerHTML = tenInput + ' sai định dạng Email.';
                hople = false;
            }
        }
    }
    return hople;
}
function ValidateEmail(mail){
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    {
        return true;
    }
        return false;
}
function Onvaluechange(){
    var nodeError = event.target.nextElementSibling;
    nodeError.innerHTML = '';
}