
#  __Модуль для работы с AJAX в Browser JS и Node.JS__ 

## __Оглавление__
&nbsp;

+ [__Краткое описание__](#краткое-описание)
+ [__Класс Jax__](#класс-jax)
    + [__Поля и свойства__](#поля-и-свойства)
        + [__Jax.SEND_TYPES__](#jaxsend_types-object)
        + [__Jax.RESPONSE_TYPES__](#jaxresponse_types-object)
        + [__Jax.CREDENTIALS__](#jaxcredentials-object)
        + [__Jax.MIME_FILES__](#jaxmime_files-arrayanyany-только-чтение)
        + [__Jax.PROTOCOL__](#jaxprotocol-string-только-чтение)
        + [__Jax.useFetch__](#jaxusefetch-boolean)
        + [__Jax.isServer__](#jaxisserver-boolean)
    + [__Функции__](#функции)
        + [__Jax.setSSL()__](#jaxgeturlparams)
        + [__Jax.get()__](#jaxgeturlparams)
        + [__Jax.post()__](#jaxposturlparams)
        + [__Jax.put()__](#jaxputurlparams)
        + [__Jax.delete()__](#jaxdeleteurlparams)
        + [__Jax.file()__](#jaxfileurlparams)
+ [__Класс JFile__](#класс-jfile)
    + [__Поля и свойства__](#d0bfd0bed0bbd18f-d0b8-d181d0b2d0bed0b9d181d182d0b2d0b0-1)
        + [__(JFile)object.contentType__](#jfile-objectcontenttype-string--только-чтение)
        + [__(JFile)object.fullName__](#jfileobjectfullname-string--только-чтение)
        + [__(JFile)object.name__](#jfile-objectname-string--только-чтение)
        + [__(JFile)object.ext__](#jfile-objectext-string--только-чтение)
        + [__(JFile)object.size__](#jfile-objectsize-number--только-чтение)
        + [__(JFile)object.data__](#jfile-objectdata-jbuffer--только-чтение)
        + [__(JFile)object.path__](#jfile-objectpath-string--только-чтение---только-в-nodejs)
    + [__Функции__](#d184d183d0bdd0bad186d0b8d0b8-1)
        + [__JFile.load()__](#jfileloadfile)
+ [__Класс JFileList__](#класс-jfilelist)
    + [__Поля и свойства__](#d0bfd0bed0bbd18f-d0b8-d181d0b2d0bed0b9d181d182d0b2d0b0-2)
        + [__(JFileList)object.length__](#jfilelistobjectlength-number--только-чтениe)
    + [__Функции__](#d184d183d0bdd0bad186d0b8d0b8-2)
        + [__JFileList.constructor()__](#jfilelistconstructorfiles)
        + [__JFileList.load()__](#jfilelistloadfiles)
        + [__(JFileList)object.push()__](#jfilelist-objectpushfile)
        + [__(JFileList)object.pop()__](#jfilelist-objectpop)
        + [__(JFileList)object.shift()__](#jfilelist-objectshift)
        + [__(JFileList)object.unshift()__](#jfilelist-objectunshiftfile)
        + [__(JFileList)object.concat()__](#jfilelist-objectconcatlist)
        + [__(JFileList)object.toArray()__](#jfilelist-objecttoarray)
        + [__(JFileList)object.toString()__](#jfilelist-objecttostring)
+ [__Класс JFormData__](#класс-jformdata)
    + [__Функции__](#d184d183d0bdd0bad186d0b8d0b8-3)
        + [__(JFormData)object.from()__](#jformdataobjectfromparams)
        + [__(JFormData)object.fromDOM()__](#jformdataobjectfromdomparams)
        + [__(JFormData)object.get()__](#jformdataobjectgetname)
        + [__(JFormData)object.set()__](#jformdataobjectsetnamevalue)
        + [__(JFormData)object.isset()__](#jformdataobjectissetname)
        + [__(JFormData)object.delete()__](#jformdataobjectdeletename)
        + [__(JFormData)object.entries()__](#jformdataobjectentries)
        + [__(JFormData)object.toObj()__](#jformdataobjecttoobj)
        + [__(JFormData)object.toMultipart()__](#jformdataobjecttomultipart)
+ [__Класс JBuffer__](#класс-jbuffer)
    + [__Функции__](#d184d183d0bdd0bad186d0b8d0b8-4)
        + [__JBuffer.constructor()__](#jbufferconstructorbuffer)
        + [__JBuffer.fromBlob()__](#jbufferfromblobblob)
        + [__JBuffer.concat()__](#jbufferconcatbuffers)
        + [__JBuffer.toText()__](#jbuffertotextbuffer)
        + [__(JBuffer)object.concat()__](#jbufferobjectconcatbuffers)
        + [__(JBuffer)object.split()__](#jbufferobjectsplitlenall)
        + [__(JBuffer)object.toText()__](#jbufferobjecttotext)
+ [__Класс Url__](#класс-url)
    + [__Функции__](#d184d183d0bdd0bad186d0b8d0b8-5)
        + [__Url.encode()__](#urlencodeparams-addr-add)
        + [__Url.decode()__](#urldecodeurl)

&nbsp;


## __Краткое описание__  
&nbsp;

__Jax__ это универсальный кросс-платформенный класс для отправки запросов из браузера на сервер, либо с сервера на сервер. Библиотека работает одинаково как на Node.JS так и в браузерах. Поддерживаются следующие запросы:

- __GET__

- __POST__

- __PUT__

- __DELETE__

По умолчанию для отправки запросов из браузера используется XMLHttpRequest, есть поддержка Fetch API. Для отправки с Node.JS
используются стандартные пакеты Node - http/https.
Различия в отправке данных с сервера и клиента заключаются только в отправляемых данных. Для удобства и поддержки кросплатформенности пакет включает в себя несколько вспомогательных классов - __JFile__, __JFileList__, __JFormData__ и __JBuffer__. Для отправки запросов следует использовать методы и свойства Jax которые будут описаны ниже

&nbsp;

&nbsp;


## __Класс Jax__

### __Поля и свойства__
&nbsp;
#### __Jax.SEND_TYPES__ _(Object)_
Объект-перечисление представляющий способы отправки данных, имеет следующие значения:
- URL - отправляет данные как закодированную URL-строку ( используется по умолчанию для GET и DELETE запросов ), нельзя отправлять файлы
- JSON - отправляет данные в формате JSON
- FORM - отправляет данные с заголовком multipart/form-data ( используется по умолчанию при отправке форм )
&nbsp;

&nbsp;

#### __Jax.RESPONSE_TYPES__ _(Object)_
Объект-перечисление представляющий формат получения ответа на запрос, имеет следующие значения
- TEXT - возвращает ответ в виде текстовой строки
- BUFFER - возвращает объект JBuffer
- JSON - возвращает объект с данными из JSON
- BLOB - возвращает объект Blob
- DOC - В зависимости от используемого API возвращает разный результат
&nbsp;

&nbsp;

#### __Jax.CREDENTIALS__ _(Object)_
Объект-перечисление представляющий разрешения на отправку стандартных учетных данных, имеет следующие значения
- NO_SEND - Не отправлять учетные данные при отправке запроса ( используется по умолчанию ) ( при отправке с помощью XMLHttpRequest, равен withCredentials=false )
- SAME_ORIGIN - Отправляет учетные данные только если вызвающий скрипт находится в том же источнике что и URL-адрес запроса ( при отправке с помощью XMLHttpRequest, равен withCredentials=false )
- ALL_SEND - Всегда отправляет учетные данные ( при отправке с помощью XMLHttpRequest, равен withCredentials=true )
&nbsp;

&nbsp;

#### __Jax.MIME_FILES__ _(Array<[any,any]>)_ _(только чтение)_
Представляет массив mime-типов в котором тип и расширение хранятся по парам __( Пример: \['video/3gpp','.3gp'\] )__
&nbsp;

&nbsp;

#### __Jax.PROTOCOL__ _(String)_ _(только чтение)_
_(значение по умолчанию: 'http')_

Возвращает протокол используемый по умолчанию для отправки запросов. _(Для установки протокола см. [Jax.setSSL()](#jaxsetsslisset))_
&nbsp;

&nbsp;

#### __Jax.useFetch__ _(Boolean)_
Представляет логическое значение, указывающее следует ли использовать Fetch API вместо XMLHttpRequest при отправке запросов ( по умолчанию - false )_( работает только для браузеров )_
&nbsp;

&nbsp;

#### __Jax.isServer__ _(Boolean)_
Представляет логическое значение, определяющее откуда был запущен скрипт, из Node.JS или браузера __( определяется автоматически при использовании )__
&nbsp;

&nbsp;
### __Функции__

#### __Jax.setSSL(isSet)__ 

Функция для установки протокола запросов. Протокол нужен в том случае если он не указан в URL-адресе запроса

#### __Параметры:__
- __isSet__ ( _Boolean_ ) (_не обязательный_) - Логическое значение, если true - установит HTTPS _(по умолчанию)_, если false - HTTP

#### __Jax.get(url,params)__ 

Функция для отправки GET-запроса

#### __Параметры:__
- __url__ ( _String_ ) - URL-адрес отправки
- __params__ ( _Object_ ) - Объект с параметрами запроса
    - __params.headers__ ( _Map<string,string>_)(_не обязательный_ ) - Коллекция дополнительных заголовков запроса, где ключ - наименование заголовка. __Сontent-Type заголовок добавлять не нужно!__
    - __params.body__ ( _Object | JFormData | FormData | Map | HTMLFormElement | string_ )( _не обязательный_ ) - Тело запроса, может быть объектом, формой, HTML-элементом либо строкой(id формы, только для браузера), все данные будут закодированны в виде URL строки при отправке. Файлы отправлять нельзя
    - __params.responseType__ ( _String_ )( _не обязательный_ ) - Устанавливает тип ответа, смотреть - [Jax.RESPONSE_TYPES](#jaxresponse_types-object)
    - __params.credentials__ ( _String_ )( _не обязательный_ ) - Параметр для установки разрешения на отправку учетных данных, смотреть - [Jax.CREDENTIALS](#jaxcredentials-object)
    - __params.progress__ ( _Function_ )( _не обязательный_ ) - Callback-функция для получения текущего прогресса отправки данных __( не работает в Node.JS )__

#### __Возврат:__
( ___Promise\<object\>___ ) В случае успешного выполнения вернет объект с результатом следующего вида

```js
{
    success: true
    data: /*response*/ 
}

Свойство data необходимо проверять на undefined, т.к. его может и не быть если с сервера был отправлен только код состояния
```

__Пример GET-запроса:__
```js
Jax.get('http://example/jax-get',{
    body:{
        user:'TestUser',
        age:18,
        policy:true,
    }
}).then(result=>{
    console.log(result)
}).catch(err=>{
    console.error(err)
})

```
&nbsp;

---
&nbsp;
#### __Jax.post(url,params)__  

Функция для отправки POST-запроса

#### __Параметры:__
- __url__ ( _String_ ) - URL-адрес отправки
- __params__ ( _Object_ ) - Объект с параметрами запроса
    - __params.headers__ ( _Map<string,string>_)(_не обязательный_ ) - Коллекция дополнительных заголовков запроса, где ключ - наименование заголовка. __Сontent-Type заголовок добавлять не нужно!__
    - __params.body__ ( _Object | JFormData | FormData | Map | HTMLFormElement | string_ )( _не обязательный_ ) - Тело запроса, может быть объектом, формой, HTML-элементом либо строкой(id формы, только для браузера). Способ отправки зависит от нескольких факторов, подробнее об этом смотрите ниже - [Перейти]
    - __params.sendType__ ( _String_ )( _не обязательный_ ) - Устанавливает способ отправки, смотреть - [Jax.SEND_TYPES](#jaxsend_types-object)
    - __params.responseType__ ( _String_ )( _не обязательный_ ) - Устанавливает тип ответа, смотреть - [Jax.RESPONSE_TYPES](#jaxresponse_types-object)
    - __params.credentials__ ( _String_ )( _не обязательный_ ) - Параметр для установки разрешения на отправку учетных данных, смотреть - [Jax.CREDENTIALS](#jaxcredentials-object)
    - __params.progress__ ( _Function_ )( _не обязательный_ ) - Callback-функция для получения текущего прогресса отправки данных __( не работает в Node.JS )__

#### __Возврат:__
( ___Promise\<object\>___ ) В случае успешного выполнения вернет объект с результатом

__Пример POST-запроса:__
```js
Jax.post('http://example/jax-get',{
    body:{
        user:'TestUser',
        age:18,
        policy:true,
    }
}).then(result=>{
    console.log(result)
}).catch(err=>{
    console.error(err)
})

```
__Особенности POST__

#### _Случай №1:_
При передаче параметра sendType, он может быть проигнорирован в случае если в body был передан id HTML-формы или HTMLFormElement, но только в том случае если в форме есть поля input c типом file. Тогда неважно какой тип был передан 
в sendType он по умолчанию будет заменен на multipart/form-data.

#### _Случай №2:_
Если в body был передан объект в свойствах которого есть значения типов JFile, JFileList, File, FileList, а sendType установлен как application/x-www-form-urlencoded (по умолчанию), то эти свойства будут игнорироваться.

#### _Случай №3:_
Если в body был передан объект в свойствах которого есть значения типов JFile, JFileList, File, FileList, а sendType установлен как application/json, то эти свойства будут сериализованы в JSON как пустые объекты, т.к. у объектов этих типов нет открытых свойств

__Отправка файлов через POST__ 

Для корректной отправки файлов рекомендуется устанавливать sendType в multipart/form-data _(Jax.SEND_TYPES.FORM)_, и передавать данные в виде FormData, JFormData либо объекта. Примеры смотрите ниже.

_Пример №1:_ Отправка с использованием id формы

Предположим что нужно передать форму с файлам с клиента(браузера) на сервер. На клиенте есть следующая форма для загрузки изображений:
```html
<form id="form">
    <input type="text" id="email" name="email">
	<input type="file" id="file" name="photo" multiple>
	<button id="send-button" type="button">Send</button>
</form>
```
Запрос:
```js
Jax.post('http://example/send-files',{
    body:'form'
}).then(result=>{
    console.log(result)
}).catch(err=>{
    console.error(err)
})
```
Запрос будет выполнен корректно и все данные переданные в форму буду конвертированы внутри запроса в multipart/form-data _( см. [Случай№1](#случай-№1) )_

_Пример №2:_ Отправка с использованием HTMLFormElement
За основу возьмем HTML-форму с предыдущего примера
```js
let form = document.getElementById('form')
if(form){
    Jax.post('http://example/send-files',{
        body:form
    }).then(result=>{
        console.log(result)
    }).catch(err=>{
        console.error(err)
    })
}

```
Так же как и в первом примере запрос будет успешно отработан

_Пример №3:_ Отправка с использованием [JFormData](#класс-jformdata) или Object

Данный способ подойдет когда нет HTMLFormElement на странице, либо при отправке с сервера на сервер(будет отличаться только способ загрузки файлов, подробнее см. [JFile](#класс-jfile) и [JFileList](#класс-jfilelist)). 

Предположим что мы отправляем два файла и email пользователя с одного сервера на другой:

```js
let form = new JFormData()
let files = await JFileList.load([
    './images/1.png',
    './images/2.png'
])
if(files && files?.length){
    form.set('images',files)
    form.set('email','example@mail.com')

    Jax.post('http://example/send-files',{
        body:form,
        sendType:Jax.SEND_TYPES.FORM //явно указываем способ отправки
    }).then(result=>{
        console.log(result)
    }).catch(err=>{
        console.error(err)
    })
}

```
Тоже самое но с использованием объекта:

```js
let files = await JFileList.load([
    './images/1.png',
    './images/2.png'
])

if(files && files?.length){
    Jax.post('http://example/send-files',{
        body:{
            files,
            email:'example@mail.com' 
        },
        sendType:Jax.SEND_TYPES.FORM //явно указываем способ отправки
    }).then(result=>{
        console.log(result)
    }).catch(err=>{
        console.error(err)
    })
}
```

Если у вы хотите отправить только файлы, рекомендуется посмотреть [Jax.file](#jaxfileurlparams)


&nbsp;

---
&nbsp;
#### __Jax.put(url,params)__ 

Функция для отправки PUT-запроса

#### __Параметры:__
- __url__ ( _String_ ) - URL-адрес отправки
- __params__ ( _Object_ ) - Объект с параметрами запроса
    - __params.headers__ ( _Map<string,string>_)(_не обязательный_ ) - Коллекция дополнительных заголовков запроса, где ключ - наименование заголовка. __Сontent-Type заголовок добавлять не нужно!__
    - __params.body__ ( _Object | JFormData | FormData | Map | HTMLFormElement | string_ )( _не обязательный_ ) - Тело запроса, может быть объектом, формой, HTML-элементом либо строкой(id формы, только для браузера), все данные будут закодированны в виде URL строки при отправке. Файлы отправлять нельзя
    - __params.responseType__ ( _String_ )( _не обязательный_ ) - Устанавливает тип ответа, смотреть - [Jax.RESPONSE_TYPES](#jaxresponse_types-object)
    - __params.sendType__ ( _String_ )( _не обязательный_ ) - Устанавливает способ отправки, смотреть - [Jax.SEND_TYPES](#jaxsend_types-object)
    - __params.credentials__ ( _String_ )( _не обязательный_ ) - Параметр для установки разрешения на отправку учетных данных, смотреть - [Jax.CREDENTIALS](#jaxcredentials-object)
    - __params.progress__ ( _Function_ )( _не обязательный_ ) - Callback-функция для получения текущего прогресса отправки данных __( не работает в Node.JS )__

#### __Возврат:__
( ___Promise\<object\>___ ) В случае успешного выполнения вернет объект с результатом следующего вида

```js
{
    success: true
    data: /*response*/ 
}

Свойство data необходимо проверять на undefined, т.к. его может и не быть если с сервера был отправлен только код состояния
```

&nbsp;

---
&nbsp;
#### __Jax.delete(url,params)__ 

Функция для отправки DELETE-запроса

#### __Параметры:__
- __url__ ( _String_ ) - URL-адрес отправки
- __params__ ( _Object_ ) - Объект с параметрами запроса
    - __params.headers__ ( _Map<string,string>_)(_не обязательный_ ) - Коллекция дополнительных заголовков запроса, где ключ - наименование заголовка. __Сontent-Type заголовок добавлять не нужно!__
    - __params.body__ ( _Object | JFormData | FormData | Map | HTMLFormElement | string_ )( _не обязательный_ ) - Тело запроса, может быть объектом, формой, HTML-элементом либо строкой(id формы, только для браузера), все данные будут закодированны в виде URL строки при отправке. Файлы отправлять нельзя
    - __params.responseType__ ( _String_ )( _не обязательный_ ) - Устанавливает тип ответа, смотреть - [Jax.RESPONSE_TYPES](#jaxresponse_types-object)
    - __params.credentials__ ( _String_ )( _не обязательный_ ) - Параметр для установки разрешения на отправку учетных данных, смотреть - [Jax.CREDENTIALS](#jaxcredentials-object)
    - __params.progress__ ( _Function_ )( _не обязательный_ ) - Callback-функция для получения текущего прогресса отправки данных __( не работает в Node.JS )__

#### __Возврат:__
( ___Promise\<object\>___ ) В случае успешного выполнения вернет объект с результатом следующего вида

```js
{
    success: true
    data: /*response*/ 
}

Свойство data необходимо проверять на undefined, т.к. его может и не быть если с сервера был отправлен только код состояния
```

&nbsp;

---
&nbsp;
#### __Jax.file(url,params)__ 

Функция для отправки файлов, используется POST-запрос. В отличии от [Jax.post()](#jaxposturlparams) можно передавать только файловые объекты. При этом есть отправка в multipart/form-data формате, и отправка бинарных данных каждого файла в отдельном запросе со своим заголовком contentType

#### __Параметры:__
- __url__ ( _String_ ) - URL-адрес отправки
- __params__ ( _Object_ ) - Объект с параметрами запроса
    - __params.headers__ ( _Map<string,string>_)(_не обязательный_ ) - Коллекция дополнительных заголовков запроса, где ключ - наименование заголовка. __Сontent-Type заголовок добавлять не нужно!__
    - __params.body__ ( _File | FileList | JFile | JFileList_ )( _не обязательный_ ) - Тело запроса, может быть объектом, формой, HTML-элементом либо строкой(id формы, только для браузера), все данные будут закодированны в виде URL строки при отправке. Файлы отправлять нельзя
    - __params.isMultipart__ ( _Boolean_ ) - Отправить данные с заголовком multipart/form-data (по умолчанию true)
    - __params.responseType__ ( _String_ )( _не обязательный_ ) - Устанавливает тип ответа, смотреть - [Jax.RESPONSE_TYPES](#jaxresponse_types-object)
    - __params.credentials__ ( _String_ )( _не обязательный_ ) - Параметр для установки разрешения на отправку учетных данных, смотреть - [Jax.CREDENTIALS](#jaxcredentials-object)
    - __params.progress__ ( _Function_ )( _не обязательный_ ) - Callback-функция для получения текущего прогресса отправки данных __( не работает в Node.JS )__

#### __Возврат:__
( ___Promise\<object\>___ ) Возвращает Promise c результатом в случае успешного выполнения 
__* (При установке isMultipart:false и передаче коллекции файлов возвращает массив с результатами всех промисов для каждого файла)__



__Пример отправки файлов:__
```js
let fileInput = document.getElementById('file')
let files = await JFileList.load(fileInput.files)
if(files && files?.length){
	Jax.file('http://localhost:3003/jax-test', {
		body: files,
	}).then(result => {
		console.log(result)
	}).catch(err => {
		console.error(err)
	})
}

```
&nbsp;


&nbsp;
## __Класс JFile__

Класс предназначен для облегчения загрузки и отправки файлов. Данный класс можно использовать в браузерах и Node.JS

### __Поля и свойства__
&nbsp;
#### __(JFile) object.contentType__ _(String)_ _( только чтение )_
Свойство содержащее mime тип файла 
&nbsp;

#### __(JFile)object.fullName__ _(String)_ _( только чтение )_
Свойство содержит полное имя файла с расширением 
&nbsp;

#### __(JFile) object.name__ _(String)_ _( только чтение )_
Свойство содержащее имя файла без расширения
&nbsp;

#### __(JFile) object.ext__ _(String)_ _( только чтение )_
Свойство с расширением файла 
&nbsp;

#### __(JFile) object.size__ _(Number)_ _( только чтение )_
Свойство содержащее размер файла в байтах 
&nbsp;

#### __(JFile) object.data__ _(JBuffer)_ _( только чтение )_
Свойство содержащее данные из файла в виде [JBuffer](#класс-jbuffer) 
&nbsp;

#### __(JFile) object.path__ _(String)_ _( только чтение )_ _( только в Node.js )_
Свойство содержащее путь к файлу
&nbsp;

### __Функции__

#### __JFile.load(file)__ 

Функция для загрузки файла и создания нового объекта jFile

#### __Параметры:__
- __file__ ( _String | File_ ) - Объект File( _в браузерах_ ), либо путь к файлу в виде строки ( _Node.JS_ )

#### __Возврат:__
( ___Promise\<JFile|undefined\>___ ) В случае успешной загрузки файла возвращает промис с новым объектом JFile, иначе вернет промис с undefined

Пример загрузки файла:
```js
let file = await JFile.load('./images/test.png') // в Node.js

let fileBrowser = await JFile.load(fileInput.files[0]) // в браузере, fileInput это input элемент с type=file
```
&nbsp;


&nbsp;
## __Класс JFileList__

Класс является аналогом браузерного FileList, позволяет создавать итерируемые объекты с которыми можно работать как с массивами.
Элементами коллекции могут быть только [JFile](#класс-jfile) объекты

### __Поля и свойства__
&nbsp;
#### __(JFileList)object.length__ _(Number)_ _( только чтениe )_

Свойство содержащее кол-во элементов коллекции
&nbsp;

### __Функции__

#### __JFileList.constructor(files)__ 

Конструктор в который можно передать массив с объектами JFile

#### __Параметры:__
- __files__ ( _Array\<JFile\>_ ) - Массив объектов JFile, если в массиве есть значения другого типа они будут отфильтрованы

&nbsp;

---
&nbsp;

#### __JFileList.load(files)__ 

Функция для загрузки файлов и создания новой коллекции

#### __Параметры:__
- __files__ ( _FileList|File|JFile|Array\<string\>|Array\<File\>|Array\<JFile\>_ ) - Файловые объекты, массив или коллекция файловых объектов или путей к файлам

#### __Возврат:__
( ___Promise\<JFileList|undefined\>___ ) Возвращает промис с новым объектом JFileList. При этом в коллекцию будут добавлены только успешно загруженные файлы. Если ни один файл не удалось загрузить, промис вернет пустую коллекцию, а в случае ошибки undefined

Пример загрузки файлов и создания нового JFileList:
```js
let files = await JFileList.load([
    './images/1.png',
    './images/2.png'
]) 
```
&nbsp;

---
&nbsp;
#### __(JFileList) object.push(file)__ 

Добавляет новый элемент в конец коллекции, добавить можно только объект типа JFile

#### __Параметры:__
- __file__ ( _JFile_ ) - Объект JFile

#### __Возврат:__
( ___Boolean___ ) Возвращает логический результат выполнения функции

Пример:
```js
let file = await JFile.load('./images/1.png')
let list = new JFileList()
if(file)
    console.log(list.push(file)) // Выведет true, новый элемент будет добавлен

let file2 = './images/2.png'
console.log(list.push(file2)) // Выведет false 
```
&nbsp;

---
&nbsp;
#### __(JFileList) object.pop()__ 

Извлекает последний элемент и удаляет его из коллекции

#### __Возврат:__
( ___JFile|undefined___ ) Возвращает объект JFile, либо undefined если коллекция пуста

&nbsp;

---
&nbsp;
#### __(JFileList) object.shift()__ 

Извлекает первый элемент и удаляет его из коллекции

#### __Возврат:__
( ___JFile|undefined___ ) Возвращает объект JFile, либо undefined если коллекция пуста

&nbsp;

---
&nbsp;

#### __(JFileList) object.unshift(file)__ 

Добавляет новый элемент в начало коллекции, добавить можно только объект типа JFile

#### __Параметры:__
- __file__ ( _JFile_ ) - Объект JFile

#### __Возврат:__
( ___Boolean___ ) Возвращает логический результат выполнения функции _(см [push()](#jfilelist-objectpushfile))_

&nbsp;

---
&nbsp;
#### __(JFileList) object.concat(list)__ 

Функция для объединения двух и более коллекций в одну

#### __Параметры:__
- __list__ ( _JFileList|Array\<JFileList\>_ ) - Объект либо массив объектов JFileList

#### __Возврат:__
( ___JFileList___ ) Возвращает новую коллекцию JFileList с элементами объединенных коллекций

&nbsp;

---
&nbsp;
#### __(JFileList) object.toArray()__ 

Функция для получения обычного массива из JFileList

#### __Возврат:__
( ___Array\<JFile\>___ ) Возвращает массив с JFile объектами

&nbsp;

---
&nbsp;
#### __(JFileList) object.toString()__ 

Функция для строчного вывода JFileList

#### __Возврат:__
( ___String___ ) Возвращает форматированную строку с содержимым JFileList

&nbsp;


&nbsp;
## __Класс JFormData__

Класс является аналогом браузерного FormData, позволяет создать объект с данными, которые хранятся в виде пар (ключ-значение)
и правильно преобразовывать эти данные при отправке запроса

### __Функции__

#### __(JFormData)object.from(params)__ 

Функция для преобразования объектов и коллекций в объект JFormData 

#### __Параметры:__
- __params__ ( _JFormData | Map | Object_ ) - Map коллекция или объект

#### __Возврат:__
( ___Promise\<JFormData\>___ ) Возвращает промис с новым объектом JFormData

&nbsp;

---
&nbsp;
#### __(JFormData)object.fromDOM(params)__ 

Функция для получения данных из HTML формы и их записи в новый JFormData объект

#### __Параметры:__
- __params__ ( _HTMLFormElement | string_ ) - элемент HTML формы либо его id

#### __Возврат:__
( ___Promise\<JFormData\>___ ) Возвращает промис с новым объектом JFormData

&nbsp;

---
&nbsp;
#### __(JFormData)object.get(name)__ 

Функция для получения значения по его имени(ключу)

#### __Параметры:__
- __name__ ( _string_ ) - Строковое наименование параметра

#### __Возврат:__
( ___any___ ) Возвращает значение по его ключу если оно есть

&nbsp;

---
&nbsp;
#### __(JFormData)object.set(name,value)__ 

Добавляет новую пару ключ-значение в JFormData

#### __Параметры:__
- __name__ ( _string_ ) - Строковое наименование параметра
- __value__ ( _any_ ) - Значение параметра

&nbsp;

---
&nbsp;
#### __(JFormData)object.isset(name)__ 

Функция для проверки существования параметра в JFormData по его имени

#### __Параметры:__
- __name__ ( _string_ ) - Строковое наименование параметра

#### __Возврат:__
( ___Boolean___ ) Возвращает логическое значение

&nbsp;

---
&nbsp;
#### __(JFormData)object.delete(name)__ 

Функция для удаления параметра из JFormData по его имени

#### __Параметры:__
- __name__ ( _string_ ) - Строковое наименование параметра

#### __Возврат:__
( ___Boolean___ ) Возвращает логическое значение(true - если параметр найден и удален, иначе false)

&nbsp;

---
&nbsp;
#### __(JFormData)object.entries()__ 

Функция для преобразования JFormData в итерируемый объект(массив) пар (ключ-значение)

#### __Возврат:__
( ___IterableIterator\<\[any,any\]\>___ ) Массив пар (ключ-значение)

&nbsp;

---
&nbsp;
#### __(JFormData)object.toObj()__ 

Функция для преобразования JFormData в объект

#### __Возврат:__
( ___Object___ ) Объект JS в котором ключи = свойства объекта

&nbsp;

---
&nbsp;
#### __(JFormData)object.toMultipart()__ 

Асинхронная функция для преобразования JFormData в формат multipart/form-data

#### __Возврат:__
( ___Promise\<JBuffer|undefined\>___ ) Возвращает промис с результатом JBuffer(в случае успешного выполнения)

&nbsp;


&nbsp;
## __Класс JBuffer__

Вспомогательный класс для преобразования данных в бинарный формат, так же как и Buffer NodeJS основан на UInt8Array, но в отличии от него работает и в браузере. В JBuffer можно свободно конвертировать ArrayBuffer, Buffer, UInt8Array и Blob

### __Функции__

#### __JBuffer.constructor(buffer)__ 

Конструктор для создания JBuffer из одного или нескольких байт массивов разного типа 

#### __Параметры:__
- __buffer__ ( _ArrayBuffer | Uint8Array | JBuffer | Buffer | string | Array\<ArrayBuffer|Uint8Array|JBuffer|Buffer\>_ ) - Map коллекция или объект

&nbsp;

---
&nbsp;
#### __JBuffer.fromBlob(blob)__ 

Асинхронная функция для получения JBuffer из Blob объекта

#### __Параметры:__
- __buffer__ ( _Blob_ ) - Blob объект

#### __Возврат:__
( ___Promise\<JBuffer|undefined\>___ ) Возвращает промис с результатом JBuffer(в случае успешного выполнения)

&nbsp;

---
&nbsp;
#### __JBuffer.concat(buffers)__ 

Статическая функция для объединения нескольких бинарных массивов в новый JBuffer

#### __Параметры:__
- __buffers__ ( _Array\<Buffer|JBuffer|Uint8Array|any\>_ ) - Массив бинарных массивов

#### __Возврат:__
( ___JBuffer | undefined___ ) Возвращает JBuffer(в случае успешного выполнения)

&nbsp;

---
&nbsp;
#### __JBuffer.concat(buffers)__ 

Статическая функция для объединения нескольких бинарных массивов в новый JBuffer

#### __Параметры:__
- __buffers__ ( _Array\<Buffer|JBuffer|Uint8Array|any\>_ ) - Массив бинарных массивов

#### __Возврат:__
( ___JBuffer | undefined___ ) Возвращает JBuffer(в случае успешного выполнения)

&nbsp;

---
&nbsp;
#### __JBuffer.toText(buffer)__ 

Статическая функция для декодирования буфера в строку

#### __Параметры:__
- __buffer__ ( _JBuffer | ArrayBuffer | Uint8Array | Buffer_ ) - Бинарный массив

#### __Возврат:__
( ___String | undefined___ ) Возвращает строку в случае успешного выполнения

&nbsp;

---
&nbsp;

#### __(JBuffer)object.concat(buffers)__ 

Функция для объединения текущего JBuffer объекта с бинарными массивами

#### __Параметры:__
- __buffers__ ( _Array<Buffer|ArrayBuffer|JBuffer|Uint8Array> | Buffer | JBuffer | Uint8Array | ArrayBuffer_ ) - Массив бинарных массивов или один бинарный массив

#### __Возврат:__
( ___JBuffer | undefined___ ) Возвращает JBuffer(в случае успешного выполнения)

&nbsp;

---
&nbsp;
#### __(JBuffer)object.split(len,all)__ 

Функция для разбиения JBuffer объекта на части

#### __Параметры:__
- __len__ ( _Number_ ) - Длина/смещение по которому разбивается буфер
- __all__ ( _Boolean_ ) ( _не обязательный_ ) - Параметр указывающий разбивать ли весь буфер до конца (по умолчанию - true)

#### __Возврат:__
( ___Array\<JBuffer\> | undefined___ ) Возвращает массив с JBuffer объектами в случае успешного выполнения

&nbsp;

---
&nbsp;
#### __(JBuffer)object.toText()__ 

Функция для декодирования текущего объекта JBuffer в строку

#### __Возврат:__
( ___String___ ) Возвращает декодированную строку

&nbsp;


&nbsp;
## __Класс Url__

Вспомогательный класс для преобразования данных из объектов и коллекций в URL адрес и обратно

### __Функции__

#### __Url.encode(params, addr, add)__ 

Функция для преобразования объекта параметров в URL

#### __Параметры:__
- __params__ ( _Map | FormData | JFormData | Object_ ) - Объект параметров
- __addr__ ( _String_ )( _не обязательный_ ) - Адресная строка без параметров
- __add__ ( _String_ )( _не обязательный_ ) - Добавочный параметр для обработки вложенных объектов

#### __Возврат:__
( ___String___ ) Возвращает URL строку

__Пример:__
```js
let object={
    user:'Alex',
    age:18,
    settings:{
        player:{
            volume:[10,15],
            mute:true
        }
    },
    location:[100,200,[500,550]]
}

console.log(Url.encode(object,'http://example.com/user')) // Преобразует в url адрес с параметрами
/* Вывод: http://example.com/user?user=Alex&age=18&settings[player][volume][]=10&settings[player][volume][]=15&settings[player][mute]=true&location[]=100&location[]=200&location[2][]=500&location[2][]=550 */

console.log(Url.encode(object)) // Преобразует в url параметры
/* user=Alex&age=18&settings[player][volume][]=10&settings[player][volume][]=15&settings[player][mute]=true&location[]=100&location[]=200&location[2][]=500&location[2][]=550 */
```

&nbsp;

---
&nbsp;
#### __Url.decode(url)__ 

Функция для преобразования параметров из URL в объект

#### __Параметры:__
- __url__ ( _String_ ) - Строка URL параметров

#### __Возврат:__
( ___Object___ ) Возвращает объект с параметрами

__Пример:__
```js
let url = 'http://example.com/user?user=Alex&age=18&settings[player][volume][]=10&settings[player][volume][]=15&settings[player][mute]=true&location[]=100&location[]=200&location[2][]=500&location[2][]=550'

let urlParam = 'user=Alex&age=18&settings[player][volume][]=10&settings[player][volume][]=15&settings[player][mute]=true&location[]=100&location[]=200&location[2][]=500&location[2][]=550'

console.log(Url.decode(url)) 
console.log(Url.decode(urlParam)) 

/* В вариантах с адресом и без, адрес будет отсекаться, в результате будет получен следующий объект:
{
    user:'Alex',
    age:18,
    settings:{
        player:{
            volume:[10,15],
            mute:true
        }
    },
    location:[100,200,[500,550]]
}
*/
```

&nbsp;

---
&nbsp;


