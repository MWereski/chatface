export class Post {

    constructor(
        public userId: string,
        public creationDateTime: string,
        public content: string,
        public user: [],
        public postComs = [],
        
    ) {}

}