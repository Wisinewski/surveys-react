import { MinLengthValidation } from './min-length-validation';
import { InvalidFieldError } from './../../errors/invalid-field-error';

describe('MinLengthValidation', () => {
  test('should return error if value is invalid', () => {
    const sut = new MinLengthValidation('field', 5)
    const error = sut.validate('123')
    expect(error).toEqual(new InvalidFieldError())
  });
});