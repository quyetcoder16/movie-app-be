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

CREATE TABLE Banner(
	ma_banner int PRIMARY KEY AUTO_INCREMENT,
	ma_phim int,
	FOREIGN KEY(ma_phim) REFERENCES Phim(ma_phim),
	hinh_anh VARCHAR(255)
);


CREATE TABLE HeThongRap(
	ma_he_thong_rap int PRIMARY KEY AUTO_INCREMENT,
	ten_he_thong_rap VARCHAR(255),
	logo VARCHAR(255)
);

CREATE TABLE CumRap(
	ma_cum_rap int PRIMARY KEY AUTO_INCREMENT,
	ten_cum_rap VARCHAR(255),
	dia_chi VARCHAR(255),
	ma_he_thong_rap int,
	FOREIGN KEY(ma_he_thong_rap) REFERENCES HeThongRap(ma_he_thong_rap)
);

CREATE TABLE RapPhim(
	ma_rap INT PRIMARY KEY AUTO_INCREMENT,
	ten_rap VARCHAR(255),
	ma_cum_rap INT,
	FOREIGN KEY(ma_cum_rap) REFERENCES CumRap(ma_cum_rap)
);

CREATE TABLE Ghe(
	ma_ghe INT PRIMARY KEY AUTO_INCREMENT,
	ten_ghe VARCHAR(255),
	loai_ghe VARCHAR(255),
	ma_rap int,
	FOREIGN KEY(ma_rap) REFERENCES RapPhim(ma_rap)
);

CREATE TABLE LichChieu(
	ma_lich_chieu INT PRIMARY KEY AUTO_INCREMENT,
	ma_rap int,
	FOREIGN KEY(ma_rap) REFERENCES RapPhim(ma_rap),
	ma_phim int,
	FOREIGN KEY(ma_phim) REFERENCES Phim(ma_phim),
	ngay_gio_chieu DATETIME,
	gia_ve INT
);

CREATE TABLE NguoiDung(
	user_id int PRIMARY KEY AUTO_INCREMENT,
	ho_ten VARCHAR(255),
	email VARCHAR(255),
	so_dt VARCHAR(30),
	mat_khau VARCHAR(255),
	loai_nguoi_dung VARCHAR(255)
);


CREATE TABLE DatVe(
	ma_ve INT PRIMARY KEY AUTO_INCREMENT,
	user_id INT,
	FOREIGN KEY(user_id) REFERENCES NguoiDung(user_id),
	ma_lich_chieu INT,
	FOREIGN KEY(ma_lich_chieu) REFERENCES LichChieu(ma_lich_chieu),
	ma_ghe INT,
	FOREIGN KEY(ma_ghe) REFERENCES Ghe(ma_ghe)
);



