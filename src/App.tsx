import React, { useState } from 'react';
import { PlanTier, PetSpecies, BoutiqueProduct } from './types';
import { NexaWebBar } from './components/NexaWebBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { PreventiveSimulator } from './components/PreventiveSimulator';
import { CatFriendlySpotlight } from './components/CatFriendlySpotlight';
import { BoutiquePharmacySection } from './components/BoutiquePharmacySection';
import { TeamSection } from './components/TeamSection';
import { EmergencyTriage } from './components/EmergencyTriage';
import { BookingModal } from './components/BookingModal';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';

export default function App() {
  const [currentTier, setCurrentTier] = useState<PlanTier>('personalizado');
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);
  const [bookingSpecies, setBookingSpecies] = useState<PetSpecies>('dog');
  const [bookingNotes, setBookingNotes] = useState<string>('');

  // Boutique Cart state
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<{ product: BoutiqueProduct; quantity: number }[]>([]);

  const handleOpenBooking = (serviceId?: string, species?: PetSpecies, notes?: string) => {
    setSelectedServiceId(serviceId);
    if (species) setBookingSpecies(species);
    if (notes) setBookingNotes(notes);
    setBookingOpen(true);
  };

  const handleAddToCart = (product: BoutiqueProduct) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as { product: BoutiqueProduct; quantity: number }[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C2520]">
      {/* NexaWeb Executive Demo Controller */}
      <NexaWebBar currentTier={currentTier} onTierChange={setCurrentTier} />

      {/* Top Bar Contract Navigation */}
      <Navbar
        currentTier={currentTier}
        onOpenBooking={() => handleOpenBooking()}
        onOpenCart={() => setCartOpen(true)}
        cartCount={totalCartCount}
      />

      <main className="flex-1">
        {/* Hero Section with Dual Tier Behavior */}
        <HeroSection
          currentTier={currentTier}
          onOpenBooking={handleOpenBooking}
          onSelectPetForSimulator={(species) => setBookingSpecies(species)}
        />

        {/* Services Section */}
        <ServicesSection
          onSelectServiceToBook={(srvId) => handleOpenBooking(srvId)}
        />

        {/* Interactive Preventive Simulator (Featured in Personalizado Tier) */}
        {currentTier === 'personalizado' && (
          <PreventiveSimulator
            initialSpecies={bookingSpecies}
            onOpenBookingWithDetails={(notes, species) => handleOpenBooking('imunizacao-prevencao', species, notes)}
          />
        )}

        {/* Dedicated Cat-Friendly & Fear-Free Spotlight */}
        <CatFriendlySpotlight />

        {/* Curated Pet Boutique & Pharmacy */}
        <BoutiquePharmacySection
          currentTier={currentTier}
          onAddToCart={handleAddToCart}
        />

        {/* Clinical Team & Verified CRMVs */}
        <TeamSection />

        {/* Emergency 24h Triage Guide */}
        <EmergencyTriage />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        preselectedServiceId={selectedServiceId}
        initialSpecies={bookingSpecies}
        initialNotes={bookingNotes}
      />

      {/* Boutique Reservation Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
