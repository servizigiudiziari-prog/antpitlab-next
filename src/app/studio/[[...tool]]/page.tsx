/**
 * Route per Sanity Studio
 * Accessibile su: http://localhost:3000/studio
 */

'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity/sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
