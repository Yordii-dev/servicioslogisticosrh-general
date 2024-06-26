export const Marker = (google) => ({
  next: (coord) => {
    const marker = new google.maps.Marker({
      position: coord,
      identificador: 1,
      /*       icon: "assets/markers/next.svg", */
    })
    return marker
  },
  customer: (coord, el) => {
    let config = {
      identificador: el.id,
      position: coord,
    }
    /* 
    if (el.status == "Entregado") {
      config.icon = "assets/markers/entregado.svg"
    }
    if (el.status == "Entrega Parcial") {
      config.icon = "assets/markers/parcial.svg"
    }

    if (el.status == "No Entregado") {
      config.icon = "assets/markers/no_entregado.svg"
    }

    if (el.status == "Devoluciones Programadas") {
      config.icon = "assets/markers/devolucion.svg"
    } */
    const marker = new google.maps.Marker(config)
    return marker
  },
  operator: (coord) => {
    const marker = new google.maps.Marker({
      draggable: true,
      title: "Hola",
      identificador: 1,
      position: coord,
      /*   icon: "assets/markers/operador.png", */
    })

    return marker
  },
})

/*
1: B
2: D
3 TODO LO ANTERIOR
4:D
5:C
6:C
7:?
8:A
9:C
10:B
11:

*/
