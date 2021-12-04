module.exports = (req, res, next) => {
  //console.log("Verificando Session");
  if (!req.session.authenticated)
    return res.status(401).json({ message: 'Usuário não logado!' });
  //Debug -> Consistencia Avançada no lado Servidor
  /*if (!store.sessions[req.sessionID])
    return res.status(401).json({ message: 'Usuário não logado!' });
    */
  next();
}