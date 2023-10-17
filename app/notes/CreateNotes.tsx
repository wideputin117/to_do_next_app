'use client'; //because it is used on the client side //

// use useState
import { useState } from "react";
import { useRouter } from "next/navigation";
 
 
 

export default function CreateNote() {
const [title, setTitle] = useState('');
const [content, setContent] = useState('');

const router = useRouter();
 
const create= async(event: React.FormEvent<HTMLFormElement>)=>{
   event.preventDefault();
   try{
   const response = await fetch('http://127.0.0.1:8090/api/collections/User/records',{ 
      method: 'POST',
      headers: { 
         'Content-Type': 'application/json',
               },
      body: JSON.stringify({
      title,
      content,
            }),
   });
   if (!response.ok) {
      throw new Error('Failed to create a record. Status code: ' + response.status);
    }

    // Handle the response or reset the form if needed
    const responseData = await response.json();
    console.log('Record created:', responseData);


   setTitle('');
   setContent('');
      } catch (error) {
         console.error(error);
         
      };
       

 router.refresh()
};

return( 
<form onSubmit={create}>
   <h1>Create a Todo...</h1>
<input
type="text"
placeholder="Enter Title"
value={title}
onChange={(e) => setTitle(e.target.value) }
/>
<textarea
placeholder="Enter content"
value={content}
onChange={(e) => setContent(e.target.value) }
/>
<button type="submit">
    Create a note
</button>

</form>
)
}