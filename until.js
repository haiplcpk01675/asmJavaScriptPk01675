function taoID(){
    /*Tạo Id duy nhất*/
    /*lấy tg hiện tại đến milisecond*/
    var thoiGianHienTai = new Date().getTime();
    
    var id = Math.random().toString().substr(2,5)+"_"+String(thoiGianHienTai);
    return id;
}