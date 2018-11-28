const translations = {
    "fr": {
        "read-more": "> Lire la suite",
        "actions-hightlight-title": "CLIMATE NOW",
        "actions-hightlight-subtitle": "Événements incontournables et imminents",
        "actions-title": "BULLETIN DES ACTIONS",
        "actions-subtitle": "Pour toutes les ambitions",
        "actions-more": "Plus d'actions",
        "citizen" : "Citoyen.ne,",
        "i-stay-up-to-date": "Je reste au courant",
        "get-the-agenda": "Reçois l'agenda des mobilisations en Belgique",
        "association": "Association, ONG, collectif,",
        "i-contribute": "Je contribue au site",
        "send-your-action": "Envoie-nous les infos de ton action ou événement",
        "i-fill-the-form": "Je remplis le formulaire en ligne",
        "related-actions": "Actions liées",
        "highlighted-actions": "Actions climate à la une",
        "date-start": "Début",
        "date-end": "Fin",
        "address": "Adresse",
        "infos": "Infos",
        "all-actions": "Toutes les actions",
        "footer-text": "Citizens for climate est une plateforme issue d’un mouvement citoyen spontané, né dans la foulée des récentes mobilisations massives dans le monde. Son objectif est de référencer les actions et événements qui vous permettent de vous mobiliser en masse pour le climat !"
    },
    "nl": {
        "read-more": "> Lire la suite",        
        "actions-hightlight-title": "CLIMATE NOW",
        "actions-hightlight-subtitle": "Événements incontournables et imminents",
        "actions-title": "BULLETIN DES ACTIONS",
        "actions-subtitle": "Pour toutes les ambitions",
        "actions-more": "Plus d'actions",
        "citizen" : "Citoyen.ne,",
        "i-stay-up-to-date": "Je reste au courant",
        "get-the-agenda": "Reçois l'agenda des mobilisations en Belgique",
        "association": "Association, ONG, collectif,",
        "i-contribute": "Je contribue au site",
        "send-your-action": "Envoie-nous les infos de ton action ou événement",
        "i-fill-the-form": "Je remplis le formulaire en ligne",
        "related-actions": "Actions liées",
        "highlighted-actions": "Actions climate à la une",
        "date-start": "Début",
        "date-end": "Fin",
        "address": "Adresse",
        "infos": "Infos",
        "all-actions": "Toutes les actions",
        "footer-text": "Citizens for climate est une plateforme issue d’un mouvement citoyen spontané, né dans la foulée des récentes mobilisations massives dans le monde. Son objectif est de référencer les actions et événements qui vous permettent de vous mobiliser en masse pour le climat !"
    }
}

function translate(locale, key){
    if(locale && key){
        return translations[locale][key]
    }
    else{
        return ''
    }
}

function coucou(locale, key){
    if(locale && key){
        let localized = translations[locale];
        if(localized){
            return localized[key]
        }
    }
    else{
        return 'coucou'
    }
}

module.exports = coucou