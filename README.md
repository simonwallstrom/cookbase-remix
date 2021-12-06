# Create, share and organize your favorite recipes

## Sitemap

```bash

URL                           USER                              GUEST
/                             Redirect to /recipes              Landing page
/recipes                      Recipes                           Redirect to /login
/recipes/<id>                 Recipe                            Redirect to /login
/collections                  Collections                       Redirect to /login
/collections/<id>             Collection                        Redirect to /login
/friends                      List of friends                   Redirect to /login
/activity                     Friends activity                  Redirect to /login
/settings                     Edit settings                     Redirect to /login
/[username]                   Profile|Recipes                   Profile|Recipes
/[username]/<id>              User recipe                       User recipe
/[username]/collections       Profile|Collections               Profile|Collections
/[username]/collections/<id>  User collection                   User collection

```

## Roles

- Owner Logged in | user id = uid
- Friend Logged in | following current user
- User Logged in | Not following current user
- Guest Not logged in
