import axios from '@/libs/api.request'

export const getGeoJson = (AreaName) => {
  return axios.request({
    url: 'geo/' + AreaName + '.json',
    method: 'get'
  })
}
