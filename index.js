export { Waiter } from './lib/waiter'
export { Talker } from './lib/talker'

export * from './lib/managers/index'

export default class Weixin {
  constructor(options) {
    this.waiter = new Waiter(options)
    this.talker = new Talker(options)
  }
  get waiter() {
    return this.waiter
  }

  get talker() {
    return this.talker
  }

  setReplyPopulatorOfWaiter(populator) {
    if(this.waiter) {
        this.waiter.populateReply = populator
    }
  }
  setTokenStore(tokenStore) {
    if(this.talker && this.talker.tokenKeeper) {
        this.talker.tokenKeeper.store = tokenStore
    }

  }
}
