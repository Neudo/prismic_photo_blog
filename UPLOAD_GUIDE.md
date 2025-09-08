# Guide d'Upload Multiple d'Images

## Accès à la page d'upload

1. Accédez à : http://localhost:3001/multiple-photos
2. Entrez le mot de passe : `admin123`

## Utilisation

Une fois authentifié, vous pouvez :
1. Sélectionner la destination des images :
   - **Album privé** : Les images seront stockées dans `/public/uploads/album-prive/`
   - **Catégorie de photo** : Les images seront stockées dans `/public/uploads/categorie-photo/`

2. Sélectionner plusieurs images à uploader
3. Cliquer sur "Uploader les images"

## Configuration

Le mot de passe est défini dans le fichier `.env` :
```
UPLOAD_PASSWORD=admin123
```

## Limitations actuelles

- Les images sont stockées localement dans le dossier `/public/uploads/`
- L'intégration complète avec Prismic nécessite :
  - Un token d'accès API Prismic avec permissions d'écriture
  - La configuration de l'API Migration de Prismic
  - L'identification des documents à mettre à jour (UID des albums/catégories)

## Intégration Prismic (À faire)

Pour une intégration complète avec Prismic, vous devrez :

1. Obtenir un token d'accès permanent depuis votre dashboard Prismic
2. Ajouter le token dans `.env` :
   ```
   PRISMIC_ACCESS_TOKEN=your-token-here
   ```

3. Utiliser l'API Migration de Prismic pour créer/mettre à jour les documents
4. Uploader les images dans la Media Library de Prismic

## Sécurité

- Le mot de passe est vérifié côté serveur
- Les uploads sont limités aux formats d'image uniquement
- La taille maximale est configurée à 50MB par requête

## Structure des fichiers

```
/public/uploads/
  ├── album-prive/      # Images pour albums privés
  └── categorie-photo/  # Images pour catégories publiques
```