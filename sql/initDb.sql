CREATE DATABASE movie;
use movie;

CREATE TABLE Phim(
	ma_phim int PRIMARY KEY AUTO_INCREMENT,
	ten_phim VARCHAR(255),
	trailer VARCHAR(255),
	hinh_anh VARCHAR(255),
	mo_ta VARCHAR(255),
	ngay_khoi_chieu DATE,
	danh_gia INT,
	hot BOOLEAN,
	dang_chieu BOOLEAN,
	sap_chieu BOOLEAN
);

INSERT INTO Phim (ten_phim, trailer, hinh_anh, mo_ta, ngay_khoi_chieu, danh_gia, hot, dang_chieu, sap_chieu) 
VALUES
('Ten Phim 1', 'Trailer 1', 'Hinh Anh 1', 'Mo Ta 1', '2023-01-01', 4, 1, 1, 0),
('Ten Phim 2', 'Trailer 2', 'Hinh Anh 2', 'Mo Ta 2', '2023-02-01', 3, 0, 1, 0),
('Ten Phim 3', 'Trailer 3', 'Hinh Anh 3', 'Mo Ta 3', '2023-03-01', 5, 1, 1, 0),
('Ten Phim 4', 'Trailer 4', 'Hinh Anh 4', 'Mo Ta 4', '2023-04-01', 4, 0, 1, 0),
('Ten Phim 5', 'Trailer 5', 'Hinh Anh 5', 'Mo Ta 5', '2023-05-01', 4, 1, 0, 1),
('Ten Phim 6', 'Trailer 6', 'Hinh Anh 6', 'Mo Ta 6', '2023-06-01', 3, 0, 0, 1),
('Ten Phim 7', 'Trailer 7', 'Hinh Anh 7', 'Mo Ta 7', '2023-07-01', 5, 1, 0, 1),
('Ten Phim 8', 'Trailer 8', 'Hinh Anh 8', 'Mo Ta 8', '2023-08-01', 4, 0, 0, 1),
('Ten Phim 9', 'Trailer 9', 'Hinh Anh 9', 'Mo Ta 9', '2023-09-01', 4, 1, 1, 0),
('Ten Phim 10', 'Trailer 10', 'Hinh Anh 10', 'Mo Ta 10', '2023-10-01', 3, 0, 1, 0),
('Ten Phim 11', 'Trailer 11', 'Hinh Anh 11', 'Mo Ta 11', '2023-11-01', 5, 1, 1, 0),
('Ten Phim 12', 'Trailer 12', 'Hinh Anh 12', 'Mo Ta 12', '2023-12-01', 4, 0, 1, 0),
('Ten Phim 13', 'Trailer 13', 'Hinh Anh 13', 'Mo Ta 13', '2024-01-01', 4, 1, 0, 1),
('Ten Phim 14', 'Trailer 14', 'Hinh Anh 14', 'Mo Ta 14', '2024-02-01', 3, 0, 0, 1),
('Ten Phim 15', 'Trailer 15', 'Hinh Anh 15', 'Mo Ta 15', '2024-03-01', 5, 1, 0, 1),
('Ten Phim 16', 'Trailer 16', 'Hinh Anh 16', 'Mo Ta 16', '2024-04-01', 4, 0, 0, 1),
('Ten Phim 17', 'Trailer 17', 'Hinh Anh 17', 'Mo Ta 17', '2024-05-01', 4, 1, 1, 0),
('Ten Phim 18', 'Trailer 18', 'Hinh Anh 18', 'Mo Ta 18', '2024-06-01', 3, 0, 1, 0),
('Ten Phim 19', 'Trailer 19', 'Hinh Anh 19', 'Mo Ta 19', '2024-07-01', 5, 1, 1, 0),
('Ten Phim 20', 'Trailer 20', 'Hinh Anh 20', 'Mo Ta 20', '2024-08-01', 4, 0, 1, 0);


CREATE TABLE Banner(
	ma_banner int PRIMARY KEY AUTO_INCREMENT,
	ma_phim int,
	FOREIGN KEY(ma_phim) REFERENCES Phim(ma_phim),
	hinh_anh VARCHAR(255)
);

INSERT INTO Banner (ma_phim, hinh_anh) VALUES
(1, 'banner1.jpg'),
(2, 'banner2.jpg'),
(3, 'banner3.jpg'),
(4, 'banner4.jpg'),
(5, 'banner5.jpg'),
(6, 'banner6.jpg'),
(7, 'banner7.jpg'),
(8, 'banner8.jpg'),
(9, 'banner9.jpg'),
(10, 'banner10.jpg'),
(11, 'banner11.jpg'),
(12, 'banner12.jpg'),
(13, 'banner13.jpg'),
(14, 'banner14.jpg'),
(15, 'banner15.jpg');

CREATE TABLE HeThongRap(
	ma_he_thong_rap int PRIMARY KEY AUTO_INCREMENT,
	ten_he_thong_rap VARCHAR(255),
	logo VARCHAR(255)
);

INSERT INTO HeThongRap (ten_he_thong_rap, logo) VALUES
('BHD Cinema', 'bhd_logo.jpg'),
('CGV Cinemas', 'cgv_logo.jpg'),
('Lotteria', 'lotteria_logo.jpg'),
('CineStar Cinemas', 'cinestar_logo.jpg'),
('Galaxy Cinema', 'galaxy_logo.jpg'),
('MegaGS Cinemas', 'megags_logo.jpg'),
('Lotte Cinema', 'lotte_logo.jpg'),
('Vincom Cinema', 'vincom_logo.jpg'),
('Momo Mart', 'momo_logo.jpg'),
('Golden Screen Cinemas', 'gsc_logo.jpg');


CREATE TABLE CumRap(
	ma_cum_rap int PRIMARY KEY AUTO_INCREMENT,
	ten_cum_rap VARCHAR(255),
	dia_chi VARCHAR(255),
	ma_he_thong_rap int,
	FOREIGN KEY(ma_he_thong_rap) REFERENCES HeThongRap(ma_he_thong_rap)
);

INSERT INTO CumRap (ten_cum_rap, dia_chi, ma_he_thong_rap) VALUES
('BHD Star Cineplex - Vincom 3/2', 'L5-Vincom 3/2, 3C Đường 3/2, Q.10, TP.HCM', 1),
('CGV Parkson Paragon', 'L3-Parkson Paragon, 3 Nguyễn Lương Bằng, P. Tân Phú, Q.7, TP.HCM', 2),
('Lotteria Hoàng Văn Thụ', '5B Hoàng Văn Thụ, Q. Phú Nhuận, TP.HCM', 3),
('CineStar Quoc Thanh', '271 Nguyễn Trãi, P. Nguyễn Cư Trinh, Q.1, TP.HCM', 4),
('Galaxy Nguyễn Du', '116 Nguyễn Du, Q.1, TP.HCM', 5);


CREATE TABLE RapPhim(
	ma_rap INT PRIMARY KEY AUTO_INCREMENT,
	ten_rap VARCHAR(255),
	ma_cum_rap INT,
	FOREIGN KEY(ma_cum_rap) REFERENCES CumRap(ma_cum_rap)
);

INSERT INTO RapPhim (ten_rap, ma_cum_rap) VALUES
('Rạp 1 - BHD Star Cineplex', 1),
('Rạp 2 - BHD Star Cineplex', 1),
('Rạp 3 - BHD Star Cineplex', 1),
('Rạp 1 - CGV Parkson Paragon', 2),
('Rạp 2 - CGV Parkson Paragon', 2),
('Rạp 3 - CGV Parkson Paragon', 2),
('Rạp 1 - Lotteria Hoàng Văn Thụ', 3),
('Rạp 2 - Lotteria Hoàng Văn Thụ', 3),
('Rạp 3 - Lotteria Hoàng Văn Thụ', 3),
('Rạp 1 - CineStar Quoc Thanh', 4),
('Rạp 2 - CineStar Quoc Thanh', 4),
('Rạp 3 - CineStar Quoc Thanh', 4),
('Rạp 1 - Galaxy Nguyễn Du', 5),
('Rạp 2 - Galaxy Nguyễn Du', 5),
('Rạp 3 - Galaxy Nguyễn Du', 5);


CREATE TABLE Ghe(
	ma_ghe INT PRIMARY KEY AUTO_INCREMENT,
	ten_ghe VARCHAR(255),
	loai_ghe VARCHAR(255),
	ma_rap int,
	FOREIGN KEY(ma_rap) REFERENCES RapPhim(ma_rap)
);

INSERT INTO Ghe (ten_ghe, loai_ghe, ma_rap) VALUES
('A1', 'Normal', 1),
('A2', 'Normal', 1),
('A3', 'Normal', 1),
('B1', 'VIP', 1),
('B2', 'VIP', 1),
('B3', 'VIP', 1),
('C1', 'Normal', 1),
('C2', 'Normal', 1),
('C3', 'Normal', 1),
('D1', 'Normal', 2),
('D2', 'Normal', 2),
('D3', 'Normal', 2),
('E1', 'VIP', 2),
('E2', 'VIP', 2),
('E3', 'VIP', 2),
('F1', 'Normal', 2),
('F2', 'Normal', 2),
('F3', 'Normal', 2),
('G1', 'Normal', 3),
('G2', 'Normal', 3);


CREATE TABLE LichChieu(
	ma_lich_chieu INT PRIMARY KEY AUTO_INCREMENT,
	ma_rap int,
	FOREIGN KEY(ma_rap) REFERENCES RapPhim(ma_rap),
	ma_phim int,
	FOREIGN KEY(ma_phim) REFERENCES Phim(ma_phim),
	ngay_gio_chieu DATETIME,
	gia_ve INT
);

INSERT INTO LichChieu (ma_rap, ma_phim, ngay_gio_chieu, gia_ve) VALUES
(1, 1, '2024-02-20 09:00:00', 80000),
(1, 2, '2024-02-20 11:30:00', 90000),
(2, 3, '2024-02-20 13:00:00', 85000),
(2, 4, '2024-02-20 15:30:00', 95000),
(3, 5, '2024-02-20 18:00:00', 100000),
(3, 6, '2024-02-20 20:30:00', 110000),
(4, 7, '2024-02-20 10:00:00', 85000),
(4, 8, '2024-02-20 12:30:00', 95000),
(5, 9, '2024-02-20 14:00:00', 90000),
(5, 10, '2024-02-20 16:30:00', 100000),
(1, 11, '2024-02-21 09:00:00', 80000),
(1, 12, '2024-02-21 11:30:00', 90000),
(2, 13, '2024-02-21 13:00:00', 85000),
(2, 14, '2024-02-21 15:30:00', 95000),
(3, 15, '2024-02-21 18:00:00', 100000);


CREATE TABLE NguoiDung(
	user_id int PRIMARY KEY AUTO_INCREMENT,
	ho_ten VARCHAR(255),
	email VARCHAR(255),
	so_dt VARCHAR(30),
	mat_khau VARCHAR(255),
	loai_nguoi_dung VARCHAR(255)
);

INSERT INTO NguoiDung (ho_ten, email, so_dt, mat_khau, loai_nguoi_dung) VALUES
('Nguyễn Văn A', 'nguyenvana@example.com', '0123456789', 'password123', 'thanh_vien'),
('Trần Thị B', 'tranthib@example.com', '0987654321', 'abc123', 'thanh_vien'),
('Lê Văn C', 'levanc@example.com', '0365987412', '123456', 'thanh_vien'),
('Phạm Thị D', 'phamthid@example.com', '0658741239', 'password456', 'thanh_vien'),
('Hoàng Văn E', 'hoangvane@example.com', '0321456987', 'abc456', 'thanh_vien'),
('Đỗ Thị F', 'dothif@example.com', '0912345678', 'password789', 'thanh_vien'),
('Trần Văn G', 'tranvang@example.com', '0789456123', 'abc789', 'thanh_vien'),
('Nguyễn Thị H', 'nguyenthih@example.com', '0546871239', 'passwordabc', 'thanh_vien'),
('Lê Văn I', 'levani@example.com', '0963214789', 'abcxyz', 'thanh_vien'),
('Phạm Văn K', 'phamvank@example.com', '0321654987', 'xyz123', 'thanh_vien');



CREATE TABLE DatVe(
	ma_ve INT PRIMARY KEY AUTO_INCREMENT,
	user_id INT,
	FOREIGN KEY(user_id) REFERENCES NguoiDung(user_id),
	ma_lich_chieu INT,
	FOREIGN KEY(ma_lich_chieu) REFERENCES LichChieu(ma_lich_chieu),
	ma_ghe INT,
	FOREIGN KEY(ma_ghe) REFERENCES Ghe(ma_ghe)
);

INSERT INTO DatVe (user_id, ma_lich_chieu, ma_ghe) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 4, 4),
(5, 5, 5),
(6, 1, 6),
(7, 2, 7),
(8, 3, 8),
(9, 4, 9),
(10, 5, 10),
(1, 1, 11),
(2, 2, 12),
(3, 3, 13),
(4, 4, 14),
(5, 5, 15),
(6, 1, 1),
(7, 2, 2),
(8, 3, 3),
(9, 4, 4),
(10, 5, 5),
(1, 1, 6),
(2, 2, 7),
(3, 3, 8),
(4, 4, 9),
(5, 5, 10);


