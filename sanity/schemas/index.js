/**
 * Schema Sanity - Index
 * Esporta tutti gli schema per il CMS
 */

import libro from './libro'
import saggio from './saggio'
import racconto from './racconto'
import poesia from './poesia'
import articoloBlog from './articoloBlog'

export const schemaTypes = [
  libro,
  saggio,
  racconto,
  poesia,
  articoloBlog
]
