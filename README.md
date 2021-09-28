# bot-telegram-phillips-hue

Este es un bot utilizado para el control de luces Phillips Hue a través de un bot de telegram.

## Instalación

Para utilizarlo, clonar el proyecto y descargar las dependencias con el siguiente comando: 

```bash
npm install
```

## Configuración

Voy a subir una actualización para configurarlo fácilmente en los próximos días.

## Uso

Para inicializar el server: 

```bash
npm start
```

Comandos del bot de Telegram: 

```bash
/encender
```
```bash
/apagar
```
```bash
/obtenerLuces
```
```bash
/cambiarColor
```
## Librerías utilizadas

Para interacción con la API de Phillips Hue:

https://www.npmjs.com/package/node-hue-api

Para cambiar el formato de colores de formato RGB a formato XY:

https://www.npmjs.com/package/@q42philips/hue-color-converter
