import Jax from './jax.mjs'

export class JFormData{
    
    #data = new Map()
    
    /**
     * Статическая асинхронная функция для получения данных из HTML-формы и преобразования их в новый объект JFormData
     * @param {HTMLFormElement|string} params 
     * HTML форма или её id
     * @returns {Promise<JFormData>}
     * Объект JFormData с данными из HTML-формы
     */
    static async fromDOM(params){
        let formData = new JFormData()
        let form
        if(typeof HTMLFormElement === 'function' && params instanceof HTMLFormElement)
            form = params
        if(typeof params === 'string' && document)
            form = document.getElementById(params)
        if(form){
            let input = form.getElementsByTagName('input')
            let select = form.getElementsByTagName('select')
            let textarea = form.getElementsByTagName('textarea')
            for(let item of input){
                if(item.hasAttribute('name')){
                    if(item.type.toLowerCase() === "radio"){
                        if(!item.checked) continue
                        if(item.hasAttribute('value')) formData.#data.set(item.name, item.value)
                        else formData.#data.set(item.name, item.checked)
                    }else if(item.type.toLowerCase() === "checkbox"){
                        if(!item.checked) continue
                        let values = formData.#data.has(item.name) ? formData.#data.get(item.name) : []
                        if(item.hasAttribute('value')) values.push(item.value)
                        else values.push(item.checked)
                        formData.#data.set(item.name, values)
                    }else if(item.type.toLowerCase() === 'file'){
                        if(item.files!=null && item.files.length){
                            let files = await JFileList.load(item.files)
                            if(files)
                                formData.#data.set(item.name, files)
                        }  
                    }else{
                        formData.#data.set(item.name, item.value)
                    }
                }
            }
            for(let item of textarea){
                if(item.value!="" && item.value!=null && item.hasAttribute('name'))
                    formData.#data.set(item.name, item.value)
            }
            for(let item of select){
                if(item.value!="" && item.value!=null && item.hasAttribute('name') && item.options.length)
                    formData.#data.set(item.name, item.options[item.selectedIndex].value)
            }
        }
        return formData
    }

    /**
     * Статическая асинхронная функция для преобразования объектов и Map коллекций в новый объект JFormData
     * @param {JFormData|Map|object} params 
     * Объект или Map-коллекция с данными
     * @returns {Promise<JFormData>}
     * Объект JFormData с данными из объекта или коллекции
     */
    static async from(params){
        if(params instanceof JFormData) return params
        let form = new JFormData()
        let data
        if(params instanceof Map || (typeof FormData === 'function' && params instanceof FormData))
            data = params.entries()
        else if(params instanceof Object && !Array.isArray(params))
            data = Object.entries(params)
        if(data){
            for(let [key,value] of data){
                if(typeof FileList === 'function' && value instanceof FileList){
                    let files = await JFileList.load(value)
                    if(files)
                        form.#data.set(key,files)
                }else if(typeof File === 'function' && value instanceof File){
                    let file = await JFile.load(value)
                    if(file)
                        form.#data.set(key,file)
                }else{
                    form.#data.set(key,value)
                }
            }
        }
        return form
    }

    static #hash(length, type = 'all') {
        let chars, result = ''
        switch (type) {
            case 'chars': chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
                break;
            case 'caps-chars': chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
                break;
            case 'numbers': chars = '0123456789'
                break;
            case 'chars-numbers': chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
                break;
            case 'code': chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
                break;
            case 'all': chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@_'
                break;
            default: chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@_'
                break;
        }
        for (let i = 0; i < length; i++) {
            result += chars[Math.round(Math.random() * length)]
        }
        return result
    }

    /**
     * Асинхронная функция преобразования данных из объекта JFromData в multipart/form-data буфер
     * @returns {Promise<JBuffer|undefined>}
     */
    async toMultipart(){
        let boundary = `------JaxBoundary${JFormData.#hash(20, 'chars-numbers')}`
        let result=new JBuffer('') 
        try{
            let multipartData=''
            for(let key of this.#data.keys()){
                multipartData = ''
                let isFiles=false
                let data = this.#data.get(key)
                if(typeof File === 'function' && data instanceof File){
                    data = await JFile.load(data)
                    this.#data.set(key,data)
                }
                if(typeof FileList === 'function' && data instanceof FileList){
                    data = await JFileList.load(data)
                    if(JFileList)
                        this.#data.set(key,data)
                }
                if(data instanceof JFile || data instanceof JFileList){
                    isFiles = true
                    data = data instanceof JFile ? [data] : data
                }
                if(isFiles){
                    for(let file of data){
                        multipartData += `${boundary}\r\n`;
                        multipartData += `Content-Disposition: form-data; name="${key}"; filename="${file.fullName}"\r\n`
                        multipartData += `Content-Type:${file.contentType}\r\n\r\n`;
                        result = result.concat([
                            new JBuffer(multipartData),
                            file.data,
                            new JBuffer(`\r\n`)
                        ]);
                    }
                }else{
                    multipartData += `${boundary}\r\n`;
                    multipartData += `Content-Disposition: form-data; name="${key}"\r\n\r\n${data.toString()}\r\n`
                    result = result.concat(new JBuffer(multipartData))
                }
            }
            result = result.concat(new JBuffer(`${boundary}--\r\n`))
            return result
        }catch(err){
            console.error(err)
        }
    }

    /**
     * Функция для преобразования JFormData в объект
     * @returns {object}
     */
    toObj(){
        return Object.fromEntries(this.#data)
    }

    /**
     * Функция для получения значения из JFormData по имени
     * @param {string} name 
     * @returns {any}
     */
    get(name){
        return this.#data.get(name)
    }

    /**
     * Добавление нового значения в JFormData
     * @param {string} name 
     * @param {any} value 
     */
    set(name,value){
        this.#data.set(name,value)
    }

    /**
     * Удаление значения по имени из JFormData
     * @param {*} name 
     * @returns 
     */
    delete(name){
        if(this.#data.has(name)){
            this.#data.delete(name)
            return true
        }
        return false
    }

    /**
     * Преобразование коллекции JFormData в массив с парами "ключ-значение"
     * @returns {IterableIterator<[any,any]>}
     */
    entries(){
        return this.#data.entries()
    }

    /**
     * Функция для проверки существования значения в JFormData по имени
     * @param {string} name 
     * @returns {boolean}
     */
    isset(name){
        return this.#data.has(name)
    }  
}

export class Url{

    /**
     * Функция для преобразования объекта параметров в URL
     * @param {Map|FormData|JFormData|Object} params 
     * Объект с параметрами
     * @param {string} addr 
     * Адресная строка без параметров
     * @param {string} add 
     * Добавочный параметр для обработки вложенных объектов
     * @returns {string} Готовая строка URL
     */
    static encode(params, addr='', add=''){
        let result = []
        let data
        try{
            if(params instanceof Map || (typeof FormData === 'function' && params instanceof FormData) || params instanceof JFormData) data = params.entries()
            else if(params instanceof Object) data = Object.entries(params)
            if(Array.isArray(params) && add == '')
                throw new Error(`Top-level parameters cannot be converted to a URL. They shouldn't be array.`)
            if(data){
                for(let [key,item] of data){
                    let keyData = Array.isArray(params) ? (Array.isArray(item) ? `[${key}]`:'[]') : (add != '' ? `[${key}]` : key)
                    if(item instanceof JFile 
                        || item instanceof JFileList 
                        || (typeof File === 'function' && item instanceof File)
                        || (typeof FileList === 'function' && item instanceof FileList)
                        || item === undefined ) continue
                    if(item instanceof Object){
                        let itemData = item instanceof Map ? item : Object.entries(item)
                        for(let [el,value] of itemData){
                            let elData = Array.isArray(item) ? (Array.isArray(value) ? el : '') : el
                            if(value===null) 
                                result.push(`${add}${keyData}[${elData}]=null`)
                            else if(value instanceof Object){
                                result.push(Url.encode(value, '', `${add}${keyData}[${elData}]`))
                            }
                            else 
                                result.push(`${add}${keyData}[${elData}]=${encodeURIComponent(value.toString())}`) 
                        }
                    }else{
                        if(item==null) result.push(`${add}${keyData}=null`)  
                        else result.push(`${add}${keyData}=${encodeURIComponent(item.toString())}`)    
                    }
                }
            }
            return result.length ? (addr === '' ? result.join('&') : `${addr}?${result.join('&')}`) : (addr === '' ? '' : addr )
        }catch(err){
            throw err
        }
    }


    /**
     * Функция для преобразования параметров из URL в объект
     * @param {string} url
     * Строка URL параметров
     * @returns {Object}
     * Возвращает объект с параметрами
     */
    static decode(url){
		let result={}
        let arr = url.split('?')
        if(arr.length>1){
            arr.shift()
            url=arr.shift()
        }
		let data = url.split("&")
		let getValue = (value) => {
			if (!isNaN(Number(value)))
				return Number(value)
			else if (value.toLowerCase() === 'true')
				return true
			else if (value.toLowerCase() === 'false')
				return false
			else if (value.toLowerCase() === 'null')
				return null
			else
				return value
		}
		for (let prop of data) {
			let arrProp = prop.split('=')
			if(arrProp.length == 2){
				let name = arrProp.shift()
				let value = decodeURIComponent(arrProp.pop())
				if (/\[[\w\-]*\]/.test(name)) {
					let parts = name.replace(/\[([A-Za-z_]+[\w\-]+)\]/g,'.$1').split('.')
					let current=result
					for(let i=0;i<parts.length;i++){
						let p = parts[i]
						if(/\[[0-9]*\]/.test(p)){
							let match = p.match(/\[[0-9]*\]/g)
							p = p.replace(/\[[0-9]*\]/g,'')
							if(current?.[p]===undefined)
								current[p]=[]
							for(let index = 0; index<match.length; index++){
								if(index+1!=match.length){
									let innerIndex
									if(/\[[0-9]+\]/.test(match[index]))
										innerIndex = Number(match[index].replace(/[\[\]]/g,''))
									if(innerIndex && !isNaN(innerIndex)){
										if(!(innerIndex in current[p]))
											current[p][innerIndex] = []
										current = current[p]
										p = innerIndex
									}
								}
							}
						}else{
							if(current?.[p]===undefined)
								current[p]={}
						}
						if(i+1==parts.length){
							if(Array.isArray(current[p])){
								current[p].push(getValue(value))
							}else{
								current[p] = getValue(value)
							}
						}else{
							current = current[p]
						}
					}
				} else {
					result[name] = getValue(value)
				}
			}
		}
		return result
	}

}

export class JFile{

    #contentType
    #ext
    #name
    #fullName
    #size
    #data
    #path=''

    get contentType(){
        return this.#contentType
    }
    get ext(){
        return this.#ext
    }
    get name(){
        return this.#name
    }
    get fullName(){
        return this.#fullName
    }
    get size(){
        return this.#size
    }
    get data(){
        return this.#data
    }
    get path(){
        return this.#path
    }

    /**
     * Статическая асинхронная функция для загрузки файла и создания нового объекта JFile
     * @param {File|string} file 
     * Объект File либо путь к файлу
     * @returns {Promise<JFile|undefined>}
     */
    static load(file){
        return new Promise(async resolve=>{
            try{
                let outputFile = new JFile()
                if(typeof File === 'function' && file instanceof File){
                    outputFile.#fullName = file.name
                    let nameParts = file.name.split('.')
                    outputFile.#ext = `.${(nameParts.pop())?.toLowerCase()}`
                    outputFile.#name = nameParts.join('.')
                    outputFile.#size = file.size
                    outputFile.#contentType = file.type
                    let reader = new FileReader()
                    reader.readAsArrayBuffer(file)
                    reader.onload = () => {
                        if(reader.result !=null ){
                            outputFile.#data = new JBuffer(reader.result)
                            resolve(outputFile)
                        }
                    }
                    reader.onerror = () =>{
                        resolve(undefined)
                    }
                }else if(typeof file === 'string'){
                    let fs = await import('fs')
                    let path = await import('path')
                    if (fs.existsSync(file)) {
                        let stat = fs.statSync(file,{throwIfNoEntry:false})
                        let fullName = path.basename(file)
                        let nameParts = fullName.split('.')
                        let ext = `.${(nameParts.pop())?.toLowerCase()}`
                        if (stat && ext && stat.isFile() && Array.from(Jax.MIME_FILES.values()).includes(ext)) {
                            let contentType = Array.from(Jax.MIME_FILES.keys())
                                .find(key => Jax.MIME_FILES.get(key) == ext)
                            if (contentType) {
                                outputFile.#path = file
                                outputFile.#fullName = fullName
                                outputFile.#name = nameParts.join('.')
                                outputFile.#ext = ext
                                outputFile.#size = stat.size
                                outputFile.#data = new JBuffer(fs.readFileSync(outputFile.path))
                                outputFile.#contentType = contentType
                                resolve(outputFile)
                            }
                        }
                    }
                    resolve(undefined)
                }else{
                    resolve(undefined)
                }  
            }catch(err){
                console.error(err)
                resolve(undefined)
            }
        })
    }
}

export class JFileList{
    #length = 0
    
    get length(){
        return this.#length
    }

    /**
     * 
     * @param {Array<JFile>} files 
     */
    constructor(files){
        if(Array.isArray(files)){
            let count = 0
            for(let file of files){
                if(file instanceof JFile){
                    Object.defineProperty(this, count, {
                        value: file,
                        writable: false
                    })
                    this.#length++
                    count++
                }
            }
        }
    }

    /**
     * Функция для загрузки файлов в коллекцию из входных данных
     * @param {FileList|File|JFile|Array<string>|Array<File>|Array<JFile>} files 
     * Массив, коллекция, FileList либо массив строковых путей к файлам
     * @returns {Promise<JFileList|undefined>}
     */
    static load(files){
        return new Promise(async resolve=>{
            try{
                let list = new JFileList()
                if(typeof FileList === 'function' && files instanceof FileList){
                    list.#length = files.length
                    for(let i=0; i<files.length; i++){
                        let newFile = await JFile.load(files[i])
                        if(newFile)
                            Object.defineProperty(list, i, {
                                value: newFile,
                                writable: false
                            })
                    }
                }else if(typeof File === 'function' && files instanceof File){
                    list.#length = 1
                    let newFile = await JFile.load(files)
                    if(newFile)
                        Object.defineProperty(list, 0, {
                            value: newFile,
                            writable: false
                        }) 
                }else if(typeof files === 'string'){
                    let newFile = await JFile.load(files)
                    if(newFile){  
                        list.#length=1
                        Object.defineProperty(list, 0, {
                            value: newFile,
                            writable: false
                        })
                    }
                }else if(files instanceof JFile){
                    list.#length = 1
                    Object.defineProperty(list, 0, {
                        value: files,
                        writable: false
                    })
                }else if(Array.isArray(files)){
                    list.#length = 0
                    let count = 0
                    for(let file of files){
                        if(typeof file === 'string' || (typeof File === 'function' && file instanceof File)){
                            let newFile = await JFile.load(file)
                            if(newFile){  
                                Object.defineProperty(list, count, {
                                    value: newFile,
                                    writable: false
                                })
                                list.#length++
                                count++
                            }
                        }else if(file instanceof JFile){
                            Object.defineProperty(list, count, {
                                value: file,
                                writable: false
                            })
                            list.#length++
                            count++
                        }
                    }
                }
                resolve(list)
            }catch(err){
                console.log(err)
                resolve(undefined)
            }
        })
    }

    /**
     * Функция для добавления объекта JFile в конец коллекции
     * @param {JFile} file
     * Объект JFile 
     * @returns {boolean}
     * Результат выполнения функции
     */
    push(file){
        if(file instanceof JFile){
            this.#length++
            Object.defineProperty(this, (this.#length-1) , {
                value: file,
                writable: false
            });
            return true
        }
        return false
    }

    /**
     * Функция извлечения последнего объекта JFile в коллекции
     * @returns {JFile|undefined}
     */
    pop(){
        if(this.#length>0){
            let file = this[this.#length-1]
            delete this[this.#length-1]
            this.#length--
            return file 
        }
    }

    /**
     * Функция извлечения первого объекта JFile в коллекции
     * @returns {JFile|undefined}
     */
    shift(){
        if(this.#length>0){
            let file = this[0]
            delete this[0]
            this.#length--
            for(let i=0;i<this.#length;i++){
                Object.defineProperty(this, i , {
                    value: this[i+1],
                    writable: false
                });
            }
            return file
        }
    }

    /**
     * Функция для добавления объекта JFile в начало коллекции
     * @param {JFile} file
     * Объект JFile 
     * @returns {boolean}
     * Результат выполнения функции
     */
    unshift(file){
        if(file instanceof JFile){
            for(let i=this.length;i>0;i++){
                Object.defineProperty(this, i , {
                    value: this[i-1],
                    writable: false
                });
            }
            Object.defineProperty(this, 0 , {
                value: file,
                writable: false
            });
            this.#length++
            return true
        }
        return false
    }

    /**
     * Функция для объединения нескольких коллекций с текущей коллекцией
     * @param {JFileList|Array<JFileList>} list
     * Коллекция, или массив с коллекциями объектов JFile 
     * @returns {JFileList}
     */
    concat(list){
        let listOutput = new JFileList()
        let collections
        if(Array.isArray(list) && list.length){
            list.unshift(this)
            collections = list
        }else 
            collections = [this, list]
        if(Array.isArray(list) && list.length){
            for(let collection of list){
                for(let file of collection){
                    if(file instanceof JFile)
                        listOutput.push(file)
                }
            }
        }
        return listOutput
    }

    /**
     * Преобразование текущей коллекции в массив
     * @returns {Array<JFile>}
     */
    toArray(){
        let files = []
        for(let file of this){
            files.push(file)
        }
        return files
    }

    toString(){
        if(this.#length){
            let res = `JFileList[${this.#length}]{\n`
            for(let item of this){
                res+=`   filename: ${item.fullName}, size: ${item.size}B\n`
            }
            res+='}'
            return res
        }else{
            return `JFileList[0]{}`
        }
    }

    [Symbol.iterator](){
        let index = -1
        let data = this
        return {
            next:() => ({
                value:data[++index],
                done:!(index in data)
            })
        }
    }
}


export class JBuffer extends Uint8Array{

    /**
     * @param {ArrayBuffer|Uint8Array|JBuffer|Buffer|string|Array<ArrayBuffer|Uint8Array|JBuffer|Buffer>} buffer
     * Массив байтов, множество массивов либо строка 
     */
    constructor(buffer){
        if(buffer instanceof ArrayBuffer || buffer instanceof Uint8Array){
            super(buffer)
        }else if(typeof buffer === 'string'){
            let encoder = new TextEncoder()
            buffer = encoder.encode(typeof buffer === 'string' ? buffer : '').buffer
            super(buffer)
        }else if(Array.isArray(buffer) && buffer.length){
            if(buffer[0] instanceof ArrayBuffer || buffer[0] instanceof Uint8Array){
                buffer = buffer.filter(buf=>buf instanceof ArrayBuffer || buf instanceof Uint8Array)
                if(buffer.length){
                    buffer = buffer.reduce((acc,cur)=>acc = acc.concat(Array.from(new Uint8Array(cur))),[])
                    super(buffer)
                }else{
                    super()
                }
            }else if(typeof buffer[0] === 'number'){
                super(buffer)
            }else{
                super()
            }
        }
    }

    /**
     * Функция для получения JBuffer из Blob
     * @param {Blob} blob 
     * @returns {Promise<JBuffer|undefined>}
     * Возвращает новый Jbuffer либо undefined
     */
    static async fromBlob(blob){
        if(blob instanceof Blob){
            return new JBuffer(new Uint8Array(await blob.arrayBuffer()))
        }
    }

    /**
     * Статическая функция для объединения различных байт-массивов
     * @param {Array<Buffer|JBuffer|Uint8Array|any>} buffers 
     * Массив буферов
     * @returns {JBuffer|undefined}
     * Возвращает новый JBuffer объект
     */
    static concat(buffers){
        if(Array.isArray(buffers)){
            buffers = buffers.filter(buf => buf instanceof ArrayBuffer || buf instanceof Uint8Array)
            if(buffers.length){
                let bytes = buffers.reduce((acc,cur)=>acc = acc.concat(Array.from(new Uint8Array(cur))),[])
                return new JBuffer(bytes)
            }
        }
    }

    /**
     * Статическая функция для объединения различных байт-массивов
     * @param {Array<Buffer|ArrayBuffer|JBuffer|Uint8Array>|Buffer|JBuffer|Uint8Array|ArrayBuffer} buffers 
     * Буфер или массив буферов
     * @returns {JBuffer|undefined}
     * Возвращает новый JBuffer объект
     */
    concat(buffers){
        if(Array.isArray(buffers) && buffers.length)
            buffers.unshift(this)
        else
            buffers = [this, buffers]
        buffers = buffers.filter(buf => buf instanceof ArrayBuffer || buf instanceof Uint8Array)
        if(buffers.length){
            let bytes = buffers.reduce((acc,cur)=>acc = acc.concat(Array.from(new Uint8Array(cur))),[])
            return new JBuffer(bytes)
        }
    }

    /**
     * Функция для разбиения буфера на несколько частей определенной длины
     * @param {Number} len 
     * Длина/смещение по которому разбивается буфер
     * @param {Boolean} all 
     * Параметр указывающий разбивать ли весь буфер до конца (по умолчанию - true)
     * @returns {Array<JBuffer>|undefined}
     */
    split(len,all=true){
        if(len<this.length){
            let buffer = Array.from(this)
            let result = []
            while(buffer.length){
                let arr = buffer.splice(0,len)
                result.push(new JBuffer(arr))
                if(!all){
                    arr = buffer.splice(0,buffer.length)
                    result.push(new JBuffer(arr))
                    break
                }
            }
            return result
        }
    }
    
    /**
     * Статическая функция для декодирования буфера в строку
     * @param {JBuffer|ArrayBuffer|Uint8Array|Buffer} buffer 
     * Буфер
     * @returns {string|undefined}
     * Декодированная строка в utf-8
     */
    static toText(buffer){
        if(buffer instanceof ArrayBuffer)
            buffer = new JBuffer(buffer)
        if(buffer instanceof Uint8Array){
            let decoder = new TextDecoder()
            return decoder.decode(buffer)
        }
    }

    /**
     * Функция для декодирования объекта JBuffer в строку
     * @returns {string} 
     * Декодированная строка в utf-8
     */
    toText(){
        let decoder = new TextDecoder()
        return decoder.decode(this)
    }
}