import * as path from 'path'

// mock: fs
jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  writeFile: jest.fn()
}))
import fs from 'fs'

import { readJSON, writeJSON } from '../src/utils'

// ----------
// tests

test('readJSON', async () => {
  const jsonPath = path.resolve('./test/fixtures/data.json')
  const json = await readJSON(jsonPath)
  expect(json).toMatchObject({
    hello: 'hi!'
  })
})

test('writeJSON: success', async () => {
  // setup mocks
  const mockFS = fs as jest.Mocked<typeof fs>
  const json = {
    foo: 'foo',
    bar: 1
  }
  let rawData = null
  mockFS.writeFile.mockImplementation((path, data, fn) => {
    rawData = data
    fn(null)
  })

  await writeJSON('/path/to/data.json', json)
  expect(rawData).toEqual(JSON.stringify(json, null, 2))
})

test('writeJSON: fail', async () => {
  // setup mocks
  const mockFS = fs as jest.Mocked<typeof fs>
  const json = {
    foo: 'foo',
    bar: 1
  }
  mockFS.writeFile.mockImplementation((path, data, fn) => {
    fn(new Error('error!'))
  })

  await writeJSON('/path/to/data.json', json).catch(e => {
    expect(e.message).toEqual('error!')
  })
})
