import { RequiredFieldError } from './../errors/required-field-error';
import { RequiredFieldValidation } from './required-field-validation';

type SutTypes = {
  sut: RequiredFieldValidation
}

const makeSut = (field?: string): SutTypes => {
  const sut = new RequiredFieldValidation(field)
  return {
    sut
  }
}

describe('RequiredFieldValidation', () => {
  test('should return error if field is empty', () => {
    const { sut } = makeSut('email')
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })
})
