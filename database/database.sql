create database BlockBusted;

use BlockBusted;

create table Usuario(
	id_usuario int primary key AUTO_INCREMENT,
    Usuario varchar(20) not null,
    Correo varchar(30) not null,
    Contraseña varchar(30) not null,
    Nombres varchar(30) not null,
    Apellidos varchar(30) not null,
    DPI int not null,
    Edad int not null
);

create table Alquiler(
	id_alquiler int primary key auto_increment,
    id_Movie int not null,
    usuario int not null,
    constraint foreign key(id_Movie) references Movie(id_Movie),
    constraint foreign key(usuario) references Usuario(id_usuario)
);

create table Pago_Pelicula(
	id_pago int primary key auto_increment,
    alquiler int not null,
    Numero_tarjeta_credito int(16) not null,
    Fecha_expiracion varchar(20) not null,
    Codigo_verificacion int(3) not null,
    Monto_apagar double	not null,
    Modena_apagar varchar(30),
    constraint foreign key(alquiler) references Alquiler(id_alquiler)
);

create table Lenguage(
	id_lenguage int primary key AUTO_INCREMENT,
    code int not null,
    descripcion varchar(200)  
);


create table Availabitity(
	id_availabitity int primary key auto_increment,
    name varchar(30) not null,
    ServiceDays int not null,
    BonusDays int not null,
    fine varchar(15) not null
);

create table ExchangeRate(
	total varchar(20) not null
);

create table Movie(
	id_Movie int primary key auto_increment,
    name varchar(30) not null,
    image varchar(200) not null,
    ChargeRate int not null,
    active char(1) not null,
    availabilities int not null,
    languages int not null,
    constraint foreign key(availabilities) references Availabitity(id_availabitity),
    constraint foreign key(languages) references Lenguage(id_lenguage)
);

	 