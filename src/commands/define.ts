import * as path from 'path'
import { writeJSON } from '../utils'
import {
  LernaChangelogLabel,
  CommandHandler,
  CommandOption
} from '../../types'

import { debug as Debug } from 'debug'
const debug = Debug('lerna-changelog-label-schema:commands:define')

const define: CommandHandler = async (options: CommandOption) => {
  const { preset, cwd } = options
  debug(`preset= ${preset}, cwd=${cwd}`)

  if (!(preset === 'default' || preset === 'full')) {
    return false
  }

  if (!cwd) {
    return false
  }

  const schema = await import(`../schema/${preset}`)
  const labels = schema.labels as LernaChangelogLabel[]
  debug('labels', labels)

  let pkgPath = ''
  let pkgJSON = {} as JSON
  try {
    pkgPath = path.resolve(cwd as string, './package.json')
    pkgJSON = require(pkgPath) as JSON
    debug('pkgJSON', pkgJSON)
  } catch (e) {
    return false
  }

  // TODO: shoudl be typed changelogCaptions
  const changelogCaptions = labels.reduce((captions: any, label) => {
    captions[`Type: ${label.type}`] = `${label.emoji} ${label.caption}`
    return captions
  }, {})
  debug('changelogCaptions', changelogCaptions)

  const newPkgJSON = applyToPacakge(pkgJSON, changelogCaptions)
  debug('newPkgJson', newPkgJSON)
  writeJSON(pkgPath, newPkgJSON)
  console.log(`apply lerna-changelog label '${preset}' schema to package.json`)

  return true
}

function applyToPacakge (pkg: JSON, labels: JSON) {
  return Object.assign(pkg, { changelog: { labels }})
}

export default define
