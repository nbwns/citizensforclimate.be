const express = require('express')
const app = express()
const cors = require('cors')
const client = require('../plugins/contentful')
const moment = require('moment')

app.use(cors())

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

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}