/**
 * getServerGo
 *
 **/
export default function (url) {
  let server = 'https://api.shendupeiban.com'
  if (process.env.APP_TEST === 'true' || process.env.NODE_ENV !== 'production') {
    server = 'http://192.168.1.162:8127'
    if (/\/schoolorg\/v1/.test(url)) {
      server = 'http://192.168.1.162:8118'
    }
    if (/\/approve\/v1/.test(url)) {
      server = 'http://192.168.1.162:8125'
    }
    if (/\/leave\/v1/.test(url)) {
      server = 'http://192.168.1.162:8126'
    }
    if (/\/biztrip\/v1/.test(url)) {
      server = 'http://192.168.1.162:8127'
    }
    if (/\/announce\/v1/.test(url)) {
      server = 'http://192.168.1.162:8130'
    }
    if (/\/message\/v1/.test(url)) {
      server = 'http://192.168.1.162:8124'
    }
    if (/\/attendence\/v1/.test(url)) {
      server = 'http://192.168.1.162:8123'
    }
    if (/\/file\/v1/.test(url)) {
      server = 'http://192.168.1.162:8131'
    }
    if (/\/classcard\/v1/.test(url)) {
      server = 'http://192.168.1.162:8086'
    }
    if (/\/oa\/v1/.test(url)) {
      server = 'http://192.168.1.162:8111'
    }
    if (/\/attend\/v1/.test(url)) {
      server = 'http://192.168.1.162:8086'
    }
    if (/\/palm/.test(url)) {
      server = 'http://192.168.1.162:8105'
    } else {
      server = 'http://192.168.1.162:8086'
    }
  }
  return server + url
}
