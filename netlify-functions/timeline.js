const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const client = require('contentful')
const moment = require('moment')

app.use(bodyParser);
app.use(cors())

const client = contentful.createClient({
    space: process.env.CTF_SPACE_ID,
    accessToken: process.env.CTF_ACCESS_TOKEN
})

app.get('/timeline', (req, res, next) => {
    
    client.getEntries({
        content_type: 'action',
        'locale':req.query.lang+ "-BE",
        'order': 'fields.sortOrder,fields.name'
    })
    .then(entries => {
        let timelineItems = [];
        entries.items.forEach(item => {

            let newTimelineItem = {
                "text": {
                    "headline": item.fields.name,
                    "text": item.fields.body
                  }
            }

            if(item.fields.start){
                let mDate = moment(item.fields.start)
                let startDate = {
                    "month": mDate.month(),
                    "day": mDate.date(),
                    "year": mDate.year()
                }
                newTimelineItem["start_date"] = startDate
            }
            
            timelineItems.push(newTimelineItem)
        })

        res.json(timelineItems)
    })
})

  module.exports.handler = serverless(app);