const validar_registro = ({ username, password, confirmPassword }) => {
  const errors = {};

  if (username.trim() === '') {
    errors.username = 'Se requiere un nombre de usuario';
  }
  
  if (password.trim() === '') {
    errors.password = 'Contraseña debe tener al menos 8 caracteres';
  }
  else if (password !== confirmPassword) {
    errors.confirmPassword = 'Las contraseñas no coninciden';
  }
  
  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

const validar_login = (username, password) => {
  const errors = {};

  if (username.trim() === '' || password.trim() === '') {
    errors.general = 'Login inválido';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

module.exports = {
  validar_registro,
  validar_login
}