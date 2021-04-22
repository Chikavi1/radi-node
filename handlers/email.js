const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const util = require('util');

var transport = nodemailer.createTransport({
    service: 'Gmail',
        auth: {
            user: 'chikavi10@gmail.com',
            pass: 'zvcvhasrrwduwmzd'
        }
  });

  const generarHtml = (archivo,opciones = {}) => {
      const html = pug.renderFile(`${__dirname}/../views/emails/${archivo}.pug`, opciones );
      return juice(html);
  }


exports.enviar = async (opciones) => {
  const html = generarHtml(opciones.archivo,opciones);
  const text = htmlToText.fromString(html);
    let opcionesEmail = {
      from: 'Radi <no-reply@Radi.com>',
      to: opciones.usuario.email,
      subject: opciones.subject,
      text, 
      html 
    }

 const enviarEmail = util.promisify(transport.sendMail,transport);
 return enviarEmail.call(transport,opcionesEmail);

}