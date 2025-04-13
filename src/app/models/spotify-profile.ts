export class SpotifyProfile {

    id:string = '';
    username: string = '';
    images:{ height:number; width:number; url:string;}[] = [];

    
    constructor(data?:any){
        this.id = data?.id || '';
        this.username = data?.display_name || '';
        this.images = Array.isArray(data?.images) ? data.images : [];
    }
}
