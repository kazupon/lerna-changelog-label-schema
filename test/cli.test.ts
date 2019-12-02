import defaultPreset from '../preset/default.json'
import fullPreset from '../preset/full.json'

// -------
// mocking

const TARGET_PATH = '/path/to/project1'
const JSON_FILES = {
  '../preset/default.json':  defaultPreset,
  '../preset/full.json':  fullPreset,
  './package.json':  {}
}

let orgCwd // for process.cwd mock

// mock: ../src/utils
jest.mock('../src/utils', () => ({
  __esModule: true,
  ...jest.requireActual('../src/utils'),
  resolve: jest.fn(),
  readJSON: jest.fn(),
  writeJSON: jest.fn()
}))
import * as utils from '../src/utils'

// -------------------
// setup/teadown

beforeEach(() => {
  orgCwd = process.cwd
  process.cwd = jest.fn(() => TARGET_PATH) // mock: process.cwd
})

afterEach(() => {
  jest.clearAllMocks()
  process.cwd = orgCwd
})

// -------------------
// tests

test('default', async () => {
  // setup mocks
  // process.argv = ['/path/to/node', 'cli']
  //await mockArgv()
  const mockUtils = utils as jest.Mocked<typeof utils>
  mockUtils.resolve.mockImplementation((...paths) => paths[1])
  mockUtils.readJSON.mockImplementation(path => JSON_FILES[path])
  const writeFiles = {}
  mockUtils.writeJSON.mockImplementation((path, json) => {
    writeFiles[path as string] = json
  })

  // run
  const { run } = await import('../src/cli')
  const cli = run()

  // checking
  expect(cli.flags).toMatchObject({
    preset: 'default',
    p: 'default'
  })
  expect(writeFiles['./package.json']).toMatchObject({
    changelog: {
      labels: defaultPreset
    }
  })
})

test('full', async () => {
  // setup mocks
  // process.argv = ['/path/to/node', 'cli', '--preset=full']
  // await mockArgv(['--preset=full'])
  const mockUtils = utils as jest.Mocked<typeof utils>
  mockUtils.resolve.mockImplementation((...paths) => paths[1])
  mockUtils.readJSON.mockImplementation(path => JSON_FILES[path])
  const writeFiles = {}
  mockUtils.writeJSON.mockImplementation((path, json) => {
    writeFiles[path as string] = json
  })

  // run
  const { run } = await import('../src/cli')
  const cli = run(['--preset=full'])

  // checking
  expect(cli.flags).toMatchObject({
    preset: 'full',
    p: 'full'
  })
  expect(writeFiles['./package.json']).toMatchObject({
    changelog: {
      labels: fullPreset
    }
  })
})