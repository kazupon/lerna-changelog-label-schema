// -------
// mocking

const TARGET_PATH = '/path/to/project1'

let orgCwd // for process.cwd mock

// mock: ../src/commands
jest.mock('../src/commands', () => ({
  define: jest.fn(),
  generate: jest.fn()
}))
import * as commands from '../src/commands'

// -------------------
// setup/teadown

let spyLog
beforeEach(() => {
  orgCwd = process.cwd
  process.cwd = jest.fn(() => TARGET_PATH) // mock: process.cwd
  spyLog = jest.spyOn(global.console, 'log')
})

afterEach(() => {
  spyLog.mockRestore()
  jest.clearAllMocks()
  process.cwd = orgCwd
})

// -------------------
// tests

test('define command', async () => {
  // setup mocks
  const { define } = commands as jest.Mocked<typeof commands>
  define.mockImplementation(options => Promise.resolve(true))

  // run
  const { run } = await import('../src/cli')
  const cli = await run(['define', '--preset=full'])

  // verify
  expect(cli.flags).toMatchObject({ preset: 'full', p: 'full' })
  expect(define).toHaveBeenCalledWith({ preset: 'full', cwd: TARGET_PATH })
})

test('generate command', async () => {
  // setup mocks
  const { generate } = commands as jest.Mocked<typeof commands>
  generate.mockImplementation(options => Promise.resolve(true))

  // run
  const { run } = await import('../src/cli')
  const cli = await run(['g', '--output=/path/to/preset.json'])

  // verify
  expect(cli.flags).toMatchObject({ preset: 'default', p: 'default', output: '/path/to/preset.json' })
  expect(generate).toHaveBeenCalledWith({ preset: 'default', output: '/path/to/preset.json' })

})

test('version command', async () => {
  // run
  const { run } = await import('../src/cli')
  const cli = await run(['version'])

  // verify
  expect(spyLog).toHaveBeenCalledWith(cli.pkg.version)
})

test('show help', async () => {
  // run
  const { run } = await import('../src/cli')
  const cli = await run()

  // verify
  expect(spyLog.mock.calls[0][0]).toMatchSnapshot()
})