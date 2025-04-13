import { Track } from "./track";

export class Playlist {

    id:string;
    name:string;
    owner:{ name:string; id:string;} = { name:'', id:''};
    images:{ height:number; width:number; url:string;}[] = [];
    description:string;
    tracks:Track[] = [];
    public:boolean;

    constructor(data:any){

        this.id = data.id;
        this.name = data.name;
        this.owner.name = data.owner.display_name;
        this.owner.id = data.owner.id;
        this.description = data.description;
        this.public = data.public
        

        this.images = Array.isArray(data.images) ? data.images : [];
        
        // TRACKS
        if(data.tracks.items){

            this.tracks = data.tracks.items.map(t => {
                return new Track(t.track);
            })
        }
    }
}
