# shogun2-client

[![Build Status](https://travis-ci.org/terrestris/shogun2-client.svg?branch=master)](https://travis-ci.org/terrestris/shogun2-client?branch=master)

*shogun2-client* is an open project which provides a client web application for [SHOGun2](https://github.com/terrestris/shogun2) based on the [BasiGX](https://github.com/terrestris/BasiGX) package. By default, *shogun2-client* is used when a SHOGun2 webapplication is created with the `shogun2-webapp-archetype`.

## Requirements

*shogun2-client* basically requires the same libraries / tools as [SHOGun2](https://github.com/terrestris/shogun2) and [BasiGX](https://github.com/terrestris/BasiGX) , especially:
* [Apache Maven](https://maven.apache.org/)
* [Sencha Cmd v 6.0.2.14](https://www.sencha.com/products/sencha-cmd/)
* [ExtJS 6](https://www.sencha.com/products/extjs/#overview)

## Installation

1. Update/checkout SHOGun2 and run `mvn clean install` in SHOGun2 project directory (the `src` folder)

  * Please note: If SHOGun2 is updated you also have to reinitialize it with `mvn clean install`

2. Generate your own fork of *shogun2-client*

3. Generate a web application based on shogun2-webapp-archetype, e.g. with

  * [Eclipse Maven Plugin](http://www.eclipse.org/m2e/)

  * Execute the following command (ideally in your Eclipse workspace directory): https://github.com/terrestris/shogun2/wiki/Getting-started#generate-a-shogun2-based-web-application

4. After creation of the web application, set the URL of your shogun2-client fork (username: `{github_username}`) in `pom.xml`:

   `<developerConnectionUrl>scm:git:git://github.com/{github_username}/shogun2-client.git</developerConnectionUrl>`

5. Go to our in project directory `{projectDir}` and run

  `$ mvn scm:checkout`

6. Go to `{projectDir}/src/main/webapp/client` and run:

  `$ git remote add upstream https://github.com/terrestris/shogun2-client.git`

7. In the same folder run

  `$ sencha package repo add BasiGX http://terrestris.github.io/BasiGX/cmd/pkgs`

  `$ sencha app upgrade {/path/to/extjs}`

  `$ sencha app refresh`

8. Run tomcat with your SHOGun2-webapplication (or use `sencha app watch`)

9. Open

  `http://localhost:8080/{webapp-name}/client/index.html?id={applicationId}`

  Note: To get a valid `{applicationId}` just follow these steps:

    * Adapt and open this URL:

      `http://localhost:8080/{webapp-name}/application/findAll.action`

    * The response will list all of your current SHOGun2 applications (and normally it should return the default one named _Default Application_ only)

    * Find the entry `id` containing the ID of the application (e.g. `"id": 50`)

    * Use this ID as GET parameter (see above)

# Feedback

Feedback is more than welcome. Please open an issue or contact us directly via `info@terrestris.de`

# License

GPL v3
