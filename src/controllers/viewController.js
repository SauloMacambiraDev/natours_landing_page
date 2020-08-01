
exports.home = async (req,res,next) => {
    return res.status(200).render('home')
}

exports.notFound = async (req,res,next) => {
    return res.status(404).render('notFound')
}