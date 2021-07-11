import { Validation } from './../protocols/validation'

export class ValidationSpy implements Validation {
  input: object
  errorMessage: string
  validate (input: object): string {
    this.input = input
    return this.errorMessage
  }
}
