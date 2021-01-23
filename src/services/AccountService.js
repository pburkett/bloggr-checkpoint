import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { sandboxApi } from './AxiosService'

class AccountService {
  async getAccount(ext, target) {
    try {
      const res = await sandboxApi.get('/account/' + ext)
      AppState[target] = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }
}

const accountService = new AccountService()
export default accountService
