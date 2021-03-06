'use strict'

const minify = require('html-minifier').minify
const parse5 = require('parse5')
const Parser = require('./parser')

module.exports = async (sourceHtml, opts = {}) => {
  const html = minify(sourceHtml, {
    removeEmptyAttributes: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    collapseInlineTagWhitespace: true,
    caseSensitive: true
  })

  // Server-side
  const document = opts.fragment
    ? parse5.parseFragment(html)
    : parse5.parse(html)

  const parser = new Parser(document)
  return parser.parse()
}
