const validar_registro = ({ username, password, confirmPassword }) => {
  const errors = {};

  if (username.trim() === '') {
    errors.username = 'Username required';
  }
  
  if (password.trim() === '') {
    errors.password = 'Password required';
  }
  else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords don\'t match';
  }
  
  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

const validar_login = (username, password) => {
  const errors = {};

  if (username.trim() === '' || password.trim() === '') {
    errors.general = 'Invalid login';
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