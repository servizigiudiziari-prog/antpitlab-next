/**
 * Script di seed per popolare Sanity con dati di test
 *
 * IMPORTANTE: Questo è un template. Per eseguirlo:
 * 1. Assicurati di avere SANITY_API_TOKEN nel .env.local
 * 2. Carica manualmente le immagini tramite Studio (più affidabile)
 * 3. Oppure usa Sanity CLI: sanity dataset import
 *
 * Questo file contiene i dati strutturati da inserire manualmente.
 */

export const categories = [
  {
    _type: 'category',
    title: 'Matrimoni',
    slug: { current: 'matrimoni', _type: 'slug' },
    description:
      'Servizi fotografici per matrimoni ed eventi speciali. Catturiamo i momenti più emozionanti del vostro giorno speciale.',
    color: { hex: '#FF6B9D' },
    order: 0,
    featured: true,
  },
  {
    _type: 'category',
    title: 'Ritratti',
    slug: { current: 'ritratti', _type: 'slug' },
    description:
      'Fotografie di ritratto professionale per famiglie, coppie e individuali. Ogni scatto racconta una storia unica.',
    color: { hex: '#4ECDC4' },
    order: 1,
    featured: true,
  },
  {
    _type: 'category',
    title: 'Paesaggi',
    slug: { current: 'paesaggi', _type: 'slug' },
    description:
      'Fotografia di paesaggi e natura. La bellezza del mondo catturata in ogni scatto.',
    color: { hex: '#95E1D3' },
    order: 2,
    featured: false,
  },
  {
    _type: 'category',
    title: 'Eventi',
    slug: { current: 'eventi', _type: 'slug' },
    description:
      'Copertura fotografica per eventi aziendali, feste private e celebrazioni. Professionalità e discrezione.',
    color: { hex: '#F38181' },
    order: 3,
    featured: true,
  },
  {
    _type: 'category',
    title: 'Street Photography',
    slug: { current: 'street-photography', _type: 'slug' },
    description:
      'Fotografia urbana e di strada. Momenti spontanei di vita quotidiana catturati con stile.',
    color: { hex: '#AA96DA' },
    order: 4,
    featured: false,
  },
]

export const projects = [
  {
    _type: 'project',
    title: 'Wedding in Villa Borghese',
    slug: { current: 'wedding-villa-borghese', _type: 'slug' },
    description:
      'Un matrimonio elegante presso Villa Borghese, Roma. Un giorno magico tra storia, natura e amore. La coppia ha scelto questa location storica per celebrare il loro grande giorno, circondati dalla bellezza senza tempo dei giardini romani.',
    // coverImage: da caricare manualmente
    // category: riferimento a 'Matrimoni'
    tags: ['outdoor', 'elegante', 'villa', 'roma', 'luxury'],
    date: '2024-09-15T14:00:00.000Z',
    location: 'Villa Borghese, Roma',
    client: 'Maria & Giovanni',
    featured: true,
    published: true,
    order: 0,
  },
  {
    _type: 'project',
    title: 'Family Portrait Session',
    slug: { current: 'family-portrait-session', _type: 'slug' },
    description:
      'Servizio fotografico familiare in studio con luci naturali. Tre generazioni riunite per immortalare i loro legami affettivi in un set intimo e accogliente.',
    // category: riferimento a 'Ritratti'
    tags: ['famiglia', 'studio', 'indoor', 'natural-light'],
    date: '2024-08-22T10:30:00.000Z',
    location: 'Studio AntPit Lab, Roma',
    featured: true,
    published: true,
    order: 1,
  },
  {
    _type: 'project',
    title: 'Tramonto Toscano',
    slug: { current: 'tramonto-toscano', _type: 'slug' },
    description:
      'Le colline della Val d\'Orcia al tramonto. Un viaggio fotografico tra cipressi, vigneti e la luce dorata che rende unica questa terra.',
    // category: riferimento a 'Paesaggi'
    tags: ['toscana', 'sunset', 'paesaggio', 'natura'],
    date: '2024-07-10T19:45:00.000Z',
    location: 'Val d\'Orcia, Toscana',
    featured: true,
    published: true,
    order: 2,
  },
  {
    _type: 'project',
    title: 'Corporate Event - Tech Summit 2024',
    slug: { current: 'corporate-event-tech-summit-2024', _type: 'slug' },
    description:
      'Copertura fotografica del Tech Summit 2024. Oltre 500 partecipanti, keynote speaker internazionali e momenti di networking catturati con professionalità.',
    // category: riferimento a 'Eventi'
    tags: ['corporate', 'conference', 'business', 'technology'],
    date: '2024-06-18T09:00:00.000Z',
    location: 'Rome Convention Center',
    client: 'TechCorp Italia',
    featured: false,
    published: true,
    order: 3,
  },
  {
    _type: 'project',
    title: 'Street Life - Trastevere',
    slug: { current: 'street-life-trastevere', _type: 'slug' },
    description:
      'Un pomeriggio nelle strade di Trastevere. Vita quotidiana, volti, storie e momenti spontanei catturati nel cuore più autentico di Roma.',
    // category: riferimento a 'Street Photography'
    tags: ['street', 'urban', 'roma', 'candid', 'black-white'],
    date: '2024-05-25T16:00:00.000Z',
    location: 'Trastevere, Roma',
    featured: false,
    published: true,
    order: 4,
  },
  {
    _type: 'project',
    title: 'Maternity Photoshoot - Garden Session',
    slug: { current: 'maternity-photoshoot-garden', _type: 'slug' },
    description:
      'Servizio fotografico di maternità in un giardino fiorito. La dolce attesa celebrata tra fiori di primavera e luce naturale.',
    // category: riferimento a 'Ritratti'
    tags: ['maternity', 'outdoor', 'spring', 'natural-light'],
    date: '2024-04-12T11:00:00.000Z',
    location: 'Orto Botanico, Roma',
    featured: true,
    published: true,
    order: 5,
  },
  {
    _type: 'project',
    title: 'Birthday Party - Sweet 18',
    slug: { current: 'birthday-party-sweet-18', _type: 'slug' },
    description:
      'Festa di compleanno per i 18 anni. Musica, danza, emozioni e tanta energia catturata in ogni scatto.',
    // category: riferimento a 'Eventi'
    tags: ['party', 'celebration', 'young', 'indoor'],
    date: '2024-03-30T20:00:00.000Z',
    location: 'Villa Privata, Roma',
    featured: false,
    published: true,
    order: 6,
  },
  {
    _type: 'project',
    title: 'Fashion Editorial - Urban Style',
    slug: { current: 'fashion-editorial-urban-style', _type: 'slug' },
    description:
      'Editorial fotografico per brand di moda urbana. Location industriali e stile metropolitano per una collezione streetwear.',
    // category: riferimento a 'Ritratti'
    tags: ['fashion', 'editorial', 'urban', 'style'],
    date: '2024-02-14T14:00:00.000Z',
    location: 'Ex Mattatoio, Testaccio',
    client: 'Urban Style Brand',
    featured: false,
    published: true,
    order: 7,
  },
  {
    _type: 'project',
    title: 'Engagement in Rome',
    slug: { current: 'engagement-in-rome', _type: 'slug' },
    description:
      'Pre-wedding photoshoot tra i monumenti di Roma. Un viaggio romantico dalla Fontana di Trevi al Colosseo per celebrare il loro amore.',
    // category: riferimento a 'Matrimoni'
    tags: ['engagement', 'couple', 'rome', 'monuments', 'romantic'],
    date: '2024-01-20T15:30:00.000Z',
    location: 'Centro Storico, Roma',
    client: 'Sofia & Marco',
    featured: true,
    published: true,
    order: 8,
  },
  {
    _type: 'project',
    title: 'Countryside Landscapes',
    slug: { current: 'countryside-landscapes', _type: 'slug' },
    description:
      'La campagna romana all\'alba. Nebbia, campi dorati e la quiete del risveglio della natura.',
    // category: riferimento a 'Paesaggi'
    tags: ['countryside', 'dawn', 'fog', 'landscape'],
    date: '2023-12-05T06:30:00.000Z',
    location: 'Campagna Romana',
    featured: false,
    published: true,
    order: 9,
  },
]

export const settings = {
  _type: 'settings',
  _id: 'settings',
  siteTitle: 'AntPit Lab',
  siteDescription:
    'Portfolio fotografico professionale di Antonio Pitocco. Matrimoni, ritratti, eventi e fotografia artistica a Roma e in tutta Italia.',
  siteKeywords: [
    'fotografo roma',
    'fotografia matrimoni',
    'ritratti professionali',
    'fotografo eventi',
    'portfolio fotografico',
    'antonio pitocco',
  ],
  socialLinks: {
    instagram: 'https://www.instagram.com/antpitlab',
    facebook: 'https://www.facebook.com/antpitlab',
    whatsapp: '+393331234567',
  },
  contactInfo: {
    email: 'info@antpitlab.com',
    phone: '+39 333 123 4567',
    address: 'Via della Fotografia, 1\n00100 Roma, Italia',
  },
  footerText:
    'AntPit Lab - Portfolio Fotografico © 2024. Tutti i diritti riservati.',
  enableWatermark: true,
  watermarkText: '© AntPit Lab',
}

/**
 * Istruzioni per l'import:
 *
 * 1. MANUALE (Consigliato per iniziare)
 *    - Apri Sanity Studio: http://localhost:3000/studio
 *    - Copia i dati da questo file e creali manualmente
 *    - Carica le immagini dalla cartella /images/
 *
 * 2. VIA SCRIPT (Avanzato)
 *    - Crea un file sanity/scripts/import.ts
 *    - Usa il client Sanity per creare i documenti
 *    - Carica le immagini con @sanity/asset-utils
 *
 * 3. VIA SANITY CLI
 *    - Esporta questi dati in formato ndjson
 *    - Usa: sanity dataset import data.ndjson production
 */
