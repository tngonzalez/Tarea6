var hombre = new Array("___\n", "   |\n", "   O\n", "  /", "|", "\\\n", "  /", " \\\n", "___")
var palabra
var libreriaPalabras = new Array("d i s e ñ o", "a p l i c a c i o n e s", "w e b",
"t a r e a", "c s s", "h t m l", "j a v a s c r i p t", "p a g i n a",
"j u e g o","o r d e n a d o r" )
var partes = 0
var colNueva = 0
var jugando


function ObtienePalabra() {
   var indice = Math.round ( Math.random() * 27 )
   var cadena = new String( libreriaPalabras[indice] )
   palabra = cadena.split(" ")
}


function DibujaHombre(visor, partes) {
   var dibujo = ""
   if (partes < 10)
      for(var x = 0; x < partes; x++) {
         dibujo += hombre[x]
      }
   visor.displayHombre.value = dibujo
}


function DibujaLetra(visor, letra) {
   var flag = false 
   var cadena = new String(visor.displayPalabra.value)
   var letrasCadena = cadena.split(" ")
   cadena = "" 
   for (var x = 0; x < palabra.length; x++) {
      if (palabra[x] == letra) {
         cadena += letra + " "
         flag = true
      } else
         cadena += letrasCadena[x] + " "
   }
   visor.displayPalabra.value = cadena
   return flag
}


function NuevaLetra(visor, letra) {
   visor.displayLetras.value += letra + " "
   if(colNueva == 3) {
      visor.displayLetras.value += "\n"
      colNueva = 0
   } else
      colNueva++
}


function Juega(visor, letra) {
   if (jugando) {
      NuevaLetra(visor, letra)
      var acierto = DibujaLetra(visor, letra)
      if (!acierto)
         DibujaHombre(visor, ++partes)
      if (partes == 9)
         FinJuego(false)
      else if (CompruebaPalabra(visor))
         FinJuego(true)
      } else {
         alert('Pulsa Juego nuevo para comenzar\nuna partida nueva.')
   }
}

function IniciaJuego(visor) {
   jugando = true
   partes = 0
   colNueva = 0
   ObtienePalabra()
   DibujaHombre(visor, partes)
   visor.displayPalabra.value = ""
   for (var x = 0; x < palabra.length; x++)
      visor.displayPalabra.value += "_ "
   visor.displayLetras.value = ""
}

function CompruebaPalabra(visor) {
   var fin = true
   var cadena = new String(visor.displayPalabra.value)
   var letrasCadena = cadena.split(" ")
   for(var x = 0; x < letrasCadena.length; x++)
      if (letrasCadena[x] == "_")
         fin = false
   return fin
}


function FinJuego(resultado) {
   var solucion = ""
   jugando = false 
   if (resultado) {
      document.visor.ganadas.value++
      alert("Acertaste !")
   } else {
     document.visor.perdidas.value++
     for (var x = 0; x < palabra.length; x++)
        solucion += palabra[x]
     alert("Has muerto !\n La palabra era: " + solucion)
   }
}