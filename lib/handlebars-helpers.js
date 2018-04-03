const Handlebars = require('handlebars')

exports.even = (conditional, options) => {
  if ((conditional % 2) === 0) {
    return options.fn(this)
  }
  else {
    return options.inverse(this)
  }
}

exports.formatTime = (date, format) => {
  const d = new Date(date)
  return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
}

exports.yearFromDate = (date) => {
  const d = new Date(date)
  return d.getFullYear()
}

exports.site = (parm, options) => {
  return options.data.root.site
}

exports.eachLimit = (arr, max, options) => {
  let result = []
  if (!arr || !arr.length) {
    return result
  }
  for (let i = 0; i < max; i++) {
    if (typeof arr[i] !== 'undefined') {
      arr[i]['@index'] = i
      result.push(options.fn(arr[i]))
    }
  }
  return result.join('')
}

exports.register = () => {
  Handlebars.registerHelper('even', exports.even)

  Handlebars.registerHelper('formatTime', exports.formatTime)

  Handlebars.registerHelper('yearFromDate', exports.yearFromDate)

  Handlebars.registerHelper('site', exports.site)

  Handlebars.registerHelper('each_limit', exports.eachLimit)
}
