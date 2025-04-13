export type ValidationResult = {
  isValid: boolean;
  message?: string;
};

export type Validator<T> = (value: T) => ValidationResult;

export const createValidator = <T>(validators: Validator<T>[]) => {
  return (value: T): ValidationResult => {
    for (const validator of validators) {
      const result = validator(value);
      if (!result.isValid) {
        return result;
      }
    }
    return { isValid: true };
  };
};

// Common validators
export const required = <T>(message = "This field is required"): Validator<T> => {
  return (value: T): ValidationResult => {
    if (value === undefined || value === null || value === "") {
      return { isValid: false, message };
    }
    return { isValid: true };
  };
};

export const min = (minValue: number, message?: string): Validator<number> => {
  return (value: number): ValidationResult => {
    if (value < minValue) {
      return {
        isValid: false,
        message: message || `Value must be at least ${minValue}`,
      };
    }
    return { isValid: true };
  };
};

export const max = (maxValue: number, message?: string): Validator<number> => {
  return (value: number): ValidationResult => {
    if (value > maxValue) {
      return {
        isValid: false,
        message: message || `Value must be at most ${maxValue}`,
      };
    }
    return { isValid: true };
  };
};

export const useValidation = <T>(value: T, validator: Validator<T>) => {
  const result = validator(value);
  return {
    isValid: result.isValid,
    errorMessage: result.message,
    hasError: !result.isValid && result.message !== undefined,
  };
};
