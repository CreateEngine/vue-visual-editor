// import request from '@/utils/request';
const request = {}

export function getPageList(params) {
  return request({
    url: '/api/ui',
    method: 'get',
    params,
  });
}

export function addPage(data) {
  return request({
    url: `/api/ui`,
    method: 'post',
    data,
  });
}

export function modifyPage(id, data) {
  return request({
    url: `/api/ui/${id}`,
    method: 'patch',
    data,
  });
}

export function deletePage(id) {
  return request({
    url: `/api/ui/${id}`,
    method: 'delete',
  });
}

export function getSinglePage(id) {
  return request({
    url: `/api/ui/${id}`,
    method: 'get',
  });
}
