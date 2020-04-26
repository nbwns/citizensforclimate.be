const translations = {
    "fr": {
        "read-more": "> Lire la suite",
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
        "date-when": "Quand",
        "date-start": "Du",
        "date-end": "au",
        "date-start-only": "À partir du",
        "date-end-only": "Jusqu'au",
        "address": "Adresse",
        "infos": "Infos",
        "all-actions": "Toutes les actions",
        "footer-text": "Pour nous contacter:",
        "breaking-title": "Trouve ici les actions qui font bouger les lignes",
        "timeline-title": "LIGNE DU TEMPS",
        "timeline-subtitle": "Dates clés pour le mouvement",
        "map-title": "GEOLOCALIS'ACTIONS",
        "map-subtitle": "Ca se passe près de chez vous",
        "actions-tab": "Guide",
        "timeline-tab": "Ligne du temps",
        "map-tab": "Carte",
        "survey-message": "Nous menons actuellement une enquête pour que ce site puisse mieux correspondre à tes attentes. Avec 10 minutes de ton temps, tu nous aiderais beaucoup !",
        "i-answer-survey": "Je réponds à l'enquête"
    },
    "nl": {
        "read-more": "> Verder lezen",
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
        "date-when": "Wanneer",
        "date-start": "Van",
        "date-end": "tot",
        "date-start-only": "Vanaf",
        "date-end-only": "Tot",
        "address": "Adres",
        "infos": "Info",
        "all-actions": "Alle acties",
        "footer-text": "Contacteer ons:",
        "breaking-title": "Vind hier een overzicht van acties voor verandering",
        "timeline-title": "TIJDLIJN",
        "timeline-subtitle": "Belangrijke data voor de beweging",
        "map-title": "MOBILISATIEMAP",
        "map-subtitle": "Dit gebeurt bij u in de buurt",
        "actions-tab": "Gids",
        "timeline-tab": "Tijdlijn",
        "map-tab": "Kaart",
        "survey-message": "We voeren momenteel een onderzoek uit zodat deze site beter aan jouw verwachtingen kan voldoen. Met 10 minuutjes van je tijd, zou je ons veel helpen!",
        "i-answer-survey": "Ik vul de enquête in"
    }
}

function translate(locale, key){
    if(locale && key){
        let localized = translations[locale];
        if(localized){
            return localized[key]
        }
    }
    else{
        return ''
    }
}

export default translate
//module.exports = translate
