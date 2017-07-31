---
layout: blog
title: A dashboard to find the best time to upgrade your server
subtitle: Introducing multiGa live Google Analytics dashboard
description: 
category: engineering
date: 2017-07-27 16:46:35
language: en
author: mehdi
thumbnail: /img/thumbnails/multiGa.png
---

## Summary

In order to be able to check the number of visitors in each site I'm managing in real time, before performing upgrades on the server, I've created a dashboard displaying all the information on one page. It's not perfect, since Google Analytics Realtime API is quite limited, but it does the job.

## Story


I've been hosting a few websites of my own and of customers for quite some time on the cloud, and periodically have the same problem coming back: I need to do some updates on the server, implying some downtime: upgrade the operating system, install a new version of some software component...

I like to disturb the least possible the website visitors, hence tend to perform these tasks at times of the night when the traffic is low. Using Google Analytics, I can easily find out when it is less likely to have many visitors. However, <strong>there is no way to view the number of visitors in realtime, on multiple sites at the same time</strong>.

One evening, I had some spare time - and wanted to see the capabilities of Google Analytics realtime API, so I decided to solve this problem by creating a <a href="https://mango-is.com/tools/multiga/">dashboard displaying the realtime visits</a> for multiple websites at a time.

The concept is pretty simple:

1. As a user of the dashboard, you click a "Login with Google" button to give access to your Google Analytics account.
2. Data is retrieved, and the dashboard shows the realtime visits of each property and views belonging to one account.
3. A select menu allows you to switch between accounts, if needed.

<img src="/img/multiGa.gif" alt="preview/demo of multiGa" class="u-img-responsive fa-border"/>


## Findings


### Benefits

1. multiGa is super simple to use, and shows the realtime visits metrics in a convenient layout
2. The data remains private, as it transits directly from Google Analytics to your browser window. Mango Information Systems servers don't ever get access to it. This is thanks to the "OAuth 2.0 implicit grant flow" <a href="https://developers.google.com/identity/protocols/OAuth2UserAgent">supported by Google APIs</a>.
3. multiGa is open source, everybody is free to use the code and adapt it to their needs.
4. although primarily aimed at larger screens, multiGa is responsive, and the dashboard looks also good on mobile devices.

### Limits

* Unlike twitter who offers a real real-time API, Google Analytics realtime API is rather near-real-time. The [quota limits](https://developers.google.com/analytics/devguides/reporting/realtime/v3/limits-quotas) in place are easily reached for users having access to many google analytics properties. As a consequence, the dashboard updates are not done every second for each view.
* In order to avoid reinventing the wheel, I used the [javascript client library](https://developers.google.com/api-client-library/javascript/start/start-js) created by Google, to manage the authentication and connection to the API. This library is pseudo open-source: [only the minified code is available](https://github.com/google/google-api-javascript-client/issues/211), and [barely maintained](https://github.com/google/google-api-javascript-client/graphs/code-frequency). Self-hosting it is highly discouraged, a consequence is a usability issue: on some browsers, third-party cookies need to be enabled by the user, otherwise the authentication simply won't work.
* A first version of multiGa used to display all the properties data for all accounts user has access to simultaneously inside the dashboard. This was problematic for users having access to many different accounts. To simplify, the display has been limited to all the views and properties of only one account at at time.


## Try it yourself and contribute

You may connect your google analytics account and try the dashboard <a href="https://mango-is.com/tools/multiga/">here</a> .

We're also open to contributions from other developers. If you'd like to enhance multiGa, [get in touch](https://github.com/Mango-information-systems/mango-is-website/labels/multiGa) ;)
