import { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import Link from "next/link";
import { client } from "@/lib/sanity/client";
import { PROJECT_BY_SLUG_QUERY, ALL_PROJECT_SLUGS_QUERY } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/imageBuilder";
import type { SanityImage } from "@/lib/types/sanity";
import {
  generatePhotographSchema,
  generateImageGallerySchema,
  generateBreadcrumbSchema,
  stringifyJsonLd,
} from "@/lib/utils/structured-data";

/**
 * Single Project Page with Dynamic Metadata and Structured Data
 * SEO-optimized page for individual photography projects
 */

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Incremental Static Regeneration (ISR)
 * Revalidate every 3600 seconds (1 hour)
 * Provides fresh content while maintaining static performance
 */
export const revalidate = 3600;

/**
 * Generate Static Params for all published projects
 * Enables static generation at build time for better performance
 */
export async function generateStaticParams() {
  const projects = await client.fetch(ALL_PROJECT_SLUGS_QUERY);

  return projects.map((project: { slug: { current: string } }) => ({
    slug: project.slug.current,
  }));
}

/**
 * Generate Dynamic Metadata for SEO
 * Creates unique meta tags for each project page
 */
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await client.fetch(PROJECT_BY_SLUG_QUERY, { slug });

  if (!project) {
    return {
      title: "Progetto Non Trovato",
      description: "Il progetto richiesto non è disponibile.",
    };
  }

  // Generate optimized OG image URL
  const ogImageUrl = project.coverImage?.asset?.url
    ? urlFor(project.coverImage).width(1200).height(630).quality(90).url()
    : "/og-image.jpg";

  // Generate optimized description
  const description =
    project.description ||
    `Progetto fotografico ${project.title}${project.category ? ` - ${project.category.title}` : ""}${project.location ? ` a ${project.location}` : ""}`;

  // Extract keywords from project
  const keywords = [
    project.title,
    project.category?.title,
    ...(project.tags || []),
    "fotografia",
    "portfolio",
    "AntPit Lab",
  ].filter(Boolean);

  return {
    title: project.title,
    description: description.slice(0, 160), // Trim to 160 chars for optimal SEO
    keywords,
    authors: [{ name: "AntPit Lab" }],
    creator: "AntPit Lab",
    openGraph: {
      type: "article",
      locale: "it_IT",
      url: `https://antpitlab.com/portfolio/${slug}`,
      title: project.title,
      description,
      siteName: "AntPit Lab",
      publishedTime: project.date,
      modifiedTime: project._updatedAt || project.date,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: project.coverImage?.alt || project.title,
          type: "image/jpeg",
        },
      ],
      ...(project.category && {
        section: project.category.title,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: description.slice(0, 200),
      images: [ogImageUrl],
      creator: "@antpitlab",
    },
    alternates: {
      canonical: `https://antpitlab.com/portfolio/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },
    },
  };
}

/**
 * Project Page Component
 */
export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await client.fetch(PROJECT_BY_SLUG_QUERY, { slug });

  if (!project) {
    notFound();
  }

  // Generate structured data schemas
  const photographSchema = generatePhotographSchema(project);
  const imageGallerySchema = project.gallery?.length ? generateImageGallerySchema(project) : null;
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://antpitlab.com" },
    { name: "Portfolio", url: "https://antpitlab.com/portfolio" },
    ...(project.category
      ? [
          {
            name: project.category.title,
            url: `https://antpitlab.com/category/${project.category.slug.current}`,
          },
        ]
      : []),
    {
      name: project.title,
      url: `https://antpitlab.com/portfolio/${slug}`,
    },
  ]);

  return (
    <>
      {/* Structured Data JSON-LD */}
      <Script
        id="photograph-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: stringifyJsonLd(photographSchema),
        }}
      />

      {imageGallerySchema && (
        <Script
          id="image-gallery-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: stringifyJsonLd(imageGallerySchema),
          }}
        />
      )}

      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: stringifyJsonLd(breadcrumbSchema),
        }}
      />

      {/* Project Content */}
      <article className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-6xl">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-gray-900">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/portfolio" className="hover:text-gray-900">
                  Portfolio
                </Link>
              </li>
              {project.category && (
                <>
                  <li>/</li>
                  <li>
                    <Link
                      href={`/category/${project.category.slug.current}`}
                      className="hover:text-gray-900"
                    >
                      {project.category.title}
                    </Link>
                  </li>
                </>
              )}
              <li>/</li>
              <li aria-current="page" className="font-semibold text-gray-900">
                {project.title}
              </li>
            </ol>
          </nav>

          {/* Project Header */}
          <header className="mb-8">
            <h1 className="mb-4 text-4xl font-bold">{project.title}</h1>

            {project.description && (
              <p className="mb-4 text-lg text-gray-700">{project.description}</p>
            )}

            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              {project.category && (
                <span className="flex items-center gap-2">
                  <strong>Categoria:</strong> {project.category.title}
                </span>
              )}
              {project.date && (
                <span className="flex items-center gap-2">
                  <strong>Data:</strong>{" "}
                  {new Date(project.date).toLocaleDateString("it-IT", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              )}
              {project.location && (
                <span className="flex items-center gap-2">
                  <strong>Luogo:</strong> {project.location}
                </span>
              )}
              {project.client && (
                <span className="flex items-center gap-2">
                  <strong>Cliente:</strong> {project.client}
                </span>
              )}
            </div>

            {project.tags && project.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Cover Image - LCP Optimization */}
          {project.coverImage && (
            <div className="mb-12">
              <img
                src={urlFor(project.coverImage).width(1200).quality(90).url()}
                alt={project.coverImage.alt || project.title}
                className="h-auto w-full rounded-lg shadow-lg"
                loading="eager"
                fetchPriority="high"
                width={1200}
                height={800}
                decoding="async"
              />
            </div>
          )}

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <section className="mb-12">
              <h2 className="mb-6 text-2xl font-bold">Galleria</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {project.gallery.map((image: SanityImage, index: number) => (
                  <figure key={index}>
                    <img
                      src={urlFor(image).width(800).quality(85).url()}
                      alt={image.alt || `${project.title} - Immagine ${index + 1}`}
                      className="h-auto w-full rounded-lg shadow-md transition-shadow hover:shadow-xl"
                      loading="lazy"
                    />
                    {image.caption && (
                      <figcaption className="mt-2 text-sm text-gray-600">
                        {image.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </section>
          )}

          {/* Navigation to Previous/Next Projects */}
          {(project.prevProject || project.nextProject) && (
            <nav className="mt-12 border-t border-gray-200 pt-8">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {project.prevProject && (
                  <Link href={`/portfolio/${project.prevProject.slug.current}`} className="group">
                    <p className="mb-2 text-sm text-gray-500">Progetto Precedente</p>
                    <h3 className="text-lg font-semibold transition-colors group-hover:text-blue-600">
                      {project.prevProject.title}
                    </h3>
                  </Link>
                )}
                {project.nextProject && (
                  <Link
                    href={`/portfolio/${project.nextProject.slug.current}`}
                    className="group md:text-right"
                  >
                    <p className="mb-2 text-sm text-gray-500">Progetto Successivo</p>
                    <h3 className="text-lg font-semibold transition-colors group-hover:text-blue-600">
                      {project.nextProject.title}
                    </h3>
                  </Link>
                )}
              </div>
            </nav>
          )}
        </div>
      </article>
    </>
  );
}
