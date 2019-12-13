import { LernaChangelogLabel, GitHubLabelMeta } from '../../types'
import { labels as DefaultLabels, meta as DefaultMeta } from './default'

export const labels: LernaChangelogLabel[] = DefaultLabels.concat([{
  type: 'Refactoring',
  emoji: ':shirt:',
  caption: 'Refactoring',
  description: 'A code change that neither fixes a bug nor adds a feature'
}, {
  type: 'Testing',
  emoji: ':white_check_mark:',
  caption: 'Testing',
  description: 'Adding missing tests or correcting existing tests'
}, {
  type: 'Maintenance',
  emoji: ':wrench:',
  caption: 'Maintenance',
  description: 'Repository Maintenance'
}, {
  type: 'Example',
  emoji: ':lollipop:',
  caption: 'Example or demo',
  description: 'Includes example and demo code fixes'
}, {
  type: 'Dependency',
  emoji: ':pushpin:',
  caption: 'Dependency',
  description: 'Dependencies fixes'
}, {
  type: 'Build',
  emoji: ':package:',
  caption: 'Build',
  description: 'A packaging or a building fixes'
}])

export const meta: GitHubLabelMeta[] = DefaultMeta.concat([{
  type: 'Refactoring',
  color: 'fbca04',
  aliases: [
    'refactor',
    'refactoring'
  ]
}, {
  type: 'Testing',
  color: '0e8a16',
  aliases: [
    'test',
    'testing'
  ]
}, {
  type: 'Maintenance',
  color: 'e5ef7a',
  aliases: [
    'greenkeeper',
    'maintenance'
  ]
}, {
  type: 'Example',
  color: 'db0875',
  aliases: [
    'sample',
    'examples'
  ]
}, {
  type: 'Dependency',
  color: 'ffbce7',
  aliases: [
    'dependencies'
  ]
}, {
  type: 'Build',
  color: '5319e7',
  aliases: [
    'building'
  ]
}])
