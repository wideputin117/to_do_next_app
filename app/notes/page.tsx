import Link from "next/link";

// get notes from database
async function getNotes() {
const response = await fetch('http://127.0.0.1:8090/api/collections/User/records',
{cache: 'no-store'});

   const data = await response.json();
   return data?.items as any[];
}




export default async function NotePage() {
    const notes = await getNotes();
    return(<>
    <div>
        <h1>Notes Fetched</h1>
        <div>
            {notes?.map((note)=>{return <Note key={note.id} note={note}/> })
}
        </div>
  </div></>)
}

function Note({ note }:any){
    const { id ,title ,content ,created } = note || {}
return(<>
<Link href={`notes/${id}`}>
<div>
    <h2>{title}</h2>
    <p>{content}</p>
    <p>{created}</p>
</div>
</Link>
 


</>)
}