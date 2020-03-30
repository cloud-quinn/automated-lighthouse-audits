
## Cloud Quinn Automated Lighthouse Audits

This is an example script for utilising the [Lighthouse CLI](https://github.com/GoogleChrome/lighthouse/blob/master/docs/readme.md#using-programmatically) to run an audit against your web page automatically.

It is a very basic use case of capturing and saving the key scores the audit provides:

- Performance

- Accessibility

- Best Practices

- SEO (Search Engine Optimisation)

- PWA (Progressive Web App)

It also saves a predefined set of metrics as defined in ```./metrics.js```. To save a different set of metrics, simply amend the values in the array returned from this file. Make sure all of the values you define exist in the [list of valid metrics](https://docs.google.com/spreadsheets/d/1up5rxd4EMCoMaxH8cppcK1x76n6HLx0e7jxb0e0FXvc/edit#gid=0).

The script is coded to return the ```numericValue``` for each metric - this is an the amount of time in milliseconds. For example, a value of 2500 for the 'interactive' metric would mean the page took two and a half seconds to become fully responsive to user input.

Please feel free to extend these scripts to account for your preferences and requirements.

## Setting up locally

```bash

git clone https://github.com/cloud-quinn/automated-lighthouse-audits.git

cd automated-lighthouse-audits

npm i

```

To run an audit, run ```npm start <urlToAudit>``` in your terminal.
  
For example, to run an audit against http://bashcorp.co.uk, the command would be ```npm start http://bashcorp.co.uk```

Running the unit tests

```npm test```