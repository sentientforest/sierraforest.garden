// This is the actual metalsmith configuration script.
const Metalsmith = require('metalsmith')
const markdown = require('metalsmith-markdown')
const layouts = require('metalsmith-layouts')
const metadata = require('metalsmith-metadata')
const collections = require('metalsmith-collections')
const assets = require('metalsmith-assets')
const fingerprint = require('metalsmith-fingerprint-ignore')
const writemetadata = require('metalsmith-writemetadata')
const sitemap = require('metalsmith-sitemap')
const cssPacker = require('metalsmith-css-packer');
const hbsHelpers = require('./lib/handlebars-helpers')

hbsHelpers.register()

Metalsmith(__dirname)
    .destination('dist')
    .clean(true)
    .use(metadata({
      site: 'metadata/site.json'
    }))
    .use(assets({
      source: 'static',
      destination: '.'
    }))
    .use(fingerprint({ pattern: 'js/*.js' }))
    .use(fingerprint({ pattern: 'css/*.css' }))
    .use(collections({
      pages: {
        pattern: 'pages/*.md'
      },
      posts: {
        pattern: 'posts/*.md',
        sortBy: 'createdDate',
        reverse: true
      }
    }))
     .use(writemetadata({
       pattern: ['**/*.html'],
      ignorekeys: ['next', 'previous'],
      bufferencoding: 'utf8',
      collections: {
        posts: {
          output: {
            path: 'api/posts.json',
            asObject: true,
            metadata: {
              type: 'list'
            }
          },
          ignorekeys: ['contents', 'next', 'previous']
        }
      }
    }))
    .use(markdown())
    .use(layouts({
      engine: 'handlebars',
      partials: 'partials',
      helpers: {
        // Neat little handlebars debugger
        // Usage example: <pre>{{debug this}}</pre>
        debug: (obj) => JSON.stringify(obj, null, 2)
      }
    }))
    .use(sitemap({
      hostname: 'https://sierraforest.garden'
    }))
    .build(function (err) {
      if (err) {
        throw err
      }
      console.log('Metalsmith build finished')
    })
