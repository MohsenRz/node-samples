const yargs = require('yargs');

var { getMovieByTitle, getMovieByTitleAndYear } = require('./movieApi');

const argv = yargs
  .options({
    title: {
      demand: true,
      alias: 't',
      describe: 'movie title',
      string: true
    },
    year: {
      alias: 'y',
      describe: 'year'
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

const title = argv.title;
const year = argv.year;


if (title && year)
  getMovieByTitleAndYear(title, year).then(res => console.log(res)).catch(err => console.log(err.message));

else if (title)
  getMovieByTitle(title, (error, response) => {
    if (error)
      return console.log(error);
    console.log(response);
  });




