sexports.landingPage = (req,res,next) => {
    res.send("XD")
}

exports.about = (req,res) => {
    res.render('acerca',{
        nombrePagina: "Acerca de Radi"
    })
}