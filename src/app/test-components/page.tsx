"use client";

import { useState } from "react";
import { Header, Footer } from "@/components/layout";
import { Button, Card, Input, Modal, Loader } from "@/components/ui";
import { ImageCard, MasonryGrid, Lightbox } from "@/components/gallery";
import { Hero, ContactForm } from "@/components/sections";

// Mock images for testing
const mockImages = [
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600",
    alt: "Landscape 1",
    title: "Mountain Vista",
    category: "Landscapes",
  },
  {
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=800",
    alt: "Nature 1",
    title: "Forest Path",
    category: "Nature",
  },
  {
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600",
    alt: "Landscape 2",
    title: "Sunset Valley",
    category: "Landscapes",
  },
  {
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=800",
    alt: "Nature 2",
    title: "Autumn Leaves",
    category: "Nature",
  },
  {
    src: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&h=600",
    alt: "Adventure 1",
    title: "Mountain Peak",
    category: "Adventure",
  },
  {
    src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=800",
    alt: "Nature 3",
    title: "Misty Morning",
    category: "Nature",
  },
];

export default function TestComponentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const handleContactSubmit = async (data: {
    name: string;
    email: string;
    message: string;
  }) => {
    // eslint-disable-next-line no-console
    console.log("Contact form submitted:", data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  const lightboxImages = mockImages.map((img) => ({
    src: img.src,
    alt: img.alt,
    title: img.title,
  }));

  return (
    <div className="min-h-screen bg-bg-primary">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-heading text-text-primary text-center mb-8">
            Hero Section
          </h2>
          <Hero
            imageSrc="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080"
            title="AntPit Lab Studio"
            subtitle="Le immagini parlano quando le parole tacciono"
          />
        </section>

        {/* Buttons */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-heading text-text-primary mb-8">
            Buttons
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" size="sm">
              Primary Small
            </Button>
            <Button variant="primary" size="md">
              Primary Medium
            </Button>
            <Button variant="primary" size="lg">
              Primary Large
            </Button>
            <Button variant="secondary" size="md">
              Secondary
            </Button>
            <Button variant="ghost" size="md">
              Ghost
            </Button>
            <Button variant="primary" size="md" disabled>
              Disabled
            </Button>
          </div>
        </section>

        {/* Cards */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-heading text-text-primary mb-8">
            Cards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <h3 className="font-heading text-xl text-text-primary mb-4">
                Basic Card
              </h3>
              <p className="text-text-secondary">
                This is a basic card component without hover effects.
              </p>
            </Card>
            <Card hover>
              <h3 className="font-heading text-xl text-text-primary mb-4">
                Card with Hover
              </h3>
              <p className="text-text-secondary">
                Hover over this card to see the border offset effect.
              </p>
            </Card>
          </div>
        </section>

        {/* Inputs */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-heading text-text-primary mb-8">
            Inputs
          </h2>
          <div className="max-w-md space-y-6">
            <Input label="Nome" type="text" />
            <Input label="Email" type="email" required />
            <Input label="Password" type="password" />
            <Input
              label="Email con errore"
              type="email"
              error="Formato email non valido"
            />
          </div>
        </section>

        {/* Modal */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-heading text-text-primary mb-8">
            Modal
          </h2>
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            Open Modal
          </Button>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <div className="p-8">
              <h3 className="font-heading text-2xl text-text-primary mb-4">
                Modal Title
              </h3>
              <p className="text-text-secondary mb-6">
                This is a modal component with smooth animations and keyboard
                support. Press ESC to close.
              </p>
              <Button variant="primary" onClick={() => setIsModalOpen(false)}>
                Close Modal
              </Button>
            </div>
          </Modal>
        </section>

        {/* Loader */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-heading text-text-primary mb-8">
            Loader
          </h2>
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <Loader size="sm" />
              <span className="text-text-secondary text-sm">Small</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Loader size="md" />
              <span className="text-text-secondary text-sm">Medium</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Loader size="lg" />
              <span className="text-text-secondary text-sm">Large</span>
            </div>
          </div>
        </section>

        {/* Image Gallery */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-heading text-text-primary mb-8">
            Image Gallery (MasonryGrid + ImageCard)
          </h2>
          <MasonryGrid columns={{ sm: 2, md: 3, lg: 4 }} gap={5}>
            {mockImages.map((image, index) => (
              <ImageCard
                key={index}
                {...image}
                onClick={() => {
                  setLightboxIndex(index);
                  setIsLightboxOpen(true);
                }}
                priority={index < 4}
              />
            ))}
          </MasonryGrid>
        </section>

        {/* Lightbox */}
        <Lightbox
          images={lightboxImages}
          currentIndex={lightboxIndex}
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
          onIndexChange={setLightboxIndex}
        />

        {/* Contact Form */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-heading text-text-primary mb-8 text-center">
            Contact Form
          </h2>
          <ContactForm onSubmit={handleContactSubmit} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
