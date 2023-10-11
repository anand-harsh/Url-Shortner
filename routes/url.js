const express=require('express')
const {handleGenerateNewSortUrl, handleGetAnalytics} =require("../controllers/url")
const router=express.Router()

router.post('/', handleGenerateNewSortUrl)
router.get('/analytics/:shortId', handleGetAnalytics)

module.exports= router
