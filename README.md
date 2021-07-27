# Хочу в тепло!

<br><br/>
"Хочу в тепло!" - это уникальный сервис, который позволяет найти и подобрать для Вас путёвки и авиабилеты, основываясь на температуре воздуха в желаемой Вами локации. С нашей помощью Вы сможете найти подходящий тур или авиабилет максимально быстро!
<br><br/>

<a href="https://www.youtube.com/embed/jzqCPPcDv8A" target="_blank">
<div>
    <img align="left" alt="WantToHeat | youtube" width="22px" src="https://raw.githubusercontent.com/peterthehan/peterthehan/master/assets/youtube.svg" />
    <h3><a href="https://www.youtube.com/embed/jzqCPPcDv8A" target="_blank">Intro-video - Хочу в тепло! | Youtube</a></h3>
  </div>
</a>

Если вам очень хочется в тепло просто зайдите на <a href="https://teplo.herokuapp.com/" >https://teplo.herokuapp.com/</a>! Приложение подберёт для вас в первую очередь самые выгодные туры и авиабилеты.

<ul>
<li>Заходим на <a href="https://todos-and-notes.herokuapp.com">сайт<a/></li>
<img width="850" alt="home" src="./shots/home.png">
<br><br/>
<li>Регистрируемся или входим через Google аккаунт</li>
<img width="850" alt="registration" src="./shots/registration.png">
<br><br/>
<li>Вводим желаемый диапазон температуры или сразу все предложения, что найдем по умолчанию от 0 до самых теплых мест. Доступна дополнительная фильтрация и сортировка для удобного поиска. Аналогично можем выбрать и авиабилеты.</li>
<img width="850" alt="tours" src="./shots/tours.png">
<img width="850" alt="filter" src="./shots/toursFound.png">
<br><br/>
<li>Что бы сохранить выбраный тур или авиабилет просто кликнем по звездочке. В личном кабинете мы сможем найти всё что мы сохранили. А если что то захотим удалить из нашей подборки то снова кликнем на звездочку.</li>
<img width="850" alt="home" src="./shots/profile.png">
</ul>
<br><br/>

# Техгологии в проекте

<br><br/>
Back-end:
Nodejs, Expressjs, Mongoose, MongoDB Atlas, Google oauth2.0, Cors, .env
<br><br/>
На сервере запущен Node Schedule скрипт, который раз в сутки запускает сбор информации с помощью библеотеки Puppeteer и записывает в базу данных. В процессе сбора, скрипт обращается к Yandex Geocode Maps API и Openweathermap API. Так же доступен телеграм бот.
<br><br/>

<p>
  <img alt="Nodejs" height="25" src="https://img.shields.io/badge/-Nodejs-43853d?style=flat-square&logo=Node.js&logoColor=white" />
  <img alt="Passport" height="25" src="https://img.shields.io/badge/-PassportJs-F7B93E?style=flat-square&logo=passport&logoColor=white" />
  <img alt="MongoDB" height="25" src="https://img.shields.io/badge/-MongoDB-13aa52?style=flat-square&logo=mongodb&logoColor=white" />
  <img alt="Express" height="25" src="https://img.shields.io/badge/-ExpressJs-F7B93E?style=flat-square&logo=express&logoColor=white" />
</p>
<br><br/>
Front-end:
React, Redux, Redux Thunk, Redux devtools, CSS
<br><br/>
Верстка выполнена с помощью библеотеки Bootstrap.
<br><br/>
<p>
<img alt="React" height="25" src="https://img.shields.io/badge/-React-45b8d8?style=flat-square&logo=react&logoColor=white" />
<img alt="Redux" height="25" src="https://img.shields.io/badge/-Redux-764ABC?style=flat-square&logo=redux&logoColor=white" />
<img alt="Sass" height="25" src="https://img.shields.io/badge/-Sass-CC6699?style=flat-square&logo=sass&logoColor=white" />
<img alt="Html5" height="25" src="https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" />
<img alt="CCS3" height="25" src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
<img alt="Bootsstrap" height="25" src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white" />
<br><br/>
</p>
