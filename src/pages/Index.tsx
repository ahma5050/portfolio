import { lazy, Suspense } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import LoadingScreen from '@/components/ui/LoadingScreen';
import CustomCursor from '@/components/ui/CustomCursor';

// Lazy load heavy components
const Scene3D = lazy(() => import('@/components/3d/Scene3D'));
const Projects = lazy(() => import('@/components/sections/Projects'));
const Skills = lazy(() => import('@/components/sections/Skills'));
const Timeline = lazy(() => import('@/components/sections/Timeline'));
const Contact = lazy(() => import('@/components/sections/Contact'));
const Blog = lazy(() => import('@/components/sections/Blog'));

const Index = () => {
  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      
      {/* 3D Background */}
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>

      {/* Noise overlay for texture */}
      <div className="noise-overlay" />
      
      {/* Main content */}
      <div className="relative z-10">
        <Navbar />
        
        <main>
          <Hero />
          
          <Suspense fallback={<SectionSkeleton />}>
            <Projects />
          </Suspense>
          
          <Suspense fallback={<SectionSkeleton />}>
            <Skills />
          </Suspense>
          
          <Suspense fallback={<SectionSkeleton />}>
            <Timeline />
          </Suspense>
          
          <Suspense fallback={<SectionSkeleton />}>
            <Blog />
          </Suspense>
          
          <Suspense fallback={<SectionSkeleton />}>
            <Contact />
          </Suspense>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

// Shimmer skeleton for lazy loaded sections
const SectionSkeleton = () => (
  <div className="py-32 container mx-auto px-6">
    <div className="text-center mb-16">
      <div className="w-32 h-8 mx-auto rounded-full shimmer mb-4" />
      <div className="w-64 h-12 mx-auto rounded-lg shimmer mb-4" />
      <div className="w-96 h-6 mx-auto rounded-lg shimmer" />
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-80 rounded-2xl shimmer" />
      ))}
    </div>
  </div>
);

export default Index;
