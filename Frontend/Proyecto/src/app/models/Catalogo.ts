export interface Catalogo {
    id_Movie?: number;
    name?: string;
    image?: string;
    ChargeRate?: number;
    active?: string;
    availabilities?: number;
    languages?: number;
}

export interface Pelicula_Alquilada{
    id_Movie?: number;
    name?: string;
    image?: string;
    ChargeRate?: number;
}

export interface DetalleAlquilerInterface{//parte del usuario admin

    transaccionn: string,
    nombress: string,
    apellidoss: string,
    dpii: number,
    correoo: string,
    namee: string,
    chargeratee: number
}

export interface DetallePagoInterface{//parte del usuario admin

    Transaccion: string,
    Nombres: string,
    Apellidos: string,
    DPI: number,
    Correo: string,
    name: string
    Fecha_expiracion: string,
    Monto_apagar: number,
    Modena_apagar: string
}