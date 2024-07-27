import React, { useEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore } from "firebase/firestore";
import { FireAuth } from '../Firebase/Firebase';
import Table from '../components/Table';
import { toast } from 'react-toastify';

const auth = getFirestore(FireAuth);

function Projects() {
    const [data, setData] = useState([]);

    const getCollection = async () => {
      
        try {
            const collectionReference = collection(auth, "Carnot Project");
            const snap = await getDocs(collectionReference);
            setData(snap?._snapshot.docChanges); // Format data as needed
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getCollection();
    }, []);
console.log(data)
    const handleDelete = async (projectId) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this project?");
        if (!isConfirmed) return;
        try {
            await deleteDoc(doc(auth, "Carnot Project", projectId));
            toast.success("Project deleted successfully");
            getCollection();
        } catch (error) {
            toast.error("Error deleting project");
            console.error("Error deleting project:", error);
        }
    };

    return (
        <div className="p-5">
            <h1 className="font-bold text-2xl">Projects</h1>
            <Table data={data} handleDelete={handleDelete} />
        </div>
    );
}

export default Projects;
