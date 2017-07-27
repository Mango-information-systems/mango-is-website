---
layout: blog
title: A dashboard to find the best moment to upgrade your server
subtitle: Introducing multiGa live Google Analytics dashboard
description: 
category: engineering
date: 2017-07-27 16:46:35
language: en
author: mehdi
thumbnail: img/thumbnails/multiGa.png
---

## TL;DR

In order to be able to check the number of visitors in each site I'm managing in real time, before performing upgrades on the server, I've created a dashboard displaying all the information on one page. Not perfect since Google Analytics Realtime API is quite limited, but it does the job.

## Story


I've been hosting a few websites of my own and of customers for quite some time on the cloud, and periodically have the same problem coming back: I need to do some updates on the server, implying some downtime: upgrade the operating system, install a new version of some software component...

I like to disturb the least possible the website visitors, hence tend to perform these tasks at times of the night when the traffic is low. Using Google Analytics, I can easily find out when it is that there are less visitors. However, <strong>there is no way to view the number of visitors in realtime, on multiple sites at the same time</strong>.

One evening, I had some spare time - and wanted to see the capabilities of Google Analytics realtime API, so I decided to solve this problem by creating a <a href="https://mango-is.com/tools/multiga/">dashboard displaying the realtime visits</a> for multiple websites at a time.

The concept is pretty simple:

1. As a user of the dashboard, you click a "Login with Google" button to give access to your Google Analytics account.
2. Data is retrieved, and the dashboard shows the realtime visits of each property and views belonging to one account.
3. A select menu allows you to switch between accounts, if needed.

-- todo add screenshots here

## Findings


### Benefits

1. The data remains private, as it transits directly from Google Analytics to your browser window. Mango Information Systems servers don't ever get access to it.


### Limits

* not real real time, and rate limits
* "pseudo open-source" ga library, barely maintained
* third-party cookies issue
* one account at a time


## Try it yourself

You may connect your google analytics account and try the dashboard <a href="https://mango-is.com/tools/multiga/">here</a> .
