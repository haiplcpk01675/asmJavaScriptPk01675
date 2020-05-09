/*mục tiêu hàm này để tạo ra đối tượng từ các thuộc tính truyền vào:
        input: các thuộc tính
        output: một đối tượng sanPham
        */
function taoDoiTuongSanPham(hinhAnh, ten, giaGoc, phanTramGiamGia, khuVuc, id){
    var sanPham = new Object();
    //Tạo thuộc tính và phương thức:
    /*b1. gắn các thuộc tính cho Đt*/
    sanPham.hinhAnh = hinhAnh;
    sanPham.ten = ten;
    sanPham.giaGoc = giaGoc;
    sanPham.phanTramGiamGia = phanTramGiamGia;
    sanPham.khuVuc = khuVuc;
        /*Tạo định danh cho đối tượng */
    if(id != null){
        sanPham.id = id;
        
    }else{
        sanPham.id = taoID();
    }

        /*b2. viết phương thức cho đt*/
    sanPham.tinhGiaBan = function(){
            //logic xử lí
        var giaBan = this.giaGoc * (100- this.phanTramGiamGia)/100;
        return giaBan;
    }
        /*hàm chuyển đối tượng sản phẩm thành JSON */
    sanPham.toJson = function(){
        var json = JSON.stringify(this);
        return json;
    }

        /*Từ Json chuyển thành đối tượng đầy đủ các funtions 
        input: json
        output: đối tượng đầy đủ
        */
    sanPham.fromJSON = function(json){
        var doiTuongDayDu = new Object();

            /*b1. chuyển từ json thành đối tượng */
        var doiTuong = JSON.parse(json);

            /*b2. chuyển thành đối tượng đầy đủ các phương thức */
        var doiTuongDayDu = taoDoiTuongSanPham(doiTuong.hinhAnh, doiTuong.ten, doiTuong.giaGoc, doiTuong.phanTramGiamGia, doiTuong.khuVuc);
        return doiTuongDayDu;
    }

        /*Vì không thể hiện hàm tính giá bán của sản phẩm nên ta làm bước này: */
    sanPham.fromJSONs = function(jsonDanhSachSanPham){
            /*từ JSON danh sách sản phẩm trả về danh sách đầy đủ thuộc tính
            input = Json của danh sách sản phẩm
            output = danh sách sản phẩm đầy đủ
             */
        var danhSachSanPhamDayDu = new Array();
        var danhSachSanPham = JSON.parse(jsonDanhSachSanPham);

        for(var i = 0; i < danhSachSanPham.length; i++){
            var sanPham = danhSachSanPham[i];
            var sanPhamDayDu = taoDoiTuongSanPham(sanPham.hinhAnh, sanPham.ten, sanPham.giaGoc, sanPham.phanTramGiamGia, sanPham.khuVuc,sanPham.id);
            danhSachSanPhamDayDu[i] = sanPhamDayDu;
        }

        return danhSachSanPhamDayDu;
    }
    return sanPham;
}
    /*Chuyển 1 danh sách đối tượng thành HTML và hiển thị lên màn hình
    input = Danh sách sản phẩm
    output = Đoạn HTML hiển thị danh sách sản phẩm */
function chuyenDanhSachDoiTuongSanPhamThanhHTML(danhSachSanPham){
    var HTMLDanhSachSanPham = '<div class="items">';
    for(var i = 0; i < danhSachSanPham.length; i++){
        var sanPham = danhSachSanPham[i];
        var htmlSanPham = chuyenDoiTuongSanPhamThanhHTML(sanPham);
        HTMLDanhSachSanPham = HTMLDanhSachSanPham + htmlSanPham;
    }
    HTMLDanhSachSanPham = HTMLDanhSachSanPham + '</div>';
        
    return HTMLDanhSachSanPham;
}

    /*chuyển 1 đối tượng thành 1 html
    input = sản phẩm
    output = đọn html sản phẩm */
function chuyenDoiTuongSanPhamThanhHTML(sanPham){
    sanPham = taoDoiTuongSanPham(sanPham.hinhAnh, sanPham.ten, sanPham.giaGoc, sanPham.phanTramGiamGia, sanPham.khuVuc, sanPham.id);
    var html = '';
    html += '<div class="item">'
    html +=     '<div class="item-hinhAnh">'
    html +=         '<img class="zoom" src="' + sanPham.hinhAnh + '" alt="" srcset="">'
    html +=     '</div>'
    html +=     '<h2 class="item-ten">'+ sanPham.ten +'</h2>'
    html +=     '<div class="item-gia">'
    html +=         '<span class="item-gia-goc">' + themChamVaoSo(sanPham.giaGoc) +' đ</span>'
    html +=         '<span class="item-gia-ban">' + themChamVaoSo(sanPham.tinhGiaBan()) +' đ</span>'
    html +=     '</div>'
    html +=     '<div class="item-khuVuc">'
    html +=         '<span class="item-khuVuc-like item-khuVuc-like--like">'
    html +=             '<i class="item-khuVuc-like-empty far fa-heart"></i>'
    html +=             '<i class="item-khuVuc-like-fill fas fa-heart"></i>'
    html +=         '</span>'
    html +=         '<div class="item-kV">' + sanPham.khuVuc +'</div>'
    html +=     '</div>'
    html +=     '<div class="item-tenShopSale">'
    html +=         '<img class="logoNen" src="images/image.png" alt="" srcset="">'
    html +=         '<span class="tenShop_Sale"> ShopSale</span>'
    html +=     '</div>'
    html +=     '<div class="item-phanTramGiamGia">'
    html +=         '<p class="giamGiaPhanTram">' +sanPham.phanTramGiamGia+ '%</p>'
    html +=         '<p class="giamGiaPhanTram_Sale">GIẢM</p>'
    html +=     '</div>'
    html +=     '<button class="btn btn-primary" onclick="onClickThemVaoGioHang(\''+sanPham.id+'\')">Thêm vào giỏ hàng</button>'
    html += '</div>'
    return html;
}
function laySanPhamTheoId(idSanPham){
        /*Mục tiêu dựa vào id lấy toàn bộ thông tin sản phẩm
            1. input: Id sản phẩm
            2. output: đối tượng sản phẩm */
            /*Cách làm: duyệt tất cả các đối tượng trong lcs để duyệt id, trùng thì xuất */
    var sanPham = new Object();
    var danhSachSanPham = layDanhSachSanPhamDuoiLCS();
    for(var i = 0; i < danhSachSanPham.length; i++){
        var sanPhamHienTai = danhSachSanPham[i];
        if(sanPhamHienTai.id == idSanPham){
            sanPham = sanPhamHienTai;
        }

    }
    sanPham = taoDoiTuongSanPham(sanPham.hinhAnh, sanPham.ten, sanPham.giaGoc, sanPham.phanTramGiamGia, sanPham.khuVuc, sanPham.id);
    
    return sanPham;
}
function layDanhSachSanPhamDuoiLCS(){
    var jsonDanhSachSanPham = localStorage.getItem('danhSachSanPham');
    
    var danhSachSanPham = JSON.parse(jsonDanhSachSanPham);
        return danhSachSanPham;
}