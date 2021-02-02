

exports.landingPage = (req,res,next) => {
    res.render('landingPage',{
        nombrePagina: 'Radi',
        tagline: 'Encuentra a tu mejor amigo aqui!'
    });
}

exports.about = (req,res) => {
    res.render('acerca',{
        nombrePagina: "Acerca de Radi"
    })
}