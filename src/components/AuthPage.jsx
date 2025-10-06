import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Scale, LogIn, UserPlus } from 'lucide-react';

const AuthPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [profileType, setProfileType] = useState('demandeur');
  const [hasLawyer, setHasLawyer] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      if (!email || !password) {
        toast({ title: "Erreur", description: "Veuillez remplir l'e-mail et le mot de passe.", variant: "destructive" });
        return;
      }
      toast({ title: `Bienvenue !`, description: "Vous êtes maintenant connecté." });
      onLogin({ email, isLogin: true });
    } else {
      if (!email || !password || !firstName || !lastName || !city || !phone) {
        toast({ title: "Erreur", description: "Veuillez remplir tous les champs.", variant: "destructive" });
        return;
      }
      if (password !== confirmPassword) {
        toast({ title: "Erreur", description: "Les mots de passe ne correspondent pas.", variant: "destructive" });
        return;
      }
      toast({ title: `Inscription réussie !`, description: "Bienvenue sur MORICE." });
      onLogin({ email, password, firstName, lastName, city, phone, profileType, hasLawyer, isLogin: false });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="glass-effect rounded-xl p-8">
          <div className="text-center mb-8">
            <Scale className="w-12 h-12 text-primary-blue mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-text-primary font-serif">
              {isLogin ? 'Connexion' : 'Inscription'}
            </h1>
            <p className="text-text-secondary mt-2">
              Accédez à votre tableau de bord MORICE.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Prénom</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent" placeholder="Jean" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Nom</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent" placeholder="Dupont" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Ville</label>
                  <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent" placeholder="Montréal" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Numéro de téléphone</label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent" placeholder="514-123-4567" required />
                </div>
              </>
            )}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Adresse e-mail</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent" placeholder="votre@email.com" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Mot de passe</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent" placeholder="********" required />
            </div>
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Confirmer le mot de passe</label>
                  <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent" placeholder="********" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Vous êtes</label>
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="radio" name="profileType" value="demandeur" checked={profileType === 'demandeur'} onChange={(e) => setProfileType(e.target.value)} className="form-radio h-4 w-4 text-primary-blue bg-dark-bg border-dark-border focus:ring-primary-blue" />
                      <span className="text-text-primary">Demandeur</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="radio" name="profileType" value="defenseur" checked={profileType === 'defenseur'} onChange={(e) => setProfileType(e.target.value)} className="form-radio h-4 w-4 text-primary-blue bg-dark-bg border-dark-border focus:ring-primary-blue" />
                      <span className="text-text-primary">Défenseur</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Êtes-vous représenté par un avocat ?</label>
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="radio" name="hasLawyer" value="yes" checked={hasLawyer === true} onChange={() => setHasLawyer(true)} className="form-radio h-4 w-4 text-primary-blue bg-dark-bg border-dark-border focus:ring-primary-blue" />
                      <span className="text-text-primary">Oui</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="radio" name="hasLawyer" value="no" checked={hasLawyer === false} onChange={() => setHasLawyer(false)} className="form-radio h-4 w-4 text-primary-blue bg-dark-bg border-dark-border focus:ring-primary-blue" />
                      <span className="text-text-primary">Non</span>
                    </label>
                  </div>
                </div>
              </>
            )}
            <Button type="submit" className="w-full btn-primary flex items-center justify-center space-x-2 text-base py-6 mt-4">
              {isLogin ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
              <span>{isLogin ? 'Se connecter' : 'S\'inscrire'}</span>
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button onClick={() => setIsLogin(!isLogin)} className="text-sm text-text-secondary hover:text-primary-blue transition-colors">
              {isLogin ? 'Pas encore de compte ? S\'inscrire' : 'Déjà un compte ? Se connecter'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;