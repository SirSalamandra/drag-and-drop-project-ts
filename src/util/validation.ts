export interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

export function validation(obj: Validatable) {
  let isValid = true;

  if (obj.required) {
    isValid = isValid && obj.value.toString().trim().length !== 0;
  }

  if (obj.minLength != null && typeof obj.value === "string") {
    isValid = isValid && obj.value.length > obj.minLength;
  }

  if (obj.maxLength != null && typeof obj.value === "string") {
    isValid = isValid && obj.value.length < obj.maxLength;
  }

  if (obj.min != null && typeof obj.value === "number") {
    isValid = isValid && obj.value >= obj.min;
  }

  if (obj.max != null && typeof obj.value === "number") {
    isValid = isValid && obj.value <= obj.max;
  }

  return isValid;
}