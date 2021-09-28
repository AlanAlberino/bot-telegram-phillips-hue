const { session, Scenes, Telegraf } = require('telegraf');

const phillipsHue = require('./phillips-hue');

const bot = new Telegraf("1994581852:AAHnXB5t0BQrUgUvdCczpGYGqO8MTwX6uKA");

const lightColorWizard = new Scenes.WizardScene(
    'LIGHT_COLOR_WIZARD',
    (ctx) => {
        phillipsHue.getLights.then(luces => {
            ctx.reply(`¿A que luz le quiere cambiar el color? \n${luces}`);
            ctx.wizard.state.luz = 0;
            return ctx.wizard.next(); 
        });
    },
    (ctx) => {
        //Insertar validacion
        ctx.wizard.state.luz = ctx.message.text.replace("/", "");
        ctx.reply('Ingrese el color hexadecimal que quiere establecer (Ej: #ff0000 para el color rojo):');
        return ctx.wizard.next();
    },
    async (ctx) => {
        ctx.wizard.state.color = ctx.message.text.replace("/", "");
        phillipsHue.setLightColor(ctx.wizard.state.color, ctx.wizard.state.luz);
        ctx.reply(`El color de la lampara ${ctx.wizard.state.luz} se ha cambiado a ${ctx.wizard.state.color} exitósamente.`);
        return ctx.scene.leave();
    }
);

const lightTurnOffWizard = new Scenes.WizardScene(
    'LIGHT_TURN_OFF_WIZARD',
    (ctx) => {
        phillipsHue.getLights.then(luces => {
            ctx.reply(`¿Que luz quiere apagar? \n${luces}`);
            ctx.wizard.state.luz = 0;
            return ctx.wizard.next(); 
        });
    },
    async (ctx) => {
        ctx.wizard.state.luz = ctx.message.text.replace("/", "");
        phillipsHue.turnLightOff(ctx.wizard.state.luz);
        ctx.reply(`La lampara ${ctx.wizard.state.luz} se ha apagado exitósamente.`);
        return ctx.scene.leave();
    }
);

const lightTurnOnWizard = new Scenes.WizardScene(
    'LIGHT_TURN_ON_WIZARD',
    (ctx) => {
        phillipsHue.getLights.then(luces => {
            ctx.reply(`¿Que luz quiere prender? \n${luces}`);
            ctx.wizard.state.luz = 0;
            return ctx.wizard.next(); 
        });
    },
    async (ctx) => {
        ctx.wizard.state.luz = ctx.message.text.replace("/", "");
        phillipsHue.turnLightOn(ctx.wizard.state.luz);
        ctx.reply(`La lampara ${ctx.wizard.state.luz} se ha prendido exitósamente.`);
        return ctx.scene.leave();
    }
);

const stage = new Scenes.Stage([lightColorWizard, lightTurnOffWizard, lightTurnOnWizard]);
bot.use(session());
bot.use(stage.middleware());

bot.command('cambiarColor', ctx => {
    /*let parametros = ctx.message.text.split(' ');
    let id = parametros[1];
    let color = parametros[2];
    console.log(`ID: ${id}`);
    console.log(`Color: ${color}`);
    phillipsHue.setLightColor(color, id);*/
    ctx.scene.enter('LIGHT_COLOR_WIZARD')
})

bot.command('apagar', ctx => {
    ctx.scene.enter('LIGHT_TURN_OFF_WIZARD')
})

bot.command('prender', ctx => {
    ctx.scene.enter('LIGHT_TURN_ON_WIZARD')
})

bot.command('stop', ctx => {
    bot.stop();
})
/*
bot.command('tomarFoto', ctx => {
    tomarFotografia();
    bot.telegram.sendPhoto(ctx.chat.id, {
        source: "image.jpg"
    })
})*/

bot.command('obtenerLuces', ctx => {
    phillipsHue.getLights.then(luces => {
        bot.telegram.sendMessage(ctx.chat.id, luces);
      });
})



process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

bot.launch();