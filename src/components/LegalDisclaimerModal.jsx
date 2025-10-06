import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from 'lucide-react';

const LegalDisclaimerModal = ({ isOpen, onAccept }) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-2xl bg-dark-card border-dark-border text-text-primary">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3 text-2xl font-serif text-warning-orange">
            <AlertTriangle className="w-7 h-7" />
            <span>Avis Juridique Important</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4 max-h-[60vh] overflow-y-auto pr-4 text-text-secondary space-y-4 text-sm">
          <p className="font-semibold text-text-primary">
            IMPORTANT - AVIS JURIDIQUE ET LIMITATIONS
          </p>
          <p>
            MORICE (Plateforme d'Arbitrage Virtuel par IA) fournit des analyses virtuelles non-contraignantes à titre informatif uniquement.
          </p>

          <div>
            <h3 className="font-semibold text-text-primary mb-2">LIMITATIONS IMPORTANTES :</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Cette plateforme ne remplace pas un avocat qualifié.</li>
              <li>Les analyses fournies ne constituent pas des conseils juridiques personnalisés.</li>
              <li>Aucune décision juridique contraignante n'est rendue.</li>
              <li>Les recommandations sont basées sur des algorithmes d'IA et peuvent contenir des erreurs.</li>
              <li>La responsabilité de l'utilisateur reste entière pour toute décision prise.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-text-primary mb-2">JURIDICTION :</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Cette plateforme opère sous la juridiction du Québec, Canada.</li>
              <li>Les lois applicables sont celles du Québec et du Canada.</li>
              <li>Tout litige sera soumis aux tribunaux compétents du Québec.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-text-primary mb-2">CONFIDENTIALITÉ :</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Vos données sont protégées selon les standards les plus élevés.</li>
              <li>Aucune information personnelle n'est partagée sans consentement.</li>
              <li>Les analyses sont anonymisées pour la recherche.</li>
            </ul>
          </div>

          <p className="font-semibold text-text-primary pt-2">
            En utilisant cette plateforme, vous reconnaissez avoir lu, compris et accepté ces limitations.
          </p>
        </div>

        <DialogFooter>
          <Button onClick={onAccept} className="btn-primary w-full">
            J'ai compris et j'accepte
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LegalDisclaimerModal;