import { writeJSON } from '../utils'
import {
  GitHubLabelMeta,
  LernaChangelogLabel,
  GitHubLabel,
  CommandHandler,
  CommandOption
} from '../../types'

import { debug as Debug } from 'debug'
const debug = Debug('lerna-changelog-label-schema:commands:generate')

const generate: CommandHandler = async (options: CommandOption) => {
  const { preset, output } = options
  debug(`preset= ${preset}, output=${output}`)

  if (!(preset === 'default' || preset === 'full')) {
    return false
  }

  const schema = await import(`../schema/${preset}`)
  const labels = schema.labels as LernaChangelogLabel[]
  const meta = schema.meta as GitHubLabelMeta[]
  debug('labels', labels)
  debug('meta', meta)

  const githubLabels = labels.map((label, index) => {
    const m = meta[index]
    if (m.type !== label.type) {
      throw new Error(`Invalid generating: label=${label.type}, meta=${m.type}, index=${index}`)
    }
    const ghLabel: GitHubLabel = {
      name: `Type: ${label.type}`,
      color: m.color
    }
    if (label.description) {
      ghLabel.description = label.description
    }
    if (m.aliases) {
      ghLabel.aliases = m.aliases
    }
    return ghLabel
  }) as GitHubLabel[]
  debug('githubLabels', githubLabels)

  let ret = true
  if (output) {
    try {
      await writeJSON(output as string, githubLabels)
    } catch (e) {
      console.error(e.message)
      ret = false
    }
  } else {
    console.log(JSON.stringify(githubLabels, null, 2))
  }

  return ret
}

export default generate
