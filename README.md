# SourceSync.io Administration Application

The default [sourcesync.io](https://sourcesync.io/#/) platform administration application. [Sourcesync.io](https://sourcesync.io/#/) is
an open platform that lets you monitize your existing content in amazing ways.

Like anything on the platform, you can also customize the administration app
that lets you manage your content and metacontent.

This application is live in production.

Feel free to make a PR to this repository or fork it and build your own! Once
you're happy with your own version, you can submit it to our marketplace and
monitize your work and bring your new features to the world! :)

### Requirements:
* Node.js (LTS version)
* Yarn (Yarn is strongly recommended over npm)

### Install the dependencies:
```bash
yarn
```

#### Start the app in development mode (hot-code reloading, error reporting, etc.):
```bash
yarn run dev
```

#### Lint the files
```bash
yarn run lint
```

#### Build the app for production
```bash
yarn run build
```

### Limitations

#### API
Our API is limited to 10 requests per minute per user (unless you login). Set your API token if you have a higher-limit account. If you exceed your limit you will be rate limited for 1 minute.

> NOTE: Do NOT share your API token unless you are ok with the public consuming your API credits. You will most likely want to set their API tokens *private* by wrapping calls to our services behind your own services.


# Creating an app
Setting up an application on sorucesync.io is simple. 

1. Create a public repository in your account.
2. Place a `package.json` file in the root of your repository and fill in the "sourcesync" fields (described below).
3. Submit your new application [here](https://sourcesync.io/#/submit) by just pasting,  choosing a unique name and providing a link to your public repository.
4. You will get an approval/denial notification once the app is approved from our end. 
5. Once your app gets approved, your app will be available at https://apps.sourcesync.io/your-app-id-here. Make sure `your-app-id-here` doesn't exist already.


### Package.json settings:

The following fields are required in your `package.json` file.

> Our servers will use these fields to automatically update your app when you create new releases!

```
"sourcesync": {
  "name": "The name of your application",
  "slug": "minimum 3 characterss, maximum 50, must be web-friendly"
  "type": "ENUM",
  "category": "ENUM",
  "keywords": "comma, separated, values",
  "version": "0.0.1",
  "privacy": "url",
  "terms": "url",
  "description": "A brief description up to 255 characters",
  "details": "A detailed description",
  "support": "your@email.com",
  "repo": "https://github.com/your-company/your-repo"
}
```

# Releasing new versions

You can upgrade your app and release a new versions. You can also revert back to previous versions/release. Creating new releases for your application is a breeze!  Once your application is approved, you'll automatically get your first release.

> Your app will be available here: https://apps.sourcesync.io/your-app-id-here

Our platform includes a simple and slick updates API that you can hook into to take care of your Ci/CD process. Users of your app can even automatically get notified about and read the latest updates about your app without any coding! Make sure in `packages.json[sourcesync.support]`, you add a correct email.
> It may take upto 10 minutes for your application to become live. 

### Creating an update

Just POST to our [updates api](https://api.sourcesync.io/documentation#/Updates/post_updates) like so
```
POST https://api.sourceysnc.io/updates
headers: {
  Authorization: Bearer Your.JWT.Here
}

Body: {
  "name": "My First Update!",
  "version": "0.0.1",
  "slug": "your-app-id-here",
  "details": "Glorious details about my update in MarkDown",
  "published_at": "date/time to publish the update"
}
```

> The update will only succeed if you provide a valid JWT that owns the app id you're trying to update.

You can create the update to notify our servers that they need to build a new version of your app, however, you can set a "published_at" date to let your users know about the app later.

### Getting a list of your app's updates
To get a list of your apps updates:

```
GET https://api.sourceysnc.io/updates/by-app/your-app-id-here
```
You'll get additional info including the update record IDs.


### Modifying an update you've already made
Once you release a version, it's locked forever to ensure proper support and a healthy platform. You can however modify the description of an update you've already create like this:

```
PUT https://api.sourceysnc.io/updates/:updateId
headers: {
  Authorization: Bearer Your.JWT.Here
}

Body: {
  "name": "My First Update!",
  "version": "0.0.1",
  "slug": "your-app-id-here",
  "details": "Glorious details about my update in MarkDown",
  "published_at": "date/time to publish the update"
}
``` 

### Rolling back app versions

Our platform keeps a copy of every version of your app you've ever released! If a client has trouble with your latest release, they can always revert to any previous version you've had.

> Previous versions are available here: https://apps.sourcesync.io/history/:appName/:version/

For example, if you just released version 1.0.1 of "super-admin", and your previous version was 1.0.0, users could still access the previous version here: `https://apps.sourcesync.io/history/super-admin/1.0.0/`