/**
 * Validuje email adresu
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validuje heslo a vráti chyby
 */
export const validatePassword = (password: string): string[] => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Heslo musí mať aspoň 8 znakov');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Heslo musí obsahovať aspoň jedno veľké písmeno');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Heslo musí obsahovať aspoň jedno malé písmeno');
  }

  if (!/\d/.test(password)) {
    errors.push('Heslo musí obsahovať aspoň jednu číslicu');
  }

  return errors;
};

/**
 * Kontroluje, či sa heslá zhodujú
 */
export const doPasswordsMatch = (
  password: string,
  confirmPassword: string
): boolean => {
  return password === confirmPassword;
};

/**
 * Validuje názov článku
 */
export const validateArticleTitle = (title: string): string[] => {
  const errors: string[] = [];

  if (!title.trim()) {
    errors.push('Názov článku je povinný');
  }

  if (title.length < 3) {
    errors.push('Názov článku musí mať aspoň 3 znaky');
  }

  if (title.length > 100) {
    errors.push('Názov článku nemôže byť dlhší ako 100 znakov');
  }

  return errors;
};

/**
 * Validuje obsah článku
 */
export const validateArticleContent = (content: string): string[] => {
  const errors: string[] = [];

  if (!content.trim()) {
    errors.push('Obsah článku je povinný');
  }

  if (content.length < 10) {
    errors.push('Obsah článku musí mať aspoň 10 znakov');
  }

  return errors;
};

/**
 * Validuje používateľské meno
 */
export const validateUsername = (username: string): string[] => {
  const errors: string[] = [];

  if (!username.trim()) {
    errors.push('Používateľské meno je povinné');
  }

  if (username.length < 3) {
    errors.push('Používateľské meno musí mať aspoň 3 znaky');
  }

  if (username.length > 20) {
    errors.push('Používateľské meno nemôže byť dlhšie ako 20 znakov');
  }

  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    errors.push(
      'Používateľské meno môže obsahovať len písmená, číslice a podčiarkovník'
    );
  }

  return errors;
};
