# Documentación de la API

## Iniciar la aplicacion

para iniciar la aplicacion hay que ubicarse en el directorio raiz de la aplicacion, 
y ubicarse en el directorio "conversiones" desde la terminal.
Entonces se debe escribir npm start en la terminal para levantar el servidor de express que escuchara las peticiones.

Recuerda que debes compilar typescript para ver la ultima version cada vez que hagas cambios en el backend. lo compilas con npm run build

## Acceder a la aplicacion desde otros dispositivos

Puedes visualizar la aplicacion en la red local (bien se desde otros dispositivos de la misma red local, como tu telefono, tablet, u otras computadoras) accediendo a http://192.168.68.65:5174/ o la direccion indicada en la terminal donde dice Network: http://192.168.68.65:5174/ una vez inicies el servidor de vite con NPM RUN DEV.

Es decir, al ejecutar NPM RUN DEV, la terminal te mostrara la direccion de la aplicacion en localhost y tambien mostrara una serie de direcciones indicadas con la palabra NETWORK.
La que puede ser accedida desde otros dispositivos en la misma red local es la que se encuentra en la direccion 168.68.65:5174 en este caso.
Las que empiezan con 127 y 172 son interfaces de red de la computadora y son accesibles solo desde la misma computadora.

## Acceder a los datos del backend desde el otro dispositivo que esta ejecutando el frontend


Para que se pueda acceder a los datos del backend desde el otro dispositivo que esta ejecutando el frontend, debes 

* modificar el archivo vite.config.js para agregarle la siguiente linea:
proxy: {
      '/api': { //colocarle /api
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''), //y la regla rewrite
      }
    }

Ademas de 
* agregar la direccion 0.0.0.0 como segundo parametro en la funcion listen en el archivo que hace el servidor de node.
app.listen port, "0.0.0.0",() =>  (index.ts en este caso)

Luego, 
* en todas las partes donde el frontend hace peticiones al backend, debes agregarle /api al inicio de la peticion, como en el componente header que le cambiamos la linea
const resp = await axios.get("http://localhost:3000/");
por 
const resp = await axios.get("/api/");

## Endpoints Disponibles

### GET http://localhost:3000/calculos

En este endpoint puedes convertir de USDT a Bolivares, y automaticamente te da el equivalente en dolares a tasa euro y bolivares a tasa euro. Asi como bolivares a tasa de dolar BCV, y a bolivares a tasa de Dolar BCV.
Solo introduce el monto y la moneda.
Si vas a pagar en Bolivares a tasa DOLAR BCV y quieres saber cuantos dolares y cuantos USDT estarias pagando, en moneda debes elegir bs_bcv

Si vas a pagar en Bolivares a tasa Euro de BCV, y quieres saber a cuantos dolares BCV y cuantos USDT equivale lo que estarias pagando, en moneda debes seleccionar dolar_euro_bcv.

Si tienes BINANCE USDT y quieres saber a cuantos bolivares BCV y EURO equivale esa cantidad de USDT, en moneda debes seleccionar 'usdt'

payload
monto
moneda


Hace el calculo para convertir el monto especificado en la moneda especificada, por las monedas contrarias.
Por ejemplo si se le especifica que el monto seran 2 y la moneda sera USDT la aplicacion va a tomar el valor del USDT (que por ahora en la aplicacion son 420) y va a calcular cuantos bolivares serian esos 2 usdt, y a cuantos dolares (o euros) equivalen esos 2 usdt.

para enviar la peticion desde el backend se debe enviar un json como el siguiente
{
  "monto": 2,
  "moneda": "usdt"
}
desde la pesta;a JSON en thunderClient (un plugin de VS CODE) o desde la pesta;a BODY> RAW> JSON en POSTMAN. 

Tambien desde CURL puedes hacer la siguiente peticion

curl --location 'http://localhost:3000/calculos' \--header 'Content-Type: application/json' \--data '{"monto": 399,"moneda": "bs_bcv"}'

## monedas disponibles

### bs_bcv
### dolar_euro_bcv
### bs_euro_bcv
### usdt

Es decir, para enviar la peticion como json, se debe especificar la moneda que quieres convertir con una de las disponibles.

## Modificar los precios de las monedas.

Como el precio de las monedas se infla o de devalua todos los dias, la aplicacion permite enviar una peticion al endpoint ....tal.... para modificar el precio de una moneda y hacer los calculos en base a ese valor. Eso para cuando haya una base de datos.

## HOME

http://localhost:3000/home 

Aqui puedes ver el json con los mensajes para el frontend y los precios de las monedas establecidos actualmente.

## Documentacion SWAGGER
Swagger es una libreria que se puede instalar con npm install --save-dev @types/swagger-ui-express (este ultimo comando trabajara el swagger con typescript) Y apartir de ahi se configura en un archivo swagger.config.js, luego se importa en el index.js de la aplicacion ( import swaggerUI from "swagger-ui-express", import specs from "./swagger.config.js";) y luego leera mi archivo de rutas del frontend para generar documentacion en el endpoint de abajo (api-docs, o docs por lo general).
Las rutas se deben documentar con comentarios del tipo /**
 * @swagger
 * /home:
 *   get:



http://localhost:3000/api-docs 