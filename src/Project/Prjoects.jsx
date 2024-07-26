import React, { useEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, updateDoc, where } from "firebase/firestore"
import { FireAuth } from '../Firebase/Firebase';
import Table from '../components/Table';
import { toast } from 'react-toastify';


const auth = getFirestore(FireAuth)

function Prjoects() {
  const [data, setData] = useState()
  const getCollecttion = async () => {
    try {
      const collectionReference = collection(auth, "Carnot Project")
      const snap = await getDocs(collectionReference)
      setData(snap._snapshot.docChanges)
      // console.log(snap)
      console.log(snap?._snapshot.docChanges[0].doc.data.value.mapValue.fields)
    } catch (er) {
      console.log(er)
    }
  }
  useEffect(() => {
    getCollecttion()
  }, [])
  console.log(data)

  const handleDelete = async (projectId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this project?");
    if (!isConfirmed) {
      return; 
    }
    try {
      await deleteDoc(doc(auth, "Carnot Project", projectId));
      toast.success("Project deleted successfully");
      getCollecttion()
    } catch (error) {
      toast.error("Error deleting project");
      console.error("Error deleting project:", error);
    }
  };
  
  
  return (
    <div className="p-8">
      <h1 className="font-bold text-2xl">Projects</h1>

      <Table data={data} handleDelete={handleDelete}/>

    </div>
  )
}

export default Prjoects