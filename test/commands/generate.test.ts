import * as path from 'path'
import generate from '../../src/commands/generate'

// ----------
// mocks

jest.mock('../../src/utils', () => ({
  ...jest.requireActual('../../src/utils'),
  writeJSON: jest.fn()
}))
import * as utils from '../../src/utils'

// -------------------
// setup/teadown hooks

let spyLog
let spyError
beforeEach(() => {
  spyLog = jest.spyOn(global.console, 'log')
  spyError = jest.spyOn(global.console, 'error')
})

afterEach(() => {
  spyError.mockRestore()
  spyLog.mockRestore()
  jest.clearAllMocks()
})

// ----------
// tests

test('preset: default', async () => {
  // run
  const ret = await generate({ preset: 'default' })

  // verify
  expect(ret).toBe(true)
  expect(spyLog.mock.calls[0][0]).toMatchSnapshot()
})

test('preset: full', async () => {
  // run
  const ret = await generate({ preset: 'full' })

  // verify
  expect(ret).toBe(true)
  expect(spyLog.mock.calls[0][0]).toMatchSnapshot()
})

test('preset: other', async () => {
  // run
  const ret = await generate({ preset: 'foo' })

  // verify
  expect(ret).toBe(false)
})

test('output: success', async () => {
  // setup mocks
  const mockUtils = utils as jest.Mocked<typeof utils>
  mockUtils.writeJSON.mockImplementation((path, json) => (Promise.resolve()))

  // run
  const output = path.resolve('./test/fixture/output.json')
  const ret = await generate({ preset: 'full', output })

  // verify
  expect(ret).toBe(true)
  expect(mockUtils.writeJSON.mock.calls[0][0]).toEqual(output)
  expect(mockUtils.writeJSON.mock.calls[0][1]).toMatchSnapshot()
})

test('output: fail', async () => {
  // setup mocks
  const mockUtils = utils as jest.Mocked<typeof utils>
  mockUtils.writeJSON.mockImplementation((path, json) => (Promise.reject(new Error('write error!!'))))

  // run
  const output = path.resolve('./test/fixture/output.json')
  const ret = await generate({ preset: 'default', output })

  // verify
  expect(ret).toBe(false)
  expect(spyError).toHaveBeenCalledWith('write error!!')
})
