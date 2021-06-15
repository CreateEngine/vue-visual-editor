// import request from '@/utils/request';
const request = {}

export function getList(params) {
  return request({
    url: '/api/files',
    method: 'get',
    params,
  });
}
export function deleteFile(ids) {
  return request({
    url: `/api/files/${ids}`,
    method: 'delete',
  });
}
export function downloadFile(id) {
  return request({
    url: `/api/files/download/${id}`,
    method: 'get',
  });
}
export function copyFileUrl(params) {
  return request({
    url: `/api/files/download-url`,
    method: 'get',
    params,
  });
}

export function uploadThumbnail(data) {
  return request({
    url: `/api/files/logo`,
    method: 'post',
    data,
  });
}
