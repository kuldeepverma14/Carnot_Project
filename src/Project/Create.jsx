import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { nanoid } from 'nanoid';
import { addDoc, collection,getFirestore} from "firebase/firestore"
import { FireAuth } from '../Firebase/Firebase';
import { toast } from "react-toastify";


const auth = getFirestore(FireAuth)
const schema = yup.object().shape({
  projectName: yup.string().required('Project Name is required'),
  month: yup.string().required('Month is required'),
  year: yup.number().min(2023, 'Year must be 2023 or later').required('Year is required'),
  projectValue: yup.number().min(0, 'Project Value must be a positive number').required('Project Value is required'),
  directExpense: yup.number().min(0, 'Direct Expense must be a positive number').required('Direct Expense is required'),
  indirectExpense: yup.number().min(0, 'Indirect Expense must be a positive number').required('Indirect Expense is required'),
 
});

const Create = () => {
  const { control, handleSubmit, watch, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      projectName: '',
      directExpense: null,
      indirectExpense: null,
      month: '',
      year: '',
      projectValue: null,

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
      if (res) {
        toast.success("Login successfully");
        reset();
      }
      console.log(res)
    } catch (er) {
      toast.error(er);

    }
  };

  const directExpense = watch('directExpense');
  const indirectExpense = watch('indirectExpense');
  const totalExpense = parseFloat(directExpense) + parseFloat(indirectExpense);
  const gst = totalExpense * 0.12;
  const grandTotal = totalExpense + gst;



  return (
    <div className='p-8'>
      <h1 className='font-bold text-2xl' >Create Project</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div>
            <label htmlFor="projectName">Project Name:</label>
            <Controller
              name="projectName"
              control={control}
              render={({ field }) => (
                <input
                  id="projectName"
                  type="text"
                  className="w-full p-2 border rounded"
                  {...field}
                />
              )}
            />
            {errors.projectName && <p className="text-red-500">{errors.projectName.message}</p>}
          </div>
          <div>
            <label htmlFor="month">Month:</label>
            <Controller
              name="month"
              control={control}
              render={({ field }) => (
                <select id="month" className="w-full p-2 border rounded" {...field}>
                  <option value="">Select month</option>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
              )}
            />
            {errors.month && <p className="text-red-500">{errors.month.message}</p>}
          </div>
          <div>
            <label htmlFor="year">Year:</label>
            <Controller
              name="year"
              control={control}
              render={({ field }) => (
                <select id="year" className="w-full p-2 border rounded" {...field}>
                  <option value="">Select year</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                  <option value="2030">2030</option>
                  <option value="2031">2031</option>
                  <option value="2032">2032</option>
                  <option value="2033">2033</option>
                  <option value="2034">2034</option>
                  <option value="2035">2035</option>
                </select>
              )}
            />
            {errors.year && <p className="text-red-500">{errors.year.message}</p>}
          </div>
          <div>
            <label htmlFor="projectValue">Project Value:</label>
            <Controller
              name="projectValue"
              control={control}
              render={({ field }) => (
                <input
                  id="projectValue"
                  type="number"
                  className="w-full p-2 border rounded"
                  {...field}
                />
              )}
            />
            {errors.projectValue && <p className="text-red-500">{errors.projectValue.message}</p>}
          </div>
          <div>
            <label htmlFor="directExpense">Direct Expense:</label>
            <Controller
              name="directExpense"
              control={control}
              render={({ field }) => (
                <input
                  id="directExpense"
                  type="number"
                  className="w-full p-2 border rounded"
                  {...field}
                />
              )}
            />
            {errors.directExpense && <p className="text-red-500">{errors.directExpense.message}</p>}
          </div>
          <div>
            <label htmlFor="indirectExpense">Indirect Expense:</label>
            <Controller
              name="indirectExpense"
              control={control}
              render={({ field }) => (
                <input
                  id="indirectExpense"
                  type="number"
                  className="w-full p-2 border rounded"
                  {...field}
                />
              )}
            />
            {errors.indirectExpense && <p className="text-red-500">{errors.indirectExpense.message}</p>}
          </div>


          <div>
            <label>Total Expense:</label>
            <input
              type="number"
              className="w-full p-2 border rounded bg-gray-200"
              value={totalExpense}
              readOnly
            />
          </div>
          <div>
            <label>GST (12%):</label>
            <input
              type="number"
              className="w-full p-2 border rounded bg-gray-200"
              value={gst}
              readOnly
            />
          </div>
          <div>
            <label>Grand Total Expense:</label>
            <input
              type="number"
              className="w-full p-2 border rounded bg-gray-200"
              value={grandTotal}
              readOnly
            />
          </div>
        </div>
        <div className='flex justify-center mt-5'>

          <button type="submit" className="px-4  py-2 mt-4 text-white bg-[#38C0E6] rounded ">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
