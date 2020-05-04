var keyLocalStorageItemGioHang = 'gioHang';
function layGioHangTuLCS(){
 /*lấu GIO HÀNG TỪ LCS */
    var gioHang = new Array();
    var jsonGioHang = localStorage.getItem('gioHang');
    if(jsonGioHang != null){
        gioHang = JSON.parse(jsonGioHang);
    }
    return gioHang;
}

function themSanPhamVaoGioHang(idSanPham, gioHang){
    /*thêm sp vào giỏ: in: id sanphaamr ............ out: giỏ hàng */
    var gioHangSauKhiDuocThem = gioHang;
    var itemGioHang =  taoDoiTuongItemGioHang(idSanPham, 1);   
    gioHangSauKhiDuocThem.push(itemGioHang);
    return gioHangSauKhiDuocThem;
}

/**lưu giỏ hàng vào lcs */
function luuDanhSachItemGioHangVaoLCS(gioHang){
    var jsonGioHang = JSON.stringify(gioHang);

    localStorage.setItem(keyLocalStorageItemGioHang, jsonGioHang)
}

function taoDoiTuongItemGioHang(idSanPham, soLuong){
    var itemGioHang = new Object();
    itemGioHang.idSanPham = idSanPham;
    itemGioHang.soLuong = soLuong;
    return itemGioHang;
}

function layDanhSachItemGioHang(){
    var danhSachItemGioHang = new Array();
    /*b1. lấy chuỗi json lưu trong LCS */
    var jsonDanhSachItemGioHang = localStorage.getItem(keyLocalStorageItemGioHang);
    /*b2. chuyển json qua dạng item giỏ hàng */
    if(jsonDanhSachItemGioHang != null){
        danhSachItemGioHang = JSON.parse(jsonDanhSachItemGioHang);
    }
    return danhSachItemGioHang;
}
function remove(idSanPham){
    var itemGioHang = this.layGioHangTuLCS();
    var xoaItemGioHang = new Array();
    for(let i =0; i< itemGioHang.length; i++){
        var item = itemGioHang[i];
        if(item.id == idSanPham){
            xoaItemGioHang.push(item);
        }
    }
    this.luuDanhSachItemGioHangVaoLCS(xoaItemGioHang);
    return xoaItemGioHang;
}


