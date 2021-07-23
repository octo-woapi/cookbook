## Should have

2. Renvoyer autre chose que du json (négociation de contenu, PDF, CSV, fichiers)
2. Comment faire de l’upload de plusieurs binaires, en envoyant en même temps des metadata ?
2. Idempotence en création de ressource => JVI : draft
2. Exemple de HATEOAS (panier)
2. GET : les limitations (taille de l'URL => POST)
2. Comment gérer l’héritage ?

## Nice to have

3. Récupération de mot de passe
3. Configurateur d’options
3. Onboarding mobile
3. Authentification forte (>= 2 facteurs)
3. Recherche multi ressources
3. API et Machine à états
3. Payload avec metadata

## Articles potentiels

- Calcul d’un prix stateless (paramètres en entrée + logique de calcul côté serveur) :
sans stockage possible (GET /resources?... ou POST /resources + 301 vers /resource/:id)
avec stockage possible (POST /resources?... => 201 Location /resources/:id => GET /resource/:id) -> évite le recalcul
- Spécifications exécutables vs pyramide de tests inversée
- Code first vs Spec first
- REX mise en place tests Newman
- APIM pour les flux sortants (article d'archi)
- APIM pour les appels internes ? Une gateway, deux gateways ? (article d'archi)
- APIs réactives (RTM : Slack, Twitter)

## Tech

- [ ] Add 2 more articles
- [ ] Fix the color of the complexity icon (should change based on the value)
- [ ] Add tags if needed (to be defined)
