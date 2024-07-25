import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { nanoid } from 'nanoid';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, updateDoc, where } from "firebase/firestore"
import { FireAuth } from '../Firebase/Firebase';
// import { query } from "firebase/database"


const auth = getFirestore(FireAuth)
// Define the validation schema with yup
const schema = yup.object().shape({
  projectName: yup.string().required('Project Name is required'),
  directExpense: yup.number().min(0, 'Direct Expense must be a positive number').required('Direct Expense is required'),
  indirectExpense: yup.number().min(0, 'Indirect Expense must be a positive number').required('Indirect Expense is required'),
  month: yup.string().required('Month is required'),
  year: yup.number().min(2023, 'Year must be 2023 or later').required('Year is required'),
  projectValue: yup.number().min(0, 'Project Value must be a positive number').required('Project Value is required'),
});

const Create = () => {
  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      projectName: '',
      directExpense: 0,
      indirectExpense: 0,
      month: '',
      year: '',
      projectValue: 0,

    },
  });

  const onSubmit = async (data) => {
    const directExpense = parseFloat(data.directExpense) || 0;
    const indirectExpense = parseFloat(data.indirectExpense) || 0;
    const totalExpense = directExpense + indirectExpense;
    const gst = totalExpense * 0.12;
    const grandTotal = totalExpense + gst;
    const formData = {
      ...data,
      totalExpense,
      gst,
      grandTotal,
      nanoid: nanoid()
    };
    console.log('Form submitted:', formData);
    try {
      const res = await addDoc(collection(auth, "Carnot Project"), formData)
      console.log(res)
    } catch (er) {
      console.log(er)
    }
  };

  const directExpense = watch('directExpense');
  const indirectExpense = watch('indirectExpense');
  const totalExpense = parseFloat(directExpense) + parseFloat(indirectExpense);
  const gst = totalExpense * 0.12;
  const grandTotal = totalExpense + gst;


  // get data
  const getCollecttion = async () => {
    try {
        const collectionReference = collection(auth, "Carnot Project")
        // const queries = query(collectionReference, where("projectName", "==", "b"))
        const snap = await getDocs(collectionReference)

        console.log(snap)
        console.log(snap._snapshot.docChanges[0].doc.data.value.mapValue.fields)
    } catch (er) {
        console.log(er)
    }
}
useEffect(()=>{
  getCollecttion()
},[])
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor={nanoid()}>Project Name:</label>
        <Controller
          name="projectName"
          control={control}
          render={({ field }) => (
            <input
              id={nanoid()}
              type="text"
              {...field}
            />
          )}
        />
        {errors.projectName && <p>{errors.projectName.message}</p>}
      </div>
      <div>
        <label htmlFor={nanoid()}>Direct Expense:</label>
        <Controller
          name="directExpense"
          control={control}
          render={({ field }) => (
            <input
              id={nanoid()}
              type="number"
              {...field}
            />
          )}
        />
        {errors.directExpense && <p>{errors.directExpense.message}</p>}
      </div>
      <div>
        <label htmlFor={nanoid()}>Indirect Expense:</label>
        <Controller
          name="indirectExpense"
          control={control}
          render={({ field }) => (
            <input
              id={nanoid()}
              type="number"
              {...field}
            />
          )}
        />
        {errors.indirectExpense && <p>{errors.indirectExpense.message}</p>}
      </div>
      <div>
        <label htmlFor={nanoid()}>Month:</label>
        <Controller
          name="month"
          control={control}
          render={({ field }) => (
            <select id={nanoid()} {...field}>
              <option value="">Select month</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              {/* Add other months */}
            </select>
          )}
        />
        {errors.month && <p>{errors.month.message}</p>}
      </div>
      <div>
        <label htmlFor={nanoid()}>Year:</label>
        <Controller
          name="year"
          control={control}
          render={({ field }) => (
            <select id={nanoid()} {...field}>
              <option value="">Select year</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              {/* Add other years */}
            </select>
          )}
        />
        {errors.year && <p>{errors.year.message}</p>}
      </div>
      <div>
        <label htmlFor={nanoid()}>Project Value:</label>
        <Controller
          name="projectValue"
          control={control}
          render={({ field }) => (
            <input
              id={nanoid()}
              type="number"
              {...field}
            />
          )}
        />
        {errors.projectValue && <p>{errors.projectValue.message}</p>}
      </div>
      <div>
        <label>Total Expense:</label>
        <input
          type="number"
          value={totalExpense}
          readOnly
        />
      </div>
      <div>
        <label>GST (12%):</label>
        <input
          type="number"
          value={gst}
          readOnly
        />
      </div>
      <div>
        <label>Grand Total:</label>
        <input
          type="number"
          value={grandTotal}
          readOnly
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Create;
