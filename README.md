# Domain-Driven-Shop

Ce projet est une application web construite avec Vue.js pour le frontend et Node.js avec Express pour le backend, utilisant Supabase comme base de données.

## Prérequis

- Node.js (v14 ou plus récent)
- npm (v6 ou plus récent)

## Comment lancer

1. Créez un fichier `.env` dans le dossier `backend` avec les variables suivantes :

   SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlxamt2Z2d1dm1zc2Z6emVnZnlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkyMzUwMTUsImV4cCI6MjAzNDgxMTAxNX0.0zkE4hrVvi7n0YyrEd1XEER9EMgkwhKhCAo6Iufr9_o

   PORT=3000

2. cd Backend / npm run dev
3. cd Frontend / npm run serve

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
   - But :
2. Vue Commercial :
   - Objectifs : Faire en sorte que l'équipe commercial puisse avoir accès aux données des ventes de la boutique, le produit le mieux vendus, la ville la plus rentable...
   - Informations : Nous avons deux csv d'entrée distincts, un concernant les produits, leur rentabilité, le produit le plus "retourné", mais aussi quelle ville est rentable ou non en fonction de son nombre d'habitants.
   - Actions :
   - But :
3. Vue Direction :
   - Objectifs : Avoir une vision d'ensemble sur la boutique, quelle ville est la plus rentable par habitants, comment on peut optimiser certaines villes / régions afin d'améliorer les profits.
   - Informations : Nous voulons faire en sorte que la direction ait accès aux données simplement, grâce à des graphiques simple.
   - Actions :
   - But :


Conclusion 
