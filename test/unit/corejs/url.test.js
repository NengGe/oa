import getUrlSearch from '@/modules/corejs/url/get-url-search'
describe('url', function () {
  it('getUrlSearch', function() {
    let v1 = getUrlSearch('name', '?name=123')
    let v2 = getUrlSearch('name2', '?name=123')
    expect(v1).toBe('123')
    expect(v2).toBeNull()
  })
})
