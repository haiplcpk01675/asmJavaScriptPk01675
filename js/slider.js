
var start = 0;
var danhSachSliderItem = document.getElementsByName('slider-item');
hienThiSliderHienTai(start);
setInterval(() => {
    onClickXemAnhSau()
}, 6000);
function onClickXemAnhTruoc(){
    start--;
    if(start == -1){
        start = danhSachSliderItem.length - 1;
    } 
    hienThiSliderHienTai(start);
}

function onClickXemAnhSau(){
    start++;
    if(start == danhSachSliderItem.length){
        start = 0;
    }
    hienThiSliderHienTai(start);
}

function hienThiSliderHienTai(viTri){
    for(var i = 0; i< danhSachSliderItem.length; i++){
        danhSachSliderItem[i].style.display = 'none';
    }
    danhSachSliderItem[viTri].style.display = 'block';
}
