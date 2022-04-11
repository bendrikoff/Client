import {makeAutoObservable} from "mobx";

export default class HelpStore{
    constructor() {
        this.store=[
            {id:0,name:'Добро пожаловать',title:"здравствуйте",text:'Всем хай'},
            {id:1,name:'Добро пожаловать2',title:"здравствуйте",text:'Всем хай2'},
            {id:2,name:'Добро пожаловать3',title:"здравствуйте",text:'Всем хай3'},
        ]
        makeAutoObservable(this)
    }

    setStore(bool){
        this.store=bool
    }


}