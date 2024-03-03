// Profe estéticamente no esta tan bueno porque el curso de html y css no lo hice. 

const api = "https://jsonplaceholder.typicode.com/users"

function productos (id , nombre , precio , pedido){
  this.id = id ;
  this.nombre = nombre ;
  this.precio = precio ;
  this.pedido = pedido ;
}

let producto1 = new productos (1 , "Canon" , 3000000 , 0) ;
let producto2 = new productos (2 , "Panasonic" , 2000000 , 0) ;
let producto3 = new productos (3 , "Sony" , 4000000 , 0) ;
let producto4 = new productos (4 , "Nikon" , 1000000 , 0) ;

const todosLosProductos  = [producto1 , producto2 , producto3 , producto4] ;

let cambio = document.getElementById ("cambio") ;
cambio.addEventListener ("mouseover" , function() {
    cambio.innerHTML = `
      La mejor tienda en fotocámeras
    `
    document.appendChild (cambio) ;
})
cambio.addEventListener ("mouseout" , () => {
      cambio.innerHTML = `
      Bienvenid@ a FotoPato
    `
    document.appendChild (cambio) ;
})

function grabarEnElLocal (a , b) {
  let grabarEnElLocal = localStorage.setItem (a , b) ;
  console.log (localStorage.getItem (a)) ;
}

function calcularTotal (d) {
    let sumaTotalCanon = producto1.precio * producto1.pedido ;
    let sumaTotalPanasonic = producto2.precio * producto2.pedido ;
    let sumaTotalSony = producto3.precio * producto3.pedido ;
    let sumaTotalNikon = producto4.precio * producto4.pedido ;
    let sumaTotalDeTodo = sumaTotalCanon + sumaTotalNikon + sumaTotalPanasonic + sumaTotalSony ;
  
    Swal.fire({
      title: sumaTotalDeTodo + " gastando por ahora",
      text: "Seguro no queres mas nada?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, quiero algo más"
    }).then((result) => {
      if (result.isConfirmed) {
        compraDeLaCamara (d) ;
      } else {
        Swal.fire("Gracias por confiar en nosotros, " + sumaTotalDeTodo + " tu total de la compra");
        let contenedorDeCompra = document.getElementById ("contDeCompra") ;
        let tituloFinal = document.createElement ("h1")
        tituloFinal.innerHTML = `
          Estos son los productos que compraste:
        `
        contenedorDeCompra.appendChild (tituloFinal) ;
        todosLosProductos.forEach (y => {
          let lista = document.createElement ("li")
          lista.innerHTML = `
          ${y.pedido} de ${y.nombre}
          `
          contenedorDeCompra.appendChild (lista) ;
        })
        let precioTotalFinal = document.createElement ("h2")
        precioTotalFinal.innerHTML = `
        Esto es el total a pagar : $${sumaTotalDeTodo}
        `
        contenedorDeCompra.appendChild (precioTotalFinal) ;
        setInterval (() => {
            precioTotalFinal.classList.add ("color")
        } , 3000)
      }
    });
  }

function compraDeLaCamara (c) {
  (async () => {
    const inputOptions = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
        Canon : "Canon" ,
        Panasonic : "Panasonic" ,
        Sony : "Sony" ,
        Nikon : "Nikon" 
       });
      }, 1000);
    });
    const { value: camara } = await Swal.fire({
      title: "Bienvenid@ " + c + ", elije los productos que quieras:",
      input: "radio",
      inputOptions,
      inputValidator: (value) => {
        if (!value) {
          return "No elejiste nada";
        }
      }
    });
    if (camara) {
      Swal.fire({ html: `Elejiste: ${camara}` });
      if (camara === "Canon") {
         producto1.pedido ++
         calcularTotal (c) ;
      } else if (camara === "Panasonic") {
        producto2.pedido ++ ;
        calcularTotal (c) ;
      } else if (camara === "Sony"){
        producto3.pedido ++;
        calcularTotal (c) ;
              } else if (camara === "Nikon") {
        producto4.pedido ++
        calcularTotal (c) ;
      }
    }
  })()
}

function comprobarUsuario (x) {
    fetch (api)
    .then (response => response.json())
    .then(datos => {
          console.table (datos) ;
          let fitrar = datos.filter ((i)=>i.username.includes (x))
          console.log (fitrar) ;
          grabarEnElLocal (x , JSON.stringify (fitrar)) ;
          let fitrar2 = datos.some ((i)=>i.username === x)
              if (fitrar2 == true) {
                compraDeLaCamara (x) ;
              } else {
                let newUsuario = [] ;
                Swal.fire({
                      title: "No existe este usuario: " + x ,
                      text: "Queres registrarte",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Si"
                    }).then((result) => {
                      if (result.isConfirmed) {
                      (async () => {
                            const { value: name } = await Swal.fire({
                              title: "Escribe tu nombre completo",
                              input: "text",
                              inputPlaceholder: ""
                            });
                            newUsuario.push (name) ;
                            if (name == null || name === "") {
                                  Swal.fire("No escribiste nada");
                            }else {
                                  (async () => {
                                        const { value: username } = await Swal.fire({
                                          title: "Escribe tu usuario",
                                          input: "text",
                                          inputPlaceholder: ""
                                        });
                                        newUsuario.push (username) ;
                                        if (username == null || username === "") {
                                          Swal.fire(`No escribiste nada`);
                                        } else {
                                              (async () => {
                                                    const { value: phone } = await Swal.fire({
                                                      title: "Escribe tu numero de telefono",
                                                      input: "text",
                                                      inputPlaceholder: ""
                                                    });
                                                    newUsuario.push (phone) ;
                                                    if (phone == null || phone === "") {
                                                          Swal.fire(`No escribiste nada`);
                                                    }else {
                                                          (async () => {
                                                                const { value: address } = await Swal.fire({
                                                                  title: "Escribe tu domicilio",
                                                                  input: "text",
                                                                  inputPlaceholder: ""
                                                                });
                                                                newUsuario.push (address) ;
                                                                if (address == null || address === "") {
                                                                  Swal.fire(`No escribiste nada`);
                                                                }else {
                                                                      (async () => {
                                                                            const { value: email } = await Swal.fire({
                                                                              title: "Ingrese tu email",
                                                                              input: "email",
                                                                              inputPlaceholder: ""
                                                                            });
                                                                            newUsuario.push (email) ;
                                                                            if (email == null || email === "") {
                                                                              Swal.fire(`No escribiste nada`);
                                                                            }else {
                                                                                  grabarEnElLocal (username , JSON.stringify(newUsuario)) ;
                                                                                  datos.push (newUsuario) ;
                                                                                  compraDeLaCamara (name) ;
                                                                            }
                                                                          })()
                                                                }
                                                              })()
                                                    }
                                                  })()
                                        }
                                    })()
                            }
                        })()    
                      }
                    });
                }
})
.catch (error => error = Swal.fire("No llegaron los usuarios"))
}

let contenedor = document.getElementById ("contenedor") ;
todosLosProductos.forEach ( x => {
      let li = document.createElement ("li")
      li.innerHTML = `
            ${x.nombre} que cuesta  $${x.precio}
      `
      contenedor.appendChild (li) ;
})

let toque = document.getElementById ("toque") ;
toque.addEventListener ("click" , function() {
    (async () => {
        const { value: usuario } = await Swal.fire({
          title: "Ingrese tu usuario",
          input: "text",
          inputPlaceholder: ""
        });
        if (usuario == null || usuario === "") {
          Swal.fire(`No escribiste nada`);
        } else {
          comprobarUsuario (usuario) ;
        }
    })()
})

 
