
function validar_registro(data:any){

  const { nombres,apellidos,usuario,edad,dpi,correo,contraseña } = data;

 
   if ( typeof nombres !== "string" || nombres === "" || !(/^[A-Z]+[A-Z\s]*$/i.test(nombres)) ){
      return "Los nombres no son validos para ser registrados.";

  }else if(typeof apellidos !== "string" || apellidos === "" || !(/^[A-Z]+[A-Z\s]*$/i.test(apellidos))){
      return "Los apellidos no son validos para ser registrados.";

  }else if(typeof usuario !== "string" || usuario === "" ){
    return "El usuario no es valido para ser registrado.";

  }else if(typeof edad!== "number" || edad===null || edad===0){
      return "La edad no es valido para ser registrado.";

  }else if(typeof dpi !== "number" ||  dpi===null || dpi === 0){
      return "El dpi no es valido para ser registrado.";

  }else if(typeof correo !== "string" || correo === "" || 
   !(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(correo)) ){
      return "El correo no es valido para ser registrado.";

  }else if(typeof contraseña !== "string" || contraseña === ""){
      return "La contraseña no es valido para ser registrado.";
  }

  return "";

}



 export default validar_registro;

