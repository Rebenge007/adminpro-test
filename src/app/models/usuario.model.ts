export class Usuario {
    constructor(
        public nombre: string,
        public apPaterno: string,
        public email: string,
        public password: string,
        public img?: string,
        public role?: string,
        public google?: boolean,
        public _id?: string
    ) {
        // Código
    }
}
