import axios from 'axios'
import { API_PATH } from '../configs/api'

axios.defaults.baseURL = API_PATH
export default axios
