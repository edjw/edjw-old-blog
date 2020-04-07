**Problem**

Don't want to use GA.

Running own server for Matomo is too much. Don't need all that

Don't want to pay £9 a month for Netlify analytics or similar

Want to have some idea of how pages on my personal blog and maybe a few side projects are doing

**What analytics do I want?**
How many visits each page has had in the last 90/30/7/1 days

Anything else?

**What do I need to record for that?**

On each page visit, record:
* name of page
* date/time of visit

**Idea**

Put a script in base template

Script makes api call to a netlify function, sending the epoch time and the title or slug of the page to a Fauna DB

Wipe the database nightly for anything over 90 days old 

**What does the fauna database look like**

Does this have to be a fauna db? Why not just a big json file?

https://jsonbin.org

```json

{
   "edjohnsonwilliams.co.uk": { 
       "home": {
        "1": {
            "time": "1586113556"
        },
        "2": {
            "time": "1586113556"
        },
        "3": {
            "time": "1586113556"
        },
        "4": {
            "time": "1586113556"
        }
   },
    "about": {
        "1": {
            "time": "1586113556"
        },
        "2": {
            "time": "1586113556"
        },
        "3": {
            "time": "1586113556"
        },
        "4": {
            "time": "1586113556"
        }
    },
     "2017-06-15-a-simplistic-post-on-liberalism-and-christianity": {
        "1": {
            "time": "1586113556"
        },
        "2": {
            "time": "1586113556"
        },
        "3": {
            "time": "1586113556"
        },
        "4": {
            "time": "1586113556"
        }
    }
}

```