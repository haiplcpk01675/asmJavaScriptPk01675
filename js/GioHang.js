var keyLocalStorageItemGioHang = 'gioHang';
hienThiDanhSachItemGioHang();
tinhTongTien();

function remove(idSanPham) {
    var itemGioHang = this.layGioHangTuLCS();
    var xoaItemGioHang = new Array();
    for (let i = 0; i < itemGioHang.length; i++) {
        var item = itemGioHang[i];
        if (item.id == idSanPham) {
            xoaItemGioHang.push(item);
        }
    }
    this.luuDanhSachItemGioHangVaoLCS(xoaItemGioHang);
    return xoaItemGioHang;
}


/*HÀM TÍNH TIỀN KHI THAY ĐỔI SỐ LƯỢNG VÀ CÁC FUNCTION HỖ TRỢ */

function onInputChange(id) {

    let input = event.target;
    console.log(event.target);
    input.value = input.value.replace(/[^0-9 ]/g, '');
    if (input.value == '')
        return;
    let value = event.target.value;
    // Lưu vào Local Storage
    let dataGioHang = layDataTuLocal("gioHang");
    for (let i = 0; i < dataGioHang.length; i++) {
        if (dataGioHang[i].id == id) {
            dataGioHang[i].soLuong = parseInt(value);
            break;
        }
    }
    luuDataLocal(dataGioHang, "gioHang");
}
function tinhThanhTien(id) {
    let nodeInput = event.target;
    let soluong = 0;
    let giaBan = 0;
    // loai bo truong hop input khong nhu y
    if (nodeInput.value.length == 0)
        return;

    soluong = parseInt(nodeInput.value);

    if (soluong < 0) {
        soluong = 0;
        nodeInput.value = soluong;
    }

    if (soluong == 0){
        return;
    }
        

    let dataSanPham = layDataTuLocal("danhSachSanPham");
    let sanPham = dataSanPham.find(sp => sp.id == id);
    giaBan = sanPham.giaGoc * (100 - sanPham.phanTramGiamGia) / 100;
    // lấy node hiển thị thành tiền
    let nodeThanhTien = nodeInput.nextElementSibling;
    nodeThanhTien.innerText = themChamVaoSo(giaBan * soluong);

    // lưu sô lượng lên data giỏ hàng

    let dataGiohang = layDataTuLocal('gioHang');

    dataGiohang.forEach(itemGio => {
        if (itemGio.id == id)
            itemGio.soLuong = soluong;
    });

    luuDataLocal(dataGiohang, 'gioHang');

    tinhTongTien();
}

function tinhTongTien() {
    // Lấy data của sản phẩm
    let nodeTongTienTam = document.getElementById("tongTienTam");
    let nodeTongTienTra = document.getElementById("tongTienTra");
    let dataGioHang = layDataTuLocal("gioHang");
    let dataSanPham = layDataTuLocal("danhSachSanPham");
    let tongTien = 0;
    for (let i = 0; i < dataGioHang.length; i++) {
        let idSanPham = dataGioHang[i].id;
        let soLuong = dataGioHang[i].soLuong;
        let sanPham = dataSanPham.find(sp => sp.id == idSanPham);
        let giaBan = tinhGiaBan(sanPham.giaGoc, sanPham.phanTramGiamGia);
        tongTien += giaBan * soLuong;
    }
    let s_tongTien = themChamVaoSo(tongTien);
    nodeTongTienTam.innerHTML = s_tongTien + " đ";
    nodeTongTienTra.innerHTML = s_tongTien + " đ";
}

function xacNhanThanhToan() {
    var nodeCha = event.target.parentElement;
    if (!ktraHopLe(nodeCha)) {
        return;
    }
    alert('Thanh toán thành công!');
}
function hienThiDanhSachItemGioHang() {
    var danhSachItemGioHang = layDataTuLocal('gioHang');
    if (danhSachItemGioHang == '' || danhSachItemGioHang == null) {
        var HTML = taoNodeGioTrong();
    } else {
        var HTML = chuyenDanhSachItemGioHangSangHTML(danhSachItemGioHang);
    }
    var nodeGioHang = document.getElementById('gioHang');
    nodeGioHang.innerHTML = HTML;
}
function chuyenDanhSachItemGioHangSangHTML(danhSachItemGioHang) {
    var htmlTong = '';
    for (var i = 0; i < danhSachItemGioHang.length; i++) {
        htmlTong = htmlTong + chuyenDoiTuongItemGioHangSangHTML(danhSachItemGioHang[i].id, danhSachItemGioHang[i].soLuong);
    }
    return htmlTong;
}
function onClickNutXoa(id) {
    // Xóa node hiển thị
    let nodeSanPham = event.target.parentElement;
    nodeSanPham.parentElement.remove();
    // Xóa data
    let dataGioHang = layDataTuLocal("gioHang");
    let vitri = dataGioHang.findIndex(sp => sp.idSanPham == id);
    dataGioHang.splice(vitri, 1);
    luuDataLocal(dataGioHang, "gioHang");
    tinhTongTien();

    if (dataGioHang.length == 0){
        var nodeGioHang = document.getElementById('gioHang');
        nodeGioHang.innerHTML = taoNodeGioTrong();
    }
}


function chuyenDoiTuongItemGioHangSangHTML(id, soluong) {
    var sanPham = laySanPhamTheoId(id);
    var tongTien = ((sanPham.tinhGiaBan()) * soluong);
    var html = '   <div id="itemhang" class="item-giohang">  ' +
        '                <div class="hinhanh">  ' +
        '                    <img src="' + sanPham.hinhAnh + '" alt="">  ' +
        '                </div>  ' +
        '                <p class="tensp">' + sanPham.ten + '</p>  ' +
        '                <div class="gia">  ' +
        '                    <span class="giaGoc">' + themChamVaoSo(sanPham.giaGoc) + ' đ</span>  ' +
        '                    <span class="giaBan">' + themChamVaoSo(sanPham.tinhGiaBan()) + ' đ</span>  ' +
        '                </div>  ' +
        '                <input type="number" oninput="tinhThanhTien(\'' + id + '\')" class="soLuong" value="' + soluong + '">  ' +
        '                <p class="tongTien">' + themChamVaoSo(tongTien) + 'đ</p>  ' +
        '                <div class="hanhDong">  ' +
        '                    <i class="fas fa-trash" onclick="onClickNutXoa(' + "\'" + id + "\'" + ')"></i>  ' +
        '                </div>  ' +
        '           </div>  ';
    return html;
}

function taoNodeGioTrong() {
    var HTML = '';
    HTML += '<div class="khunghinhtrong">';
    HTML += '   <img class="hinhtrong" src="https://cdn.dribbble.com/users/204955/screenshots/4930541/emptycart.png">';
    HTML += '   <h3 class="noidungtrong1">GIỎ HÀNG TRỐNG</h3>';
    HTML += '   <p class ="nut-mua-tiep"  onclick="location.href=\'index.html\';">Tiếp tục Shopping</p>';
    
    HTML += '</div>';
    return HTML;
}

function tinhGiaBan(giaGoc, phanTramGiamGia) {
    return giaGoc * (100 - phanTramGiamGia) / 100;
}


