import styles from '../Notes.module.css';

//this is a dynamic route 

async function getNotes(noteId: string ) {
    const response = await fetch(`http://127.0.0.1:8090/api/collections/User/records/${noteId}`,
    {next: {revalidate: 10}});
    
       const data = await response.json();
       return  data;
    }

    export default async function NotePage({ params }: any) {
        const note = await getNotes(params.id);
        return(
            <>
            <div>
               <h1>Notes/{note.id}</h1>
               <div>
                   <div className={styles.note}>
                            <h2>{note.title}</h2>
                            <p>{note.content}</p>
                            <p>{note.created}</p>
                   </div>
               </div>
            </div>
                
            </>
        )
        
    }