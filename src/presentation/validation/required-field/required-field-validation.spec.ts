import { RequiredFieldError } from './../errors/required-field-error';
import { RequiredFieldValidation } from './required-field-validation';
import faker from 'faker'

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

  test('should return falsy if field is not empty', () => {
    const { sut } = makeSut('email')
    const error = sut.validate(faker.random.word())
    expect(error).toBeFalsy()
  })
})
