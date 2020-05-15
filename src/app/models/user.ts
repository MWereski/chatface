export class User {

    constructor(
        public id: string,
        public firstname: string,
        public surname: string,
        public email: string,
        public password: string,
        public province: string,
        public age: number,
        public city: string,
        public ifOnline: boolean,
        public role: string,
        public userInterests: [],
        public friendsLists: [],
        public postComs: [],
        public posts: [],
        public chatMembers: []
        ) { }

}