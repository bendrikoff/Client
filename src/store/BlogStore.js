import {makeAutoObservable} from "mobx";

export default class BlogStore{
    constructor() {
        this._store=[]
        makeAutoObservable(this)
    }

    setBlog(blog){
        this._store=blog
    }




}