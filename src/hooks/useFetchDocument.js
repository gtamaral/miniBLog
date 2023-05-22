// hook para mostrar os detalhes de um post
import { useState, useEffect } from "react";
import { db } from "../firebase/config"; 
import { doc, getDoc } from "firebase/firestore";


export const useFetchDocument = (docCollection, id) => {


    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    //deal with memory leak
    const [cancelled, setCancelled] = useState(false)

    useEffect(() => {

        async function loadDocument() {
            if(cancelled) return

            setLoading(true)


            try {
                const docRef = await doc(db, docCollection, id)
                const docSnap = await getDoc(docRef)

                console.log("cai no try")

                setDocument(docSnap.data())
                setLoading(false)

            } catch (error) {
                console.log(error);
                setError(error.message)
                console.log("cai no error catch")

            }
            setLoading(false)

        } 
        loadDocument()
        console.log("por que cai no loaddocument")
        console.log(docCollection, id)
    }, [docCollection, id, cancelled]);

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {document, loading, error};
};