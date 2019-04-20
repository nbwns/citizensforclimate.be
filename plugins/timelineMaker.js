import moment from 'moment'
//import client from '~/plugins/contentful'
const client = require('~/plugins/contentful')

function timeline(locale){
    //console("timeline locale", locale)
    let lang = locale || 'fr';
    
    return client.getEntries({
        content_type: 'timelineItem',
        'locale': lang + '-BE'
    })
    .then(entries => {
        let response = {
            title: {},
            events: [],
            eras: []
        };
        entries.items.forEach(item => {
            let newTimelineItem = {};
            let type = item.fields.type;
            
            //add data to item
            if(type === "Title" || type === "Milestone" || type === "Era"){
                let title = {
                    "text": {
                        "headline": item.fields.title,
                        "text": item.fields.body
                    }                  
                };
                newTimelineItem = Object.assign(newTimelineItem, title);

               
                if(type === "Milestone" || "Era"){
                    
                    if(item.fields.start){
                        let mStartDate = moment(item.fields.start)
                        let startDate = {
                            "display_date": mStartDate.format("DD/MM/YYYY HH:mm"),
                            "month": mStartDate.month() + 1,
                            "day": mStartDate.date(),
                            "year": mStartDate.year()
                        };
                        newTimelineItem["start_date"] = startDate;
                    
                        if(item.fields.end){
                            let mEndDate = moment(item.fields.end)
                            let endDate = {
                                "display_date": mEndDate.format("DD/MM/YYYY HH:mm"),
                                "month": mEndDate.month() + 1,
                                "day": mEndDate.date(),
                                "year": mEndDate.year()
                            };
                            newTimelineItem["end_date"] = endDate;
                        }
                    
                       
                    }
                }
                
            }
            else if(type === "Action"){
                let action = item.fields.linkedAction;

                newTimelineItem.link = `http://www.citizensforclimate.be/${lang}/actions/${action.fields.slug}`;
                 
                let title = {
                    "text": {
                        "headline": action.fields.name,
                        "text": `${action.fields.introductionText} 
                        <a target=_blank href='${newTimelineItem.link}'>${action.fields.callToAction}</a>`
                    }                  
                };   

                newTimelineItem = Object.assign(newTimelineItem, title);

                if(action.fields.start){
                    let mStartDate = moment(action.fields.start)
                    let startDate = {
                        "display_date": mStartDate.format("DD/MM/YYYY HH:mm"),
                        "month": mStartDate.month() + 1,
                        "day": mStartDate.date(),
                        "year": mStartDate.year()
                    };
                    newTimelineItem["start_date"] = startDate;
                    
                    if(action.fields.end){
                        let mEndDate = moment(action.fields.end)
                        let endDate = {
                            "display_date": mEndDate.format("DD/MM/YYYY HH:mm"),
                            "month": mEndDate.month() + 1,
                            "day": mEndDate.date(),
                            "year": mEndDate.year()
                        };
                        newTimelineItem["end_date"] = endDate;
                    }
                    
                   
                }
            }

            //add media to item
            if(item.fields.media && item.fields.media.fields.media.fields.file){
                let media = {
                    caption: item.fields.media.fields.caption,
                    credit: item.fields.media.fields.credit,
                    url: item.fields.media.fields.media.fields.file.url,
                    link: newTimelineItem.link
                };
                newTimelineItem.media = media;
            }
            else if(item.fields.mediaUrl){
                newTimelineItem.media = {url : item.fields.mediaUrl};
            }

            //add styles to item
            newTimelineItem.background = {}
            if(item.fields.backgroundColor){
                newTimelineItem.background.color = item.fields.backgroundColor;
            }

            if(item.fields.backgroundImage && item.fields.backgroundImage.fields.file){
                newTimelineItem.background.url = item.fields.backgroundImage.fields.file.url;
            }
            
            //add item to response
            if(type === "Title"){
                response.title = newTimelineItem;
            }
            else if(type === "Milestone" || type === "Action"){
                response.events.push(newTimelineItem)
            }
            else if (type === "Era"){
                response.eras.push(newTimelineItem)
            }
            
        })

        return response
    })
}

export default timeline