import * as path from 'path'
import define from '../../src/commands/define'

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
beforeEach(() => {
  spyLog = jest.spyOn(global.console, 'log')
})

afterEach(() => {
  spyLog.mockRestore()
  jest.clearAllMocks()
})

// ----------
// tests

test('preset: default', async () => {
  // setup mocks
  const mockUtils = utils as jest.Mocked<typeof utils>
  mockUtils.writeJSON.mockImplementation((path, json) => (Promise.resolve()))

  // run
  const cwd = path.resolve('./test/commands')
  const ret = await define({ preset: 'default', cwd })

  // verify
  expect(ret).toBe(true)
  expect(mockUtils.writeJSON).toHaveBeenCalledWith(`${cwd}/package.json`, {
    changelog: {
      labels: {
        'Type: Feature': ':star: Features',
        'Type: Bug': ':bug: Bug Fixes',
        'Type: Security': ':lock: Security Fixes',
        'Type: Performance': ':chart_with_upwards_trend: Performance Fixes',
        'Type: Improvement': ':zap: Improvement Features',
        'Type: Breaking': ':boom: Breaking Change',
        'Type: Deprecated': ':warning: Deprecated Features',
        'Type: I18n': ':globe_with_meridians: Internationalization',
        'Type: A11y': ':wheelchair: Accessibility',
        'Type: Documentation': ':pencil: Documentation'
      }
    }
  })
  expect(spyLog).toHaveBeenCalledWith(`apply lerna-changelog label 'default' schema to package.json`)
})


test('preset: full', async () => {
  // setup mocks
  const mockUtils = utils as jest.Mocked<typeof utils>
  mockUtils.writeJSON.mockImplementation((path, json) => (Promise.resolve()))

  // run
  const cwd = path.resolve('./test/commands')
  const ret = await define({ preset: 'full', cwd })

  // verify
  expect(ret).toBe(true)
  expect(mockUtils.writeJSON).toHaveBeenCalledWith(`${cwd}/package.json`, {
    changelog: {
      labels: {
        'Type: Feature': ':star: Features',
        'Type: Bug': ':bug: Bug Fixes',
        'Type: Security': ':lock: Security Fixes',
        'Type: Performance': ':chart_with_upwards_trend: Performance Fixes',
        'Type: Improvement': ':zap: Improvement Features',
        'Type: Breaking': ':boom: Breaking Change',
        'Type: Deprecated': ':warning: Deprecated Features',
        'Type: I18n': ':globe_with_meridians: Internationalization',
        'Type: A11y': ':wheelchair: Accessibility',
        'Type: Documentation': ':pencil: Documentation',
        'Type: Refactoring': ':shirt: Refactoring',
        'Type: Testing': ':white_check_mark: Testing',
        'Type: Maintenance': ':wrench: Maintenance',
        'Type: Example': ':lollipop: Example or demo',
        'Type: Dependency': ':pushpin: Dependency',
        'Type: Build': ':package: Build'
      }
    }
  })
  expect(spyLog).toHaveBeenCalledWith(`apply lerna-changelog label 'full' schema to package.json`)
})

test('preset: other', async () => {
  // run
  const cwd = path.resolve('./test/commands')
  const ret = await define({ preset: 'foo', cwd })

  // verify
  expect(ret).toBe(false)
})

test('cwd: falsy', async () => {
  // run
  const ret = await define({ preset: 'default', cwd: '' })

  // verify
  expect(ret).toBe(false)
})

test('not find package.json', async () => {
  // run
  const ret = await define({ preset: 'default', cwd: '/path/to' })

  // verify
  expect(ret).toBe(false)
})

  