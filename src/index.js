import 'babel-polyfill'
import Waiter from './waiter'
import Talker from './talker'

export default class Weixin {
  constructor(options) {
    this.waiter = new Waiter(options)
    this.talker = new Talker(options)
  }

  getWaiter() {
    return this.waiter
  }

  getTalker() {
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

export * from './managers/index'
