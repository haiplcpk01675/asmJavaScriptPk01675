function taoID(){
    /*Tạo Id duy nhất*/
    /*lấy tg hiện tại đến milisecond*/
    var thoiGianHienTai = new Date().getTime();
    
    var id = Math.random().toString().substr(2,5)+"_"+String(thoiGianHienTai);
    return id;
}
function anDangKy(){
    let nodeDangKy = document.getElementById('dangKy');
    nodeDangKy.style.display = 'none';
}
function anDangNhap(){
    let nodeDangNhap = document.getElementById('dangNhap');
    nodeDangNhap.style.display = 'none';
}
function nodeDangNhap(){
    let nodeDangKy = document.getElementById('dangKy');
    let nodeDangNhap = document.getElementById('dangNhap');
    nodeDangKy.style.display = 'none';
    nodeDangNhap.style.display = 'flex';
}
function nodeDangKy(){
    let nodeDangKy = document.getElementById('dangKy');
    let nodeDangNhap = document.getElementById('dangNhap');
    nodeDangNhap.style.display = 'none';
    nodeDangKy.style.display = 'flex';    
}