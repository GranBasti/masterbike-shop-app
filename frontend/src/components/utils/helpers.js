

// src/utils/helpers.js
export const formatPhoneNumber = (phone) => {
  if (!phone) return phone;
  // Formato: (XXX) XXX-XXXX
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
};