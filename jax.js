class jax{

	static #Req = null;
    static #params = null;
    static #method = null;
    static #headers=new Map();
    static #body=null;
    static #url=null;
    static #responseTypes =['text','arraybuffer','json','blob','document'];

	static #create(){
		let Request = false;
		if (window.XMLHttpRequest)
		{
			Request = new XMLHttpRequest();
		}
		else if (window.ActiveXObject)
		{
			try
			{
				Request = new ActiveXObject("Microsoft.XMLHTTP");
			}    
			catch (CatchException)
			{
				Request = new ActiveXObject("Msxml2.XMLHTTP");
			}
		}
		if (!Request)
		{
			console.log("Невозможно создать XMLHttpRequest");
		}
        this.#Req=Request;
	}

    static #jsonMapReplacer(key, value){
        if (value instanceof Map) {
            return {
                dataType: 'Map',
                value: Array.from(value.entries()), 
            };
        } else {
            return value;
        }
    }

    static #jsonMapReviewer(key, value) {
        if(typeof value === 'object' && value !== null) {
            if (value.dataType === 'Map') {
                return new Map(value.value);
            }
        }
        return value;
    }

    static #checkInputTypeFile(el){
        let inputs = el.getElementsByTagName('input');
        for(let item of inputs){
            if(item.type=='file') return true;
        }
        return false;
    }

    static #convertObjToUrlOrData(data,formData=false){
        let result = formData?new FormData():[];
        try{
            if(data instanceof Map) data = Object.fromEntries(data);
            if(data instanceof Object){
                for(let key in data){
                    let item = data[key];
                    if(item instanceof Object||item instanceof Map){
                        item=item instanceof Object?Object.entries(item):item;
                        for(let [el,value] of item){
                            if(formData) result.append(key+`[${el}]`,value.toString());
                            else result.push(key+`[${el}]=`+encodeURIComponent(value.toString()));
                        }
                    }else if(Array.isArray(item)){
                        for(let el of item){
                            if(formData) result.append(key+`[]`,el.toString());
                            else result.push(key+'[]='+encodeURIComponent(el.toString()));
                        }
                    }else{
                        if(formData) result.append(key,item.toString());
                        else result.push(key+'='+encodeURIComponent(item.toString()));
                    }
                }
            }else{
                return false;
            }
            if(!formData) result = result.join('&');
            return result;
        }catch(err){
            console.error(err);
            return false;
        }
    }

    static #convertDataToUrlOrObject(data,toObj=false){
        try{
            if(data instanceof FormData){
                let url;
                if(toObj){
                    url={}
                    let index=0;
                    for(let [key,value] of data.entries()){
                        if(/[\[\]]/gm.test(key)){
                            let prop = key.match(/[\[]([\w]+)[\]]/);
                            if(prop!=null&&prop.length>1){ 
                                let name = key.replace(/[\[]([\w]+)[\]]/g,'');
                                if(url[name]==undefined) url[name]={};
                                url[name][prop[1]]=value;
                            }else {
                                let name = key.replace(/[\[\]]/g,'');
                                if(url[name]==undefined) url[name]={};
                                url[name][index.toString()]=value;
                            }
                            index++;
                        }else{
                            url[key]=value;
                        }
                    }
                    return url;
                }else{
                    url=[];
                    for(let [key,value] of data.entries()){
                        url.push(encodeURIComponent(key)+'='+encodeURIComponent(value));
                    }
                    url=url.join('&');
                }
                return url;
            }else{
                return false;
            }
        }catch(err){
            console.error(err);
            return false;
        }
    }

    static #convertParams(){
        try {
            if (typeof this.#params?.credentials === 'boolean') this.#Req.withCredentials = this.#params.credentials;
            
            if (this.#params?.headers != undefined && this.#params?.headers != undefined) {
                for (let [key,value] of this.#params.headers) {
                    if (key.toLowerCase() != 'content-type') {
                        this.#headers.set(key, value);
                    }
                }
            }
            if (this.#method == 'GET' || this.#method == 'DELETE') {  
                this.#headers.set('Content-type','application/x-www-form-urlencoded');
                if(this.#params?.data != undefined && this.#params?.data != null){
                    if (this.#params.data instanceof FormData) {
                        this.#url+='?'+this.#convertDataToUrlOrObject(this.#params.data);
                    } else if (this.#params.data instanceof Map) {
                        this.#url+=+'?'+this.#convertObjToUrlOrData(this.#params.data).bind(this);
                    } else if (this.#params.data instanceof Object) {
                        this.#url+=+'?'+this.#convertObjToUrlOrData(this.#params.data);
                    } else if (this.#params.data instanceof HTMLElement||typeof this.#params.data === 'string') {
                        let container = this.#params.data instanceof HTMLElement?this.#params.data:document.getElementById(this.#params.data);
                        if(!this.#checkInputTypeFile(container)){
                            let data = new FormData(container);
                            this.#url+=+'?'+this.#convertDataToUrlOrObject(data);
                        }else{
                            console.error('File cannot be sent by the GET method');
                        }
                    } 
                }
            } else {
                let sendType;
                if (typeof this.#params?.sendType === 'string') {
                    switch (this.#params.sendType) {
                        case 'json': sendType='json'; this.#headers.set('Content-type','application/json; charset=utf-8'); break;
                        case 'form': sendType='form'; this.#headers.set('Content-type','multipart/form-data') ; break;
                        default: sendType='url'; this.#headers.set('Content-type','application/x-www-form-urlencoded') ;
                    }
                }
                if (this.#params?.data != undefined && this.#params?.data != null) {
                    if (this.#params.data instanceof FormData) {
                        switch (sendType) {
                            case 'json': this.#body=JSON.stringify(this.#convertDataToUrlOrObject(this.#params.data,true)); break;
                            case 'form': this.#body=this.#params.data; break;
                            case 'url': this.#body=this.#convertDataToUrlOrObject(this.#params.data); break;
                        }
                    } else if (this.#params.data instanceof Map) {
                        switch (sendType) {
                            case 'json': this.#body=JSON.stringify(this.#params.data,this.#jsonMapReplacer); break;
                            case 'form': this.#body=this.#convertObjToUrlOrData(this.#params.data,true); break;
                            case 'url': this.#body=this.#convertObjToUrlOrData(this.#params.data); break;
                        }
                    } else if (this.#params.data instanceof Object) {
                        console.log(this.#params.data);
                        switch (sendType) {
                            case 'json': this.#body=JSON.stringify(this.#params.data,this.#jsonMapReplacer); break;
                            case 'form': this.#body=this.#convertObjToUrlOrData(this.#params.data,true); break;
                            case 'url': this.#body=this.#convertObjToUrlOrData(this.#params.data); break;
                        }  
                    } else if (this.#params.data instanceof HTMLElement||typeof this.#params.data === 'string') {
                        let container = this.#params.data instanceof HTMLElement?this.#params.data:document.getElementById(this.#params.data);
                        let data = new FormData(container);
                        switch (sendType) {
                            case 'json': this.#body=JSON.stringify(this.#convertDataToUrlOrObject(data,true)); break;
                            case 'form': this.#body = data; break;
                            case 'url': this.#body=this.#convertDataToUrlOrObject(data); break;
                        } 
                    } 
                }
            }
           
            if(typeof this.#params?.responseType ==='string'){
                for(let item of this.#responseTypes){
                    if(this.#params.responseType==item){
                        this.#Req.responseType=item;
                        break;
                    }
                }
            }
            if(this.#Req.responseType=='') this.#Req.responseType='json';
            if(typeof this.#params?.progress === 'function') this.#Req.upload.onprogress=this.#params.progress;
            
            return true;
        } catch(err) {
            console.error(err);
            return false;
        }
    }

    static async #send(){
        return new Promise((resolve,reject)=>{
            this.#Req.addEventListener('load',function(Request){
                this.#params = null;
                this.#method = null;
                this.#headers.clear();
                this.#body=null;
                this.#url=null;
                resolve(Request.target.response);
            }.bind(this));
            this.#Req.addEventListener('error',function(err){
                reject("Error: send failed");
            }.bind(this));
            this.#Req.open(this.#method,this.#url,true);
            for(let [key,value] of this.#headers){
                console.log(key+":"+value);
                this.#Req.setRequestHeader(key,value);
            }
            try{
                if(this.#method=='POST'||this.#method=='PUT') this.#Req.send(this.#body);
                else this.#Req.send(null);
            }catch(err){
                reject(err);
            }
        });
    }




    /**
     * 
     * @param {string} url 
     * @param {object} params 
     * @param {Map<string,string>|undefined} params.headers 
     * Коллекция для дополнительных заголовков. Content-Type устанавливать не нужно.
     * @param {object|FormData|Map|undefined} params.data
     * Объект, FormData, либо коллекция с данными для отправки на сервер. C responseType='json' поддерживает отправку объектов с глубокой вложенностью и Map-коллекциями
     * @param {string|undefined} params.responseType 
     * Тип ответа от сервера:
     * 
     * json - (По умолчанию) JSON-объект
     * 
     * text - Обычный текст
     * 
     * arraybuffer - Данные в ArrayBuffer
     * 
     * blob - Данные в Blob
     * 
     * document - Данные как XML/HTTP документ
     * 
     * @param {string|undefined} params.sendType
     * Тип отправки данных, устанавливает ContentType заголовок, поэтому его не нужно передавать в headers, типы отправки:
     * 
     * url - (По умолчанию) Отправляет данные как URL-строку
     * 
     * json - Отправляет данные в JSON формате с заголовком application/json
     * 
     * form - Отправляет данные с помощью FormData и заголовком multipart/form-data
     * 
     * @param {boolean|undefined} params.credentials 
     * Устанавливает WithCredentials для кросс-доменных запросов
     * @returns {Promise<object|string>} Возвращает Promise c результатом в случае успешного выполнения 
     * @desc Метод для отправки POST-запроса
     */

    static async post(url,params){
        this.#params=params;
        this.#url=url;
        this.#method='POST';
        this.#create();
        if(this.#convertParams()){
            return this.#send();
        }
    }
    /**
     * 
     * @param {string} url 
     * @param {object} params 
     * @param {Map<string,string>|undefined} params.headers 
     * Коллекция для дополнительных заголовков. Content-Type устанавливать не нужно.
     * @param {object|FormData|Map|undefined} params.data
     * Объект, FormData, либо коллекция с данными для отправки на сервер. C responseType='json' поддерживает отправку объектов с глубокой вложенностью и Map-коллекциями
     * @param {string|undefined} params.responseType 
     * Тип ответа от сервера:
     * 
     * json - (По умолчанию) JSON-объект
     * 
     * text - Обычный текст
     * 
     * arraybuffer - Данные в ArrayBuffer
     * 
     * blob - Данные в Blob
     * 
     * document - Данные как XML/HTTP документ
     * 
     * @param {boolean|undefined} params.credentials 
     * Устанавливает WithCredentials для кросс-доменных запросов
     * @returns {Promise<object|string>} Возвращает Promise c результатом в случае успешного выполнения 
     * @desc Метод для отправки GET-запроса
     */
    static async get(url,params){
        this.#params=params;
        this.#url=url;
        this.#method='GET';
        this.#create(); 
        if(this.#convertParams()){
            return this.#send();
        }
    }
   /**
     * 
     * @param {string} url 
     * @param {object} params 
     * @param {Map<string,string>|undefined} params.headers 
     * Коллекция для дополнительных заголовков. Content-Type устанавливать не нужно.
     * @param {object|FormData|Map|undefined} params.data
     * Объект, FormData, либо коллекция с данными для отправки на сервер. C responseType='json' поддерживает отправку объектов с глубокой вложенностью и Map-коллекциями
     * @param {string|undefined} params.responseType 
     * Тип ответа от сервера:
     * 
     * json - (По умолчанию) JSON-объект
     * 
     * text - Обычный текст
     * 
     * arraybuffer - Данные в ArrayBuffer
     * 
     * blob - Данные в Blob
     * 
     * document - Данные как XML/HTTP документ
     * 
     * @param {string|undefined} params.sendType
     * Тип отправки данных, устанавливает ContentType заголовок, поэтому его не нужно передавать в headers, типы отправки:
     * 
     * url - (По умолчанию) Отправляет данные как URL-строку
     * 
     * json - Отправляет данные в JSON формате с заголовком application/json
     * 
     * form - Отправляет данные с помощью FormData и заголовком multipart/form-data
     * 
     * @param {boolean|undefined} params.credentials 
     * Устанавливает WithCredentials для кросс-доменных запросов
     * @returns {Promise<object|string>} Возвращает Promise c результатом в случае успешного выполнения 
     * @desc Метод для отправки PUT-запроса
     */
    static async put(url,params){
        this.#params=params;
        this.#url=url;
        this.#method='PUT';
        this.#create();
        if(this.#convertParams()){
            return this.#send();
        }
    }
    /**
     * 
     * @param {string} url 
     * @param {object} params 
     * @param {Map<string,string>|undefined} params.headers 
     * Коллекция для дополнительных заголовков. Content-Type устанавливать не нужно.
     * @param {object|FormData|Map|undefined} params.data
     * Объект, FormData, либо коллекция с данными для отправки на сервер. C responseType='json' поддерживает отправку объектов с глубокой вложенностью и Map-коллекциями
     * @param {string|undefined} params.responseType 
     * Тип ответа от сервера:
     * 
     * json - (По умолчанию) JSON-объект
     * 
     * text - Обычный текст
     * 
     * arraybuffer - Данные в ArrayBuffer
     * 
     * blob - Данные в Blob
     * 
     * document - Данные как XML/HTTP документ
     * 
     * @param {boolean|undefined} params.credentials 
     * Устанавливает WithCredentials для кросс-доменных запросов
     * @returns {Promise<object|string>} Возвращает Promise c результатом в случае успешного выполнения 
     * @desc Метод для отправки DELETE-запроса
     */
    static async delete(url,params){
        this.#params=params;
        this.#url=url;
        this.#method='DELETE';
        this.#create();
        if(this.#convertParams()){
            return this.#send();
        }
    } 
}




