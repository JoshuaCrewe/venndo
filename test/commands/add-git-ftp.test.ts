import {expect, test} from '@oclif/test'

describe('add-git-ftp', () => {
  test
    .stdout()
    .command(['add-git-ftp'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('hello world')
    })

  test
    .stdout()
    .command(['add-git-ftp', '--name', 'jeff'])
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff')
    })
})
