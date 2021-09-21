---
description: How to design asynchronous API
complexity: 2
---

# Design asynchronous API

## Use-case
Mon API d'e-commerce permet de télécharger un export PDF de mes commandes.\
Cette opération recherche les commandes éligibles, met en forme les données et génère le fichier PDF. A priori, toutes ces opérations mis bout à bout peuvent prendre plusieurs secondes.

Il est donc inenvisageable d'exposer une API synchrone sur ce cas d'usage pour plusieurs raisons :
* L’expérience utilisateur est fortement dégradée avec un temps de réponse de plusieurs secondes;
* Des erreurs 504 (timeout) peuvent surgir suivant le temps de traitement de l'opération et/ou suivant la configuration des serveurs HTTP intermédiaires;
* Les serveurs applicatifs peuvent se retrouver "sur-solliciter" si trop d'export sont demandés dans une même fenêtre de temps.

## How to design my API ?
Nous recommandons d'adopter un design API dit "asynchrone" pour répondre à ces problématiques.\
Deux points d'architecture sont à mettre en place :
* Exposer un endpoint REST permettant de récupérer la demande de l'utilisateur, dans notre cas, sa demande d'export PDF
* **Décaler l’exécution du traitement** "long" par l’intermédiaire d’un batch. 
Celui peut être déclenché via cronjob ou via une file de message par exemple. 
Le but étant de dé-corréler le trafic HTTP transitant par l’API du traitement « lourd » du batch.

Maintenant que nous savons comment traiter cette demande, il reste la problématique de la notification de l’utilisateur quand à l’avancement du traitement et de la récupération des données demandées.

Pour répondre à cela deux design API sont possibles.

## Recipe 1: Async API with polling
Le polling est la solution la plus simple à mettre en œuvre.\
Elle dispose de plusieurs avantages :
* déléguer au client le suivi de la création de la ressource;
* ne pas demander au client d'exposer un endpoint de rappel.

Le polling se décompose en 3 grandes étapes : 
* demande de la ressource par le client;
* vérification de l'avancement du traitement par le client;
* obtention de la ressource demandée.

### Demande de la ressource

Le client envoie une requête HTTP sur le endpoint asynchrone avec les informations nécessaires :
```shell
curl -X POST https://api.example.com/v1/orders/reports
```
```json
{
  "start_date": "2021-10-01",
  "end_date": "2021-11-01",
  ...
}
```
Réponse de l'API : 
  ```shell
  HTTP/1.1 202 Accepted
  Location: orders/report/status/99311702-cdaa-4069-85da-ea74a46035e6
  Retry-After: 60
  ```
Plusieurs informations sont pertinentes dans cette réponse : 
* Le header [Location](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Location) contient l'URI permettant 
de suivre l'avancement du traitement asynchrone.
* Le code [HTTP 202](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/202) est quand à lui présent ici, 
il indique la prise en compte de la requête mais que le traitement n’a pas eu lieu.
* Enfin nous vous conseillons d’ajouter le header [Retry-After](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After) 
indiquant au client le temps à attendre avant de solliciter à nouveau le endpoint. Cette valeur peut être liée à une politique de cache par exemple.

### Vérification de l'avancement
Maintenant, le client est libre de consulter cette URL autant de fois que nécessaire pour suivre l'avancement du traitement asynchrone.\
Il convient donc de **protéger ses API via un système de rate-limiting** empêchant les clients d'abuser de votre endpoint et par extension de faire tomber votre applicatif.
 ```shell
curl -X GET https://api.example.com/v1/orders/reports/status/99311702-cdaa-4069-85da-ea74a46035e6
 ```
Reponse de l'API: 
 ```shell
HTTP/1.1 200 OK
Content-Type: application/json
Retry-After: 60
 ```
 ```json
{
  "status" : "IN_PROGRESS"
}
```

### Obtention de la ressource
Une fois le traitement terminé coté serveur, le endpoint de status **doit retourner un code HTTP 303** indiquant l’URI de la nouvelle ressource crée (ici notre pdf) :
 ```shell
curl -X GET https://api.example.com/v1/orders/reports/status/99311702-cdaa-4069-85da-ea74a46035e6
 ```
Reponse de l'API:
 ```shell
HTTP/1.1 303 See Other
Location : api/orders/reports/99311702-cdaa-4069-85da-ea74a46035e6
 ```
Pour plus d’information sur le code [HTTP 303](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/303)

### Drawbacks
Les inconvénients principaux de cette technique peuvent résider dans :
* Le développement supplémentaire d’un endpoint de suivi d’avancement coté serveur;
* Une sur-sollicitation du système et un gaspillage énergétique induit par la mécanique de suivi coté client.


## Recipe 2: Async API with a callback URL
La solution la plus complexe à mettre en place.

Ce design se décompose en 2 grandes étapes :
* demande de la ressource par le client;
* notification du serveur de la fin du traitement.

Elle dispose de plusieurs avantages :
* efficience du scénario car le serveur informe de la fin de traitement au client
* pas de développement d'un endpoint de suivi d'avancement


### Demande de la ressource
Le client envoie une requête HTTP sur le endpoint asynchrone avec les informations nécessaires comme dans le cas du polling.
**Dans ce cas, le client va devoir fournir en plus une url de rappel (callback url)**. Cette url va être **stockée coté server** et **appelée par ce dernier** une fois le traitement terminé.
 ```shell
curl -X POST https://api.example.com/v1/orders/reports
 ```
```json
{
  "start_date" :"2021-10-01",
  "end_date" : "2021-11-01",
  "callback_url" : "http://myserver.com/api/orders/reports/callback"
}
```
Réponse de l'API:
```shell
HTTP/1.1 202 Accepted
```

### Notification au client
Une fois le traitement asynchrone terminé coté serveur, celui-ci va effectuer un appel POST au client pour **le notifier de la terminaison du traitement**. \
Nous vous conseillons que le payload contiennent le statut du traitement (ok, ko) et un lien vers la récupération de la ressource crée.
 ```shell
curl -X POST http://myserver.com/api/orders/reports/callback
 ```
```json
{
  "status" : "COMPLETED",
  "links" : [{
    "rel" : "reports",
    "href" : "orders/reports/0a6509c6-1571-48be-b177-95a7d640e04f"
  }]
}
```
Le client peut maintenant récupérer sa ressource en effectuant un simple GET.

### Drawbacks
Cette solution induit plusieurs contraintes :
* La solution est **utilisable seulement dans des échanges serveur à serveur**;
* La solution implique du **développement coté client** pour exposer un endpoint de callback permettant de recevoir l'appel du serveur;
* **Gérer l’indisponibilitée potentielle du client.**\
Quelle est la politique à adopter ? Une première réponse serait de mettre en place une mécanique de retry avec un laps de temps entre chaque essai.
* **Gérer l’authentification mutuelle du client et du serveur.**\
Etant donné que les deux endpoints (`/reports` coté serveur et `/callback` coté client) sont exposés, ils convient aux deux parties de s’assurer de l’identité des machines qui les sollicites.
