import { EmailValidation } from './../email/email-validation'
import { ValidationBuilder } from './validation-builder'
import { RequiredFieldValidation } from './../required-field/required-field-validation'

describe('ValidationBuilder', () => {
  test('should return RequiredFieldValidation', () => {
    const validations = ValidationBuilder.field('any_field').required().build()
    expect(validations).toEqual([new RequiredFieldValidation('any_field')])
  })

  test('should return EmailValidation', () => {
    const validations = ValidationBuilder.field('any_field').email().build()
    expect(validations).toEqual([new EmailValidation('any_field')])
  })
})
