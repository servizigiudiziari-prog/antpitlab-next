/**
 * Pagina di test per verificare integrazione Sanity
 * URL: http://localhost:3000/sanity-test
 *
 * Questa pagina mostra:
 * - Connessione a Sanity funzionante
 * - Query GROQ operative
 * - Dati popolati correttamente
 * - Immagini caricate
 *
 * RIMUOVI QUESTA PAGINA IN PRODUZIONE!
 */

import Link from "next/link";
import { client } from "@/lib/sanity/client";
import {
  CATEGORIES_QUERY,
  ALL_PROJECTS_QUERY,
  SETTINGS_QUERY,
  HOMEPAGE_STATS_QUERY,
} from "@/lib/sanity/queries";
import type { Category, ProjectPreview, Settings, HomepageStats } from "@/lib/types/sanity";
import { urlFor } from "@/lib/sanity/imageBuilder";

export const revalidate = 60; // ISR: revalidate ogni 60 secondi

export default async function SanityTestPage() {
  let categories: Category[] = [];
  let projects: ProjectPreview[] = [];
  let settings: Settings | null = null;
  let stats: HomepageStats | null = null;
  let error: string | null = null;

  try {
    // Fetch dati in parallelo
    const [categoriesData, projectsData, settingsData, statsData] = await Promise.all([
      client.fetch<Category[]>(CATEGORIES_QUERY),
      client.fetch<ProjectPreview[]>(ALL_PROJECTS_QUERY),
      client.fetch<Settings>(SETTINGS_QUERY),
      client.fetch<HomepageStats>(HOMEPAGE_STATS_QUERY),
    ]);

    categories = categoriesData;
    projects = projectsData;
    settings = settingsData;
    stats = statsData;
  } catch (e) {
    error = e instanceof Error ? e.message : "Unknown error";
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-gray-900">Sanity CMS - Test Page</h1>
          <p className="text-gray-600">Verifica integrazione e dati popolati</p>
        </header>

        {error && (
          <div className="mb-8 rounded-lg border border-red-200 bg-red-50 p-6 text-red-800">
            <h2 className="mb-2 text-xl font-bold">Errore di connessione</h2>
            <p className="mb-4">{error}</p>
            <div className="text-sm">
              <p className="mb-2 font-semibold">Checklist:</p>
              <ul className="list-inside list-disc space-y-1">
                <li>Verifica che NEXT_PUBLIC_SANITY_PROJECT_ID sia impostato in .env.local</li>
                <li>Verifica che NEXT_PUBLIC_SANITY_DATASET sia impostato in .env.local</li>
                <li>Riavvia il server Next.js dopo aver modificato .env.local</li>
                <li>Controlla che il progetto Sanity sia stato creato su sanity.io</li>
              </ul>
            </div>
          </div>
        )}

        {!error && (
          <>
            {/* Stats Section */}
            <section className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Statistiche</h2>
              {stats ? (
                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-lg bg-blue-50 p-4 text-center">
                    <div className="text-3xl font-bold text-blue-600">{stats.totalProjects}</div>
                    <div className="text-sm text-blue-800">Progetti Totali</div>
                  </div>
                  <div className="rounded-lg bg-green-50 p-4 text-center">
                    <div className="text-3xl font-bold text-green-600">{stats.totalCategories}</div>
                    <div className="text-sm text-green-800">Categorie</div>
                  </div>
                  <div className="rounded-lg bg-purple-50 p-4 text-center">
                    <div className="text-3xl font-bold text-purple-600">
                      {stats.featuredProjects}
                    </div>
                    <div className="text-sm text-purple-800">Progetti in Evidenza</div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">Nessuna statistica disponibile</p>
              )}
            </section>

            {/* Settings Section */}
            <section className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Impostazioni Sito</h2>
              {settings ? (
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold">Titolo:</span> {settings.siteTitle}
                  </div>
                  <div>
                    <span className="font-semibold">Descrizione:</span> {settings.siteDescription}
                  </div>
                  <div>
                    <span className="font-semibold">Email:</span> {settings.contactInfo.email}
                  </div>
                  <div>
                    <span className="font-semibold">Social:</span>{" "}
                    {settings.socialLinks?.instagram && (
                      <a
                        href={settings.socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-blue-600 hover:underline"
                      >
                        Instagram
                      </a>
                    )}
                  </div>
                  <div>
                    <span className="font-semibold">Watermark:</span>{" "}
                    {settings.enableWatermark ? "✅ Abilitato" : "❌ Disabilitato"} -{" "}
                    {settings.watermarkText}
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-yellow-800">
                  <p className="font-semibold">⚠️ Settings non configurato</p>
                  <p className="mt-1 text-sm">
                    Vai su{" "}
                    <Link href="/studio" className="underline">
                      /studio
                    </Link>{" "}
                    e crea il documento &quot;Impostazioni Sito&quot;
                  </p>
                </div>
              )}
            </section>

            {/* Categories Section */}
            <section className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Categorie ({categories.length})
              </h2>
              {categories.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {categories.map((category) => (
                    <div
                      key={category._id}
                      className="rounded-lg border border-gray-200 p-4"
                      style={{
                        borderLeftWidth: "4px",
                        borderLeftColor: category.color?.hex || "#ccc",
                      }}
                    >
                      <h3 className="mb-1 font-semibold text-gray-900">{category.title}</h3>
                      <p className="mb-2 text-sm text-gray-600">
                        {category.description || "Nessuna descrizione"}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Ordine: {category.order}</span>
                        {category.featured && (
                          <span className="rounded bg-yellow-100 px-2 py-1 text-yellow-800">
                            ⭐ Featured
                          </span>
                        )}
                      </div>
                      {category.projectCount !== undefined && (
                        <div className="mt-2 text-xs text-gray-500">
                          Progetti: {category.projectCount}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-yellow-800">
                  <p className="font-semibold">⚠️ Nessuna categoria trovata</p>
                  <p className="mt-1 text-sm">
                    Vai su{" "}
                    <Link href="/studio" className="underline">
                      /studio
                    </Link>{" "}
                    e crea alcune categorie
                  </p>
                </div>
              )}
            </section>

            {/* Projects Section */}
            <section className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Progetti ({projects.length})
              </h2>
              {projects.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {projects.map((project) => (
                    <div
                      key={project._id}
                      className="overflow-hidden rounded-lg border border-gray-200 bg-white"
                    >
                      {project.coverImage?.asset?.url && (
                        <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                          <img
                            src={urlFor(project.coverImage).width(400).url()}
                            alt={project.coverImage.alt || project.title}
                            className="h-full w-full object-cover"
                          />
                          {project.featured && (
                            <div className="absolute top-2 right-2 rounded bg-yellow-400 px-2 py-1 text-xs font-semibold text-yellow-900">
                              ⭐ Featured
                            </div>
                          )}
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="mb-2 font-semibold text-gray-900">{project.title}</h3>
                        <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                          {project.description || "Nessuna descrizione"}
                        </p>
                        {project.category && (
                          <div
                            className="mb-2 inline-block rounded-full px-3 py-1 text-xs font-medium"
                            style={{
                              backgroundColor: project.category.color?.hex
                                ? `${project.category.color.hex}20`
                                : "#f3f4f6",
                              color: project.category.color?.hex || "#6b7280",
                            }}
                          >
                            {project.category.title}
                          </div>
                        )}
                        <div className="text-xs text-gray-500">
                          {project.location && <div>📍 {project.location}</div>}
                          <div>📅 {new Date(project.date).toLocaleDateString("it-IT")}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-yellow-800">
                  <p className="font-semibold">⚠️ Nessun progetto trovato</p>
                  <p className="mt-1 text-sm">
                    Vai su{" "}
                    <Link href="/studio" className="underline">
                      /studio
                    </Link>{" "}
                    e crea alcuni progetti
                  </p>
                </div>
              )}
            </section>

            {/* Success Message */}
            <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-green-800">
              <h2 className="mb-2 text-xl font-bold">✅ Integrazione OK!</h2>
              <p className="mb-4">Sanity CMS è connesso correttamente e funziona.</p>
              <div className="text-sm">
                <p className="mb-2 font-semibold">Prossimi passi:</p>
                <ol className="list-inside list-decimal space-y-1">
                  <li>
                    Popola più progetti su{" "}
                    <Link href="/studio" className="font-medium underline">
                      /studio
                    </Link>
                  </li>
                  <li>Testa le query GROQ in Vision tool</li>
                  <li>Integra i dati nelle pagine del sito</li>
                  <li>Configura ISR e webhooks</li>
                  <li>
                    <strong>RIMUOVI questa pagina in produzione!</strong>
                  </li>
                </ol>
              </div>
            </div>
          </>
        )}

        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>Configurazione Sanity completata ✨</p>
          <p className="mt-1">
            <Link href="/studio" className="text-blue-600 hover:underline">
              Apri Studio
            </Link>
            {" · "}
            <Link href="/" className="text-blue-600 hover:underline">
              Homepage
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
}
