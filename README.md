# MORICE - Plateforme d'Arbitrage Virtuel par IA



MORICE est une application web innovante conçue pour révolutionner la résolution des litiges civils et commerciaux simples. En s'appuyant sur une intelligence artificielle de pointe, MORICE offre une plateforme d'arbitrage virtuel qui analyse les dossiers, identifie les points clés et propose des solutions équitables, le tout en conformité avec le cadre juridique du Québec.

## ✨ Fonctionnalités Clés

### 1. **Processus d'Arbitrage Guidé par l'IA**
Le cœur de MORICE est son flux de travail intelligent qui guide l'utilisateur à travers les étapes de la résolution de conflit :
- **Soumission de Dossier en 4 Étapes** : Un formulaire intuitif pour décrire le litige, identifier les parties, et télécharger les documents pertinents.
- **Analyse Automatisée** : L'IA traite les documents soumis (contrats, factures, etc.) pour en extraire les informations cruciales.
- **Questions de Clarification** : L'IA pose des questions ciblées à l'utilisateur pour affiner son analyse et garantir des recommandations précises.
- **Rapport d'Analyse Final** : Génération d'un rapport complet incluant un résumé, les faits saillants, la base juridique (informative), les recommandations et une évaluation des risques.

### 2. **Tableau de Bord Utilisateur Complet**
Chaque utilisateur dispose d'un espace personnel sécurisé pour gérer ses dossiers :
- **Vue d'Ensemble** : Visualisez tous vos dossiers, leur statut actuel (soumis, en analyse, terminé) et les informations clés.
- **Suivi de Progression** : Une chronologie détaillée (timeline) pour chaque dossier, montrant l'avancement à chaque étape.
- **Accès Rapide** : Lancez un nouveau dossier ou consultez une analyse terminée en un seul clic.

### 3. **Gestion de Profil et Sécurité**
- **Inscription Détaillée** : Créez un profil en spécifiant votre rôle (demandeur ou défenseur) et si vous êtes représenté par un avocat.
- **Profil Personnalisable** : Mettez à jour vos informations personnelles (nom, ville, numéro de téléphone).
- **Persistance des Données** : Les informations de l'utilisateur et les dossiers sont sauvegardés localement (`localStorage`) pour une expérience continue.

### 4. **Notifications Automatisées (Simulation)**
Pour tenir l'utilisateur informé, des notifications sont simulées par e-mail et WhatsApp aux moments cruciaux :
- Lors de la **soumission** du dossier.
- Lorsque l'**analyse initiale** est terminée.
- Quand la **décision finale** et le rapport sont prêts.

### 5. **Génération de Rapports PDF**
- **Téléchargement Facile** : Téléchargez le rapport d'analyse complet au format PDF en un clic.
- **Personnalisation** : Le rapport est estampillé au nom de MORICE et contient toutes les informations de l'analyse.

### 6. **Interface et Expérience Utilisateur**
- **Design Moderne** : Une interface élégante et futuriste avec des effets visuels (glassmorphism) et des animations fluides (`Framer Motion`).
- **Entièrement Responsive** : Une expérience utilisateur optimale sur ordinateur, tablette et mobile.
- **Avis Juridique** : Un pop-up de disclaimer s'affiche à la première visite pour informer les utilisateurs des limitations de la plateforme.
- **Chatbot d'Assistance** : Un assistant virtuel disponible pour répondre aux questions fréquentes sur le fonctionnement de MORICE.

## 🛠️ Technologies Utilisées

- **Frontend** : React 18.2.0
- **Build Tool** : Vite
- **Styling** : TailwindCSS 3.3.2
- **Composants UI** : shadcn/ui
- **Animations** : Framer Motion 10.16.4
- **Icônes** : Lucide React
- **Génération PDF** : jspdf

## 🚀 Démarrage

1.  **Acceptez l'avis juridique** lors de votre première visite.
2.  **Créez un compte** en fournissant les informations requises.
3.  Depuis le **tableau de bord**, cliquez sur "Nouveau dossier".
4.  **Suivez les 4 étapes** pour soumettre votre litige.
5.  **Suivez l'avancement** de votre dossier et répondez aux questions de l'IA.
6.  **Consultez et téléchargez** votre rapport d'analyse final.

---

*MORICE est un projet de démonstration. Les analyses et recommandations sont générées à titre informatif et ne constituent pas des conseils juridiques.*
