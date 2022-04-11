import {makeAutoObservable} from "mobx";

export default class ForumStore{
    constructor() {
        this._forum=[
            {id:0,title:"Форум1",description:"Описание",text:"Это текст",user:[{id:1,name:"Имя1"}]},
            {id:1,title:"Форум1",description:"Описание",text:"Это текст",user:[{id:1,name:"Имя1"}]}
        ]
        this._forumComments=[]
        makeAutoObservable(this)
    }


    get forum() {
        return this._forum
    }

    get forumComments() {
        return this._forumComments
    }

    setForum(topic){
        this._forum=topic
    }
    setComment(comment){
        this._forumComments=comment
    }


}