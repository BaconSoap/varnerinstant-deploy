# varnerinstant-deploy

continuous deployment for people like me

deploy automation by listening to github hooks. designed for fitting into my workflow, not for general usefulness. use to call existing deploy scripts on git push.

# testing

- copy `.env` and set `GITHUB_SECRET` to your remote's secret
- `ngrok` and change the webhook to your ngrok url: `blah.ngrok.io/github/callback`
