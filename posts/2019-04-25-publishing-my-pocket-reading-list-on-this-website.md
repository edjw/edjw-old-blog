---
title: Publishing my Pocket reading list on this website
date: 2019-04-25T09:47:49.960Z
---
I've recently added [a page called Reading List to this website](/reading-list) that shows my unread articles in my [Pocket account](http://getpocket.com/). This post details how this works using Eleventy Javascript data files, the Pocket API, IFTT webhooks and Netlify build webhooks.

In case you don't know, Pocket is a service that lets you save links to read/watch later. It's really [well-integrated into Firefox](https://support.mozilla.org/en-US/kb/save-web-pages-later-pocket-firefox).

I recently switched this blog from [Jekyll](https://jekyllrb.com) to [Eleventy](https://www.11ty.io). Eleventy is a [static-site generator](https://indieweb.org/static_site_generator).

One of the things Eleventy lets you do is [make data returned by a Javascript file](https://www.11ty.io/docs/data-js/) available to your website. This means you can pull in data from an external API and feed it to your templates to display on your website. 

Thanks to [Bryan L. Robinson for his blog](https://bryanlrobinson.com/blog/2019/04/02/using-eleventys-javascript-data-files) for explaining how to get Eleventy's Javascript data files working with the Meetup API. I've adapted his work for my purposes.

My [`readingList.js`](https://github.com/edjw/edjw-blog/blob/master/_data/readingList.js) Javascript data file: 1) pulls in all my items saved in Pocket, 2) reverses the order so they're roughly in descending publication date order, and 3) excludes any items I've tagged in Pocket as 'private'.

You need a Pocket API Consumer Key to access the Pocket API which [you can get here](https://getpocket.com/developer/apps). You also need a Pocket Access Token. [Felix Neumann's tool here](https://reader.fxneumann.de/plugins/oneclickpocket/auth.php) lets you easily generate one using your Pocket API Consumer Key from above



The thing IFTT doesn't seem to be able to do is trigger a webhook if a tag is removed. So the 12am trigger sets off a build once a day to show any items that I had tagged as 'private' and then removed that tag.
