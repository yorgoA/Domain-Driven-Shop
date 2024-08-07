# Domain-Driven-Shop

Ce projet est une application web construite avec Vue.js pour le frontend et Node.js avec Express pour le backend, utilisant Supabase comme base de données.

## Prérequis

- Node.js (v14 ou plus récent)
- npm (v6 ou plus récent)

## Comment lancer
1. Se déplacer dans le répertoire racine du projet et exécuter dans le terminal :

   ```bash
   npm install
2. Se déplacer dans le répertoire frontend et exécuter :

   ```bash
   npm install
3. Se déplacer dans le répertoire backend et exécuter :

   ```bash
   npm install

4. Pour lancer le backend, exécutez : 

   ```bash
   cd Backend 
   npm run dev

5. Pour lancer le backend, exécutez : 

   ```bash
   cd Frontend 
   npm run serve

## Les comptes :
1. Admin : 

            email : yorgo@admin.com
            mdp : admin
2. Commerce : 

            email : yorgo@commerce.com
            mdp : commerce
3. Compta : 

            email : yorgo@compta.com
            mdp : compta

## Bounded Context

1. Vue Comptable :

- Objectifs : Faire en sorte que l'équipe comptable puisse rendre des comptes à la direction quant aux dépenses de l'entreprise.

- Informations : Nous avons pris la décision de séparer les données obtenues en 3 tableaux distincts 

- Actions :
   - Analyse des dépenses et des revenus
   - Suivi des marges bénéficiaires
   - Évaluation des produits les plus rentables et les plus vendus
- But :
   - Fournir des rapports financiers précis et détaillés
   - Optimiser la gestion des coûts
   - Maximiser les revenus et les marges bénéficiaires

2. Vue Commercial :

- Objectifs : Faire en sorte que l'équipe commercial puisse avoir accès aux données des ventes de la boutique, le produit le mieux vendus, la ville la plus rentable...

- Informations : Nous avons deux csv d'entrée distincts, un concernant les produits, leur rentabilité, le produit le plus "retourné", mais aussi quelle ville est rentable ou non en fonction de son nombre d'habitants.

- Actions :
   - Analyse des performances de vente par produit et par ville
   - Identification des opportunités de croissance
   - Élaboration de stratégies de promotion des produits

- But :
   - Augmenter les ventes
   - Améliorer la satisfaction des clients
   - Identifier et exploiter les marchés les plus rentables


3. Vue Direction :

- Objectifs : Avoir une vision d'ensemble sur la boutique, quelle ville est la plus rentable par habitants, comment on peut optimiser certaines villes / régions afin d'améliorer les profits.

- Informations : Nous voulons faire en sorte que la direction ait accès aux données simplement, grâce à des graphiques simple.

- Actions :
   - Planification des stratégies futures.
   - Allocation des ressources, concernant les villes.
   - Répartition des moyens à travers tout le brésil.

- But :
   - Faciliter la prise de décision basée sur les données
   - Aligner les stratégies commerciales avec les opportunités du marché
   - Optimiser les performances globales de l'entreprise


Conclusion : 
Nous avons donc les 3 vues de disponible avec le Dashboard.
Nous vous conseillons de vous connecter en admin afin d'avoir toutes ces vues.
Nous nous sommes inspirés de ce que nous faisons au travail pour ces différentes pages et nous espérons que cela vous conviendra.
Aussi bien les différents tableaux où les gestionnaires peuvent y faire des recherches précises, mais aussi les différents graphs interactifs que nous avons mis en place.
Pour toutes questions merci de contacter Azouz Théo : theoaz25@gmail.com
