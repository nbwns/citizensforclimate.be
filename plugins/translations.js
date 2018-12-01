const translations = {
    "fr": {
        "read-more": "> Lire la suite",
        "actions-highlight-title": "CLIMATE NOW",
        "actions-highlight-subtitle": "Événements incontournables et imminents",
        "actions-title": "GUIDE DES ACTIONS",
        "actions-subtitle": "Pour toutes les ambitions",
        "actions-more": "Plus d'actions",
        "citizen" : "Citoyen.ne,",
        "i-stay-up-to-date": "Je reste au courant",
        "get-the-agenda": "Reçois l'agenda des mobilisations en Belgique",
        "association": "Association, ONG, collectif,",
        "i-contribute": "J'organise un événement",
        "send-your-action": "Contribue à ce site, envoie-nous les détails de ton action",
        "i-fill-the-form": "Je remplis le formulaire en ligne",
        "related-actions": "Actions liées",
        "highlighted-actions": "Actions climat à la une",
        "date-start": "Début",
        "date-end": "Fin",
        "address": "Adresse",
        "infos": "Infos",
        "all-actions": "Toutes les actions",
        "footer-text": "Citizens for climate est une plateforme issue d’un mouvement citoyen spontané, né dans la foulée des récentes mobilisations massives dans le monde. Son objectif est de référencer les actions et événements qui vous permettent de vous mobiliser en masse pour le climat !"
    },
    "nl": {
        "read-more": "> Verder lezen",        
        "actions-highlight-title": "CLIMATE NOW",
        "actions-highlight-subtitle": "Onvermeidelijke en drigende events",
        "actions-title": "LOPENDE ACTIES",
        "actions-subtitle": "Voor elke ambitie",
        "actions-more": "Méér acties",
        "citizen" : "Als burger,",
        "i-stay-up-to-date": "Blijf ik op de hoogte",
        "get-the-agenda": "Stuur mij het belgische actieagenda door",
        "association": "Als vereniging, NGO, collectief,",
        "i-contribute": "Wil ik mijn actie op de website",
        "send-your-action": "Stuur ons de nodige info door",
        "i-fill-the-form": "Vul het online formulier in",
        "related-actions": "Gelijkaardige acties",
        "highlighted-actions": "belangrijke acties",
        "date-start": "Begin",
        "date-end": "Einde",
        "address": "Adres",
        "infos": "Info",
        "all-actions": "Alle acties",
        "footer-text": "Citizens for Climate is een platform dat is ontstaan uit een spontane burgerbeweging, geboren in de nasleep van recente massale mobilisaties overal ter wereld. Ons doel is te verwijzen naar acties en evenementen die burgers in staat stellen massaal te mobiliseren voor het klimaat!"
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