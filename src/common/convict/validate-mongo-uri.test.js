import { describe, expect, test } from 'vitest'
import { convictValidateMongoUri } from './validate-mongo-uri.js'

describe('#convictValidateMongoUri', () => {
  test('Given correct mongo-uri when validated should pass', () => {
    expect(() =>
      convictValidateMongoUri.validate('mongodb://127.0.0.1:27017')
    ).not.toThrow()
  })

  test('Given incorrect mongo-uri when validated should fail', () => {
    expect(() =>
      convictValidateMongoUri.validate('incorrect-mongo-uri')
    ).toThrow()
  })
})
