var nodemailer = require('nodemailer');

exports.sendEmail = (req,res,next) => {

    const { name,email,message } = req.body;
   
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'chikavi10@gmail.com',
            pass: 'zvcvhasrrwduwmzd'
        }
    });

    var mailOptions = {
        from: name,
        to: 'chikavi@hotmail.com',
        subject: 'mensaje enviado por: '+email,
        text: message
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error){
            console.log(error);
            res.send(500, error.message);
        } else {
            console.log("Email sent");
            res.status(200).jsonp(req.body);
        }
    });

    res.send('Recibido');

}