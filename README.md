# Split Mobile Application

- The main purpose of the application is to provide communication between people of similar interests. While there are many 
applications that are based on space or especially based on this application, it aims to gain another dimension by filtering 
feature.
- One's interests can be addressed to a wide range of areas other than the profession, so it aims to look at a larger 
perspective.
- This application aims to create a new social media platform.

## Getting Started

This project is taking 3 parts. The first part is database connection, the second part is backend services (api install) and the last part is client side.


### Requirements
* Ionic and Cordova
  - Ionic Framework    : ionic-angular 3.9.3
  - @ionic/cli-utils: 1.9.2
  - @ionic/app-scripts : 3.2.1
  - ionic (Ionic CLI) : 3.9.2
  - Cordova CLI : 8.1.2 (cordova-lib@8.1.1) 
  - Cordova Platforms  : android 6.3.0 browser 5.0.4

* System:
  - ios-deploy : 1.9.2 
  - Node       : v10.15.1
  - npm        : 6.4.1 
  - OS         : macOS High Sierra

* Python : 3.7.1
  - Flask micro framework : 1.0.2


### Prerequisites
#### Mysql Connection (Database side)
You need to install mysql to run the project in local environment.

Go MySQL website then download [MySQL for MAC](https://dev.mysql.com/downloads/mysql/)

#### Back-end Services (API)
All back-end services are written in python. At first you need to download python.

Go Python website then download [Python for MAC](https://www.python.org/downloads/mac-osx/)

We have installed python, but we need to install some packages as well. You need to go to [this link](https://github.com/ageitgey/face_recognition#requirements) for face recognition system package.

For the remaining packages you can download the following steps to your computer with pip package manager.

```
pip install -U Flask
pip install flask-mysql
pip install passlib
pip install requests
pip install base64
```

#### Client Side (Ionic Application)

Since this application is based on node js, first you need to download nodejs [from here](https://nodejs.org/en/download/)

Use [this link](https://ionicframework.com/docs/installation/cli) to download the ionic framework.

And finally you need to install cordova, to get your application build. Use [this link](https://cordova.apache.org/#getstarted) to download Cordova.


## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
