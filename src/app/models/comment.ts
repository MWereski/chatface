export class Comment {

    constructor(
        public isDeleted: boolean,
        public content: string,
        public postId: string,
        public post: string,
        public userId: string,
        public user: string,
        public subPostComs: string,
        public id: string,
        public creationDateTime: string
        
    ) {}

}