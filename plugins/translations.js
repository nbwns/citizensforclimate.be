const translations = {
    "fr": {
        "read-more": "> Lire la suite",
        "actions-highlight-title": "CLIMATE NOW",
        "actions-highlight-subtitle": "Événements incontournables et imminents",
        "actions-title": "BULLETIN DES ACTIONS",
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
        "read-more": "> Lire la suite",        
        "actions-highlight-title": "CLIMATE NOW",
        "actions-highlight-subtitle": "Onvermijdelijke en dreigende events",
        "actions-title": "LOPENDE ACTIES OVERZICHT",
        "actions-subtitle": "Voor elke ambitie",
        "actions-more": "Meer acties",
        "citizen" : "Burger,",
        "i-stay-up-to-date": "Ik blijf op de hoogte",
        "get-the-agenda": "Ontvang de Belgische klimaat agenda",
        "association": "Vereniging, NGO, collectief,",
        "i-contribute": "Aan deze website bijdragen",
        "send-your-action": "Stuur ons de informatie over je actie of evenement",
        "i-fill-the-form": "Ik vul het formulier online in",
        "related-actions": "Gerelateerde acties",
        "highlighted-actions": "belangrijke acties",
        "date-start": "Begin",
        "date-end": "Einde",
        "address": "Addres",
        "infos": "Infos",
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