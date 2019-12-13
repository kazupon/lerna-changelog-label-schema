export type Preset = 'default' | 'full'

export type LernaChangelogType = 
  | 'Feature'
  | 'Bug'
  | 'Security'
  | 'Performance'
  | 'Improvement'
  | 'Breaking'
  | 'Deprecated'
  | 'I18n'
  | 'A11y'
  | 'Refactoring'
  | 'Testing'
  | 'Documentation'
  | 'Example'
  | 'Dependency'
  | 'Maintenance'
  | 'Build'

export type LernaChangelogLabel = {
  type: LernaChangelogType
  emoji: string
  caption: string
  description?: string
}

export type GitHubLabelMeta = {
  type: string
  color: string
  aliases?: string[]
}

export type GitHubLabel = 
  & Pick<GitHubLabelMeta, 'color' | 'aliases'>
  & Pick<LernaChangelogLabel, 'description'>
  & { name: string }

export type CommandOption = { [name: string]: unknown }
export type CommandHandler = (options: CommandOption) => boolean | Promise<boolean>
