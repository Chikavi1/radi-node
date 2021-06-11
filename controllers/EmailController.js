var nodemailer = require('nodemailer');
const enviarEmail = require('../handlers/email');
const axios = require('axios');

exports.sendEmail = async (req,res,next) => {

    const { name,email,message } = req.body;
   
    // var transporter = nodemailer.createTransport({
    //     service: 'Gmail',
    //     auth: {
    //         user: 'chikavi10@gmail.com',
    //         pass: 'zvcvhasrrwduwmzd'
    //     }
    // });

    // var mailOptions = {
    //     from: name,
    //     to: 'chikavi@hotmail.com',
    //     subject: 'mensaje enviado por: '+ email,
    //     text: message
    // };

    

    // transporter.sendMail(mailOptions, function(error, info){
    //     if (error){
    //         console.log(error);
    //         res.send(500, error.message);
    //     } else {
    //         console.log("Email sent");
    //         res.status(200).jsonp(req.body);
    //     }
    // });

    axios.post('https://onesignal.com/api/v1/notifications', {
        app_id: 'e15689c2-569b-482f-9364-a8fca5641826',
        data: { "userId" : "Postman-1234" },
        contents: { en: "English message from Postman", es: "Reservación para el viernes 30 de abril de 2021 de 8:00 am a 9:00 am" },
        headings: { en: "English Title", es: "Reservacion en Radi🐶" },
        include_player_ids: ["75f57802-eebf-49ec-a9b6-911a07f1edb2"]
      })
      .then(function (response) {
          console.log('jejejej');
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    const resetUrl = `http://localhost:3000/reestablecer/112asdasddas`;
    const usuario  = 'chikavi';

    await enviarEmail.enviar({
        usuario,
        subject: 'Reestablecer contraseña',
        resetUrl,
        archivo: 'reservacion'
    });
 
    res.json({ mensaje:'Se ha enviado el correo' });

    // res.send('Recibido');

}