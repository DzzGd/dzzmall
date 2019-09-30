import { request } from './request'

export function getCategoryData() {
  return request({
    url: '/category'
  })
}

export function getDetails(maitKey) {
  return request({
    url: '/subcategory',
    params: {
      maitKey
    }
  })
}

export function getTabControlData(type, miniWallkey) {
  return request({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })
}