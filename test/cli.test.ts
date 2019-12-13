// -------
// mocking

const TARGET_PATH = '/path/to/project1'

let orgCwd // for process.cwd mock

// mock: ../src/commands/define
jest.mock('../src/commands/define', () => jest.fn())
import define from '../src/commands/define'

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

test('define', async () => {
  // setup mocks
  const mockDefine = define as jest.MockedFunction<typeof define>
  mockDefine.mockImplementation(options => Promise.resolve(true))

  // run
  const { run } = await import('../src/cli')
  const cli = await run(['define', '--preset=full'])

  // verify
  expect(cli.flags).toMatchObject({ preset: 'full', p: 'full' })
  expect(mockDefine).toHaveBeenCalledWith({ preset: 'full', cwd: TARGET_PATH })
})
