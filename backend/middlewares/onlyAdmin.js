const onlyAdmin = (req, res, next) => {
  if (req.user && req.user.tipo === 'adm') {
    next();
  } else {
    return res.status(403).json({ message: 'Acesso negado: Admins apenas' });
  }
};

export default onlyAdmin;
