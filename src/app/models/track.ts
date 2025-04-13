export class Track {

    id:string;
    name:string;
    artist:string = '';
    album:string;
    duration:string;
    images:{ height:number; width:number; url:string;}[] = [];


    constructor(data:any){
        this.id = data.id;
        this.name = data.name;

        
        if(Array.isArray(data.artists)){
            this.artist = data.artists.map((res:any) =>  res.name).join(", ");    
        }

        this.album = data.album.name;
        this.duration = this.formatDuration(data.duration_ms);

        this.images = Array.isArray(data.album.images) ? data.album.images : [];
    }

    private formatDuration(durationMs: number): string {
        const minutes = Math.floor(durationMs / 60000);
        const seconds = Math.floor((durationMs % 60000) / 1000);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
}
