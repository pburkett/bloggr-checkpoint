/* eslint-disable */

import { AppState } from "../AppState"
import { sandboxApi } from "./AxiosService"

class BlogService {

  async get(ext, target ){
    
    let res = await sandboxApi.get('api/blogs/' + ext)
    AppState[target] = res.data
  }
  async post(ext, target, body){
    //ext could be:
    // 'blogs' || 'comments'
    let res = await sandboxApi.post('api/' + ext, body)
    return res.data.id
    // AppState[target].push(res.data)
  }

  async update(ext, target, body){
    let res = await sandboxApi.put('api/' + ext, body)
    return res.data.id
  }
  async remove(ext, target, body){
    let res = await sandboxApi.delete('api/'+ext)
  }
}

const blogService = new BlogService()
export default blogService