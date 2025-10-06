
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { User, Mail, Phone, MapPin, ArrowLeft } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfilePage = ({ user, onBack, onUpdateUser }) => {
  const [formData, setFormData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
    phone: user.phone || '',
    city: user.city || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      ...formData,
      name: `${formData.firstName} ${formData.lastName}`,
    };
    onUpdateUser(updatedUser);
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été enregistrées avec succès.",
    });
  };

  const handleActionClick = () => {
    toast({
      title: "🚧 Fonctionnalité en développement",
      description: "Cette action n'est pas encore disponible.",
    });
  };

  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4 mb-8">
          <Button onClick={onBack} variant="outline" className="flex items-center space-x-2 border-dark-border text-text-secondary hover:border-primary-blue hover:text-primary-blue">
            <ArrowLeft className="w-4 h-4" />
            <span>Retour</span>
          </Button>
          <h1 className="text-3xl font-bold text-text-primary font-serif">
            Profil Utilisateur
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass-effect rounded-xl p-8"
            >
              <h2 className="text-xl font-semibold text-text-primary mb-6">Informations personnelles</h2>
              <div className="flex items-center space-x-6 mb-8">
                <Avatar className="h-20 w-20 border-4 border-primary-blue">
                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${formData.firstName} ${formData.lastName}`} alt={`${formData.firstName} ${formData.lastName}`} />
                  <AvatarFallback>{(formData.firstName || 'U').charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <Button variant="outline" className="border-dark-border text-text-secondary" onClick={handleActionClick}>Changer la photo</Button>
              </div>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Prénom</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Nom</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Adresse e-mail</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent" disabled />
                  </div>
                </div>
                 <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">Numéro de téléphone</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">Ville</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                            <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent" />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleSave} className="btn-primary">Enregistrer les modifications</Button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-effect rounded-xl p-8"
            >
              <h2 className="text-xl font-semibold text-text-primary mb-6">Sécurité</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-text-primary">Changer le mot de passe</h3>
                    <p className="text-sm text-text-secondary">Il est recommandé d'utiliser un mot de passe fort.</p>
                  </div>
                  <Button variant="outline" className="border-dark-border text-text-secondary" onClick={handleActionClick}>Modifier</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-text-primary">Authentification à deux facteurs</h3>
                    <p className="text-sm text-text-secondary">Ajoutez une couche de sécurité supplémentaire.</p>
                  </div>
                  <Button variant="outline" className="border-dark-border text-text-secondary" onClick={handleActionClick}>Activer</Button>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="space-y-8">
             <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-effect rounded-xl p-6"
            >
              <h2 className="text-lg font-semibold text-text-primary mb-4">Mon Profil Légal</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Type de profil:</span>
                  <span className="font-medium text-text-primary capitalize">{user.profileType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Représenté par un avocat:</span>
                  <span className="font-medium text-text-primary">{user.hasLawyer ? 'Oui' : 'Non'}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;