import { InvalidFieldError } from './../../errors/invalid-field-error';
import { EmailValidation } from './email-validation';
import faker from 'faker'

type SutTypes = {
  sut: EmailValidation
}

const makeSut = (): SutTypes => {
  const sut = new EmailValidation(faker.database.column())
  return {
    sut
  }
}

describe('EmailValidation', () => {
  test('should return error if email is invalid', () => {
    const { sut } = makeSut()
    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new InvalidFieldError())
  });

  test('should return falsy if email is valid', () => {
    const { sut } = makeSut()
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  });
});