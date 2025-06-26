// Validation utility functions for user form

export const validationPatterns = {
  // Alphanumeric characters, underscores, and spaces only
  alphanumericUnderscoreSpace: /^[a-zA-Z0-9_ ]+$/,
  // Email pattern (basic email validation)
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  // Exactly 9 digits for TIN
  tin: /^\d{9}$/,
  // Exactly 10 digits for phone
  phone: /^\d{10}$/,
  // URL pattern (basic URL validation)
  url: /^https?:\/\/.+\..+/,
};

export const validationMessages = {
  maxLength: (field: string, max: number) => `${field} must be at most ${max} characters`,
  pattern: (field: string, pattern: string) => `${field} must ${pattern}`,
  required: (field: string) => `${field} is required`,
};

export const fieldValidationRules = {
  name: {
    required: validationMessages.required('Name'),
    maxLength: {
      value: 50,
      message: validationMessages.maxLength('Name', 50),
    },
    pattern: {
      value: validationPatterns.alphanumericUnderscoreSpace,
      message: validationMessages.pattern('Name', 'contain only letters, numbers, underscores, and spaces'),
    },
  },
  username: {
    required: validationMessages.required('Username'),
    maxLength: {
      value: 50,
      message: validationMessages.maxLength('Username', 50),
    },
    pattern: {
      value: validationPatterns.alphanumericUnderscoreSpace,
      message: validationMessages.pattern('Username', 'contain only letters, numbers, underscores, and spaces'),
    },
  },
  email: {
    required: validationMessages.required('Email'),
    maxLength: {
      value: 50,
      message: validationMessages.maxLength('Email', 50),
    },
    pattern: {
      value: validationPatterns.email,
      message: validationMessages.pattern('Email', 'be a valid email address'),
    },
  },
  userTin: {
    required: validationMessages.required('TIN'),
    pattern: {
      value: validationPatterns.tin,
      message: validationMessages.pattern('TIN', 'be exactly 9 digits'),
    },
  },
  phone: {
    required: validationMessages.required('Phone'),
    pattern: {
      value: validationPatterns.phone,
      message: validationMessages.pattern('Phone', 'be exactly 10 digits'),
    },
  },
  website: {
    pattern: {
      value: validationPatterns.url,
      message: validationMessages.pattern('Website', 'be a valid URL (starting with http:// or https://)'),
    },
  },
};