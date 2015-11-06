# shogun2-client

*shogun2-client* is an open project which provides a client web application for [SHOGun2](https://github.com/terrestris/shogun2) based on the [BasiGX](https://github.com/terrestris/BasiGX) package. By default, *shogun2-client* is used when a SHOGun2 webapplication is created with the `shogun2-webapp-archetype`.

## Requirements

*shogun2-client* basically requires the same libraries / tools as [SHOGun2](https://github.com/terrestris/shogun2) and [BasiGX](https://github.com/terrestris/BasiGX) , espacially:
* [Apache Maven](https://maven.apache.org/)
* [Sencha Cmd v 6.0.2.14](https://www.sencha.com/products/sencha-cmd/)
* [ExtJS 6](https://www.sencha.com/products/extjs/#overview)

## Installation

* Update/checkout SHOGun2 and run `mvn clean install` in SHOGun2 project directory (the `src` folder)
  * Please note: If SHOGun2 is updated you also have to reinitialize with `mvn clean install`
* Generate your own fork of *shogun2-client*
* Generate web application based on shogun2-webapp-archetype, e.g. with
  * [Eclipse Maven Plugin](http://www.eclipse.org/m2e/)
  * executing the following command (ideally in your Eclipse workspace directory): https://github.com/terrestris/shogun2/wiki/Getting-started#generate-a-shogun2-based-web-application
* After creation of the web application, set URL of your shogun2-client fork (username: `{github_username}`) in `pom.xml`:

   `<developerConnectionUrl>scm:git:git://github.com/{github_username}/shogun2-client.git</developerConnectionUrl>`

* Run `mvn scm:checkout` in project directory `{projectDir}`
* Go to `{projectDir}/src/main/webapp/client` and run:

  `git remote add upstream https://github.com/terrestris/shogun2-client.git`

* Run `sencha app upgrade /path/to/extjs`

* Run `sencha app refresh`

* run tomcat or use `sencha app watch`

* open http://localhost:1841/client

# Feedback

Feedback is more than welcome. Please open an issue or contact us directly via `info@terrestris.de`

# License

GPL v3
