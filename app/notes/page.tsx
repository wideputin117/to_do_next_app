import Link from "next/link";
import CreateNote from "./CreateNotes";
import styles from './Notes.module.css';

// get notes from database
async function getNotes() {
    
const response = await fetch('http://127.0.0.1:8090/api/collections/User/records',
{cache: 'no-store'});

   const data = await response.json();
   return data?.items as any[];
}




export default async function NotePage() {
    const notes = await getNotes();
    return( 
    <div>
        <h1>Notes</h1>
        <div className={styles.grid}>
            { notes?.map((note)=>{return <Note key={note.id} note={note}/>;
         })
    }
 
        </div>
        <div><CreateNote /></div>
            
        </div>
  );
}


// component to structure and style  the fetched notes
function Note({ note }:any){
    const { id ,title ,content ,created } = note || {};
return(<>
<Link href={`notes/${id}`}>
<div className={styles.note}>
    <h2>{title}</h2>
    <p>{content}</p>
    <p>{created}</p>
</div>
 
</Link>
 


</>)
}