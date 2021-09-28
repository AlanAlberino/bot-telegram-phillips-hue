// -S frames -> la cantidad de frames a saltar, antes de tomar la foto
let tomarFotografia = () => {

    let procExterno=require('child_process').spawn;

    let p=procExterno('fswebcam',['-r 640x480','--no-banner', '-s brightness=70%','-S 20', 'image.jpg']);

    p.stdout.setEncoding('utf-8');

    p.stdout.on('data', (data)=>{
        console.log(data.toString());
    });

    p.on('close',(errorLevel)=>{
        console.log(`Fin del proceso, error level=${errorLevel}`)
    });
}

tomarFotografia();

module.exports = {
    tomarFotografia: tomarFotografia
}

