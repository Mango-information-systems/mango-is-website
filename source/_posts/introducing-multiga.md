---
layout: blog
title: A dashboard to find the best time to upgrade your server
subtitle: Introducing multiGa live Google Analytics dashboard
description: The story of why and how we created a free dashboard showing Google Analytics live traffic data on multiple websites.
category: engineering
date: 2017-07-27 16:46:35
language: en
author: mehdi
thumbnail: /img/thumbnails/multiGa.png
---

## Summary

To help me check the number of visitors on each site I'm managing in real time, before performing upgrades on the server, I've created a dashboard displaying all the information on one page. It's not perfect, because Google Analytics Realtime API is quite limited, but it does the job.

## Story


I've been hosting a few customer and personal websites for quite some time on the cloud and the same problem comes up again and again. I need to update the server, upgrade the operating system, install a new version of some software component and all of that means some down time.

I want to cause the minimum amount of disruption for the website visitors so I tend to perform these tasks late at night when the traffic is low. Using Google Analytics, I can easily find out when a site is least likely to have many visitors. However, <strong>there is no way to view the number of visitors in realtime across all of your websites.</strong>.

One evening, I had some spare time - and wanted to check out the capabilities of Google Analytics realtime API - so I decided to solve this problem by creating a <a href="https://mango-is.com/tools/multiga/">dashboard displaying the realtime visits</a> for multiple websites at a time.

The concept is pretty simple:

1. The dashboard user clicks a "Login with Google" button to give access to their Google Analytics account.
2. Data is retrieved, and the dashboard shows the realtime visits of each property and views of one account.
3. You can switch between accounts, if needed using a dropdown menu.

<img src="/img/multiGa.gif" alt="preview/demo of multiGa" class="u-img-responsive fa-border"/>


## Findings


### Benefits

1. multiGa is super simple to use, and shows the realtime visits metrics in a convenient layout
2. The data remains private, as it transits directly from Google Analytics to your browser. Mango Information Systems servers never have access. This is thanks to the "OAuth 2.0 implicit grant flow" <a href="https://developers.google.com/identity/protocols/OAuth2UserAgent">supported by Google APIs</a>.
3. multiGa is open source, anybody is free to use the code and adapt it to their needs.
4. although primarily aimed at larger screens, multiGa is responsive, and the dashboard looks good on mobile devices.

### Limits

* Unlike Twitter, which offers a real real-time API, Google Analytics realtime API is more "near-real-time'. [Quota limits](https://developers.google.com/analytics/devguides/reporting/realtime/v3/limits-quotas) are easily reached by users that have access to many google analytics properties. As a consequence, the dashboard updates are not done every second for each view.
* In order to avoid reinventing the wheel, I used the [javascript client library](https://developers.google.com/api-client-library/javascript/start/start-js) created by Google, to manage the authentication and connection to the API. This library is pseudo open-source: [only the minified code is available](https://github.com/google/google-api-javascript-client/issues/211), and [barely maintained](https://github.com/google/google-api-javascript-client/graphs/code-frequency). Self-hosting  the library is highly discouraged, a consequence is a usability issue: on some browsers, third-party cookies need to be enabled by the user, otherwise the authentication simply won't work.
* A first version of multiGa used to display the data of all the properties for all accounts that a user has access inside the dashboard. This was problematic for users that have access to many accounts. To simplify this, the display has been limited to all the views and properties of one account at a time.


## Try it yourself and contribute

Connect your google analytics account and try the dashboard <a href="https://mango-is.com/tools/multiga/">here</a> .

We're also open to contributions from other developers. If you'd like to enhance multiGa, [get in touch](https://github.com/Mango-information-systems/mango-is-website/labels/multiGa) ;)
