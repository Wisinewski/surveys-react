import { MinLengthValidation } from './min-length-validation'
import { InvalidFieldError } from './../../errors/invalid-field-error'
import faker from 'faker'

type SutTypes = {
  sut: MinLengthValidation
}

const makeSut = (): SutTypes => {
  const sut = new MinLengthValidation(faker.database.column(), 5)
  return {
    sut
  }
}

describe('MinLengthValidation', () => {
  test('should return error if value is invalid', () => {
    const { sut } = makeSut()
    const error = sut.validate(faker.random.alphaNumeric(4))
    expect(error).toEqual(new InvalidFieldError())
  })

  test('should return falsy if value is valid', () => {
    const { sut } = makeSut()
    const error = sut.validate(faker.random.alphaNumeric(5))
    expect(error).toBeFalsy()
  })
})
