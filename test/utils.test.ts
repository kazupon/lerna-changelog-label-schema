// mock: fs
jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  readFileSync: jest.fn(),
  writeFileSync: jest.fn()
}))
import fs, { read } from 'fs'

import { resolve, readJSON, writeJSON } from '../src/utils'

// ----------
// tests

test('resolve', () => {
   expect(resolve('/path/to/project', 'foo.ts')).toEqual('/path/to/project/foo.ts')
})

test('readJSON', () => {
  const mockFS = fs as jest.Mocked<typeof fs>
  const json = {
    foo: 'foo',
    bar: 1
  }
  mockFS.readFileSync.mockImplementation(path => Buffer.from(JSON.stringify(json)))

  expect(readJSON('/path/to/data.json')).toMatchObject(json)
})

test('writeJSON', () => {
  const mockFS = fs as jest.Mocked<typeof fs>
  const json = {
    foo: 'foo',
    bar: 1
  }
  let rawData = null
  mockFS.writeFileSync.mockImplementation((path, data) => {
    rawData = data
  })

  writeJSON('/path/to/data.json', json)
  expect(rawData).toEqual(JSON.stringify(json, null, 2))
})