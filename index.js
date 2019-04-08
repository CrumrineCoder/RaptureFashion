/*const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const errorHandler = require('errorhandler');
const mongoose = require('mongoose');
const passport = require('passport');

require('dotenv').config();

mongoose.promise = global.Promise;

const isProduction = process.env.NODE_ENV === 'production';

const app = express();

// Serve the static files from the React app

app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(session({ secret: 'Barrett', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
// Init passport authentication 
app.use(passport.initialize());
// persistent login sessions 
app.use(passport.session());



if (!isProduction) {
	app.use(errorHandler());
}

const mLab = 'mongodb://' + process.env.dbUSER + ':' + process.env.dbPASS + process.env.dbHOST + '/' + process.env.dbNAME + '?authMode=scram-sha1';

mongoose.connect(mLab);
mongoose.set('debug', true);

// Add models
require('./models/Polls');
require('./models/Users');
require('./config/passport');
// Add routes
app.use(require('./routes'));

app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});


if (!isProduction) {
	app.use((req, res, err) => {
		res.status(err.status || 500);

		res.json({
			errors: {
				message: err.message,
				error: err,
			},
		});
	});
}


// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);*/
/*
require('isomorphic-fetch');

const Koa = require('koa');
const session = require('koa-session');
const {default: shopifyAuth, verifyRequest} = require('@shopify/koa-shopify-auth');

const {SHOPIFY_API_KEY, SHOPIFY_SECRET} = process.env;

const app = new Koa();
app.keys = [SHOPIFY_SECRET];

app
  // sets up secure session data on each request
  .use(session(app))

  // sets up shopify auth
  .use(
    shopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_SECRET,
      scopes: ['write_orders, write_products'],
      afterAuth(ctx) {
        const {shop, accessToken} = ctx.session;

        console.log('We did it!', accessToken);

        ctx.redirect('/');
      },
    }),
  )

  // everything after this point will require authentication
  .use(verifyRequest())

  // application code
  .use(ctx => {
    ctx.body = '🎉';
  });
  */
require('isomorphic-fetch');
const Koa = require('koa');
const next = require('next');
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth');
const dotenv = require('dotenv');
const { verifyRequest } = require('@shopify/koa-shopify-auth');
const session = require('koa-session');
dotenv.config();
const { default: graphQLProxy } = require('@shopify/koa-shopify-graphql-proxy');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY } = process.env;

app.prepare().then(() => {
  const server = new Koa();
  server.use(session(server));
  server.keys = [SHOPIFY_API_SECRET_KEY];

  server.use(
    createShopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET_KEY,
      scopes: ['read_products', 'write_products'],
      afterAuth(ctx) {
        const { shop, accessToken } = ctx.session;
        ctx.cookies.set('shopOrigin', shop, { httpOnly: false })
        ctx.redirect('/');
      },
    }),
  );

  server.use(graphQLProxy());
  server.use(verifyRequest());
  server.use(async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
    return
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});